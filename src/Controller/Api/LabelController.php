<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start.
 * You can find more information about us on https://bitbag.io and write us an email on hello@bitbag.io.
 */

declare(strict_types=1);

namespace BitBag\ShopwareInPostPlugin\Controller\Api;

use BitBag\ShopwareInPostPlugin\Api\SalesChannelAwareWebClientInterface;
use BitBag\ShopwareInPostPlugin\Exception\MissingApiConfigException;
use BitBag\ShopwareInPostPlugin\Exception\PackageException;
use BitBag\ShopwareInPostPlugin\Exception\PackageNotFoundException;
use BitBag\ShopwareInPostPlugin\Finder\OrderFinderInterface;
use BitBag\ShopwareInPostPlugin\Resolver\OrderExtensionDataResolverInterface;
use GuzzleHttp\Exception\ClientException;
use OpenApi\Annotations as OA;
use Shopware\Core\Framework\Context;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(defaults={"_routeScope"={"api"}})
 */
final class LabelController
{
    private OrderFinderInterface $orderFinder;

    private OrderExtensionDataResolverInterface $orderExtensionDataResolver;

    private SalesChannelAwareWebClientInterface $salesChannelAwareWebClient;

    public function __construct(
        OrderFinderInterface $orderFinder,
        OrderExtensionDataResolverInterface $orderExtensionDataResolver,
        SalesChannelAwareWebClientInterface $salesChannelAwareWebClient
    ) {
        $this->orderFinder = $orderFinder;
        $this->orderExtensionDataResolver = $orderExtensionDataResolver;
        $this->salesChannelAwareWebClient = $salesChannelAwareWebClient;
    }

    /**
     * @OA\Get(
     *     path="/api/_action/bitbag-inpost-plugin/label/{orderId}",
     *     summary="Gets an InPost package label for an order",
     *     operationId="show",
     *     tags={"Admin API", "InPost"},
     *     @OA\Parameter(
     *         name="orderId",
     *         description="Identifier of the order the package should be generated for",
     *         @OA\Schema(type="string", pattern="^[0-9a-f]{32}$"),
     *         in="path",
     *         required=true
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="InPost package formatted as PDF",
     *         @OA\MediaType(
     *             mediaType="application/pdf",
     *             @OA\Schema(
     *                type="string",
     *                format="binary"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Error while rendering the package label"
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Not found"
     *     )
     * )
     * @Route("/api/_action/bitbag-inpost-plugin/label/{orderId}", name="api.action.bitbag_inpost_plugin.label", methods={"GET"})
     */
    public function show(string $orderId, Context $context): Response
    {
        $order = $this->orderFinder->getWithAssociations($orderId, $context);

        $orderInPostExtensionData = $this->orderExtensionDataResolver->resolve($order);

        if (null === $orderInPostExtensionData['packageId']) {
            throw new PackageNotFoundException('package.packageIdNotFound');
        }

        $packageId = $orderInPostExtensionData['packageId'];

        try {
            $label = $this->salesChannelAwareWebClient->getLabelByShipmentId($packageId, $order->getSalesChannelId());
        } catch (ClientException $e) {
            $error = json_decode($e->getMessage(), true);
            $errorDetails = $error['details'];

            if (([] !== $errorDetails) && isset($errorDetails['action'], $errorDetails['shipment_status']) &&
                'get_label' === $errorDetails['action'] && 'offer_selected' === $errorDetails['shipment_status']
            ) {
                throw new PackageException('package.offerSelected');
            }

            if (isset($error['error']) && 'token_invalid' === $error['error']) {
                throw new MissingApiConfigException('api.providedDataNotValid');
            }

            throw $e;
        }

        $filename = sprintf('filename="label_%s.pdf"', $packageId);

        $response = new Response($label);
        $response->headers->set('Content-Type', 'application/pdf');
        $response->headers->set('Content-Transfer-Encoding', 'binary');
        $response->headers->set('Content-Disposition', $filename);

        return $response;
    }
}
