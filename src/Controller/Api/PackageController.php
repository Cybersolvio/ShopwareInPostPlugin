<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start.
 * You can find more information about us on https://bitbag.io and write us an email on hello@bitbag.io.
 */

declare(strict_types=1);

namespace BitBag\ShopwareInPostPlugin\Controller\Api;

use BitBag\ShopwareInPostPlugin\Api\PackageApiServiceInterface;
use BitBag\ShopwareInPostPlugin\Config\InPostConfigServiceInterface;
use BitBag\ShopwareInPostPlugin\Exception\PackageException;
use BitBag\ShopwareInPostPlugin\Finder\OrderFinderInterface;
use BitBag\ShopwareInPostPlugin\Resolver\OrderExtensionDataResolverInterface;
use OpenApi\Annotations as OA;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(defaults={"_routeScope"={"api"}})
 */
final class PackageController
{
    private EntityRepository $orderRepository;

    private OrderFinderInterface $orderFinder;

    private PackageApiServiceInterface $packageApiService;

    private OrderExtensionDataResolverInterface $orderExtensionDataResolver;

    private InPostConfigServiceInterface $inPostConfigService;

    public function __construct(
        EntityRepository $orderRepository,
        OrderFinderInterface $orderFinder,
        PackageApiServiceInterface $packageApiService,
        OrderExtensionDataResolverInterface $orderExtensionDataResolver,
        InPostConfigServiceInterface $inPostConfigService
    ) {
        $this->orderRepository = $orderRepository;
        $this->orderFinder = $orderFinder;
        $this->packageApiService = $packageApiService;
        $this->orderExtensionDataResolver = $orderExtensionDataResolver;
        $this->inPostConfigService = $inPostConfigService;
    }

    /**
     * @OA\Post(
     *     path="/api/_action/bitbag-inpost-plugin/package/{orderId}",
     *     summary="Creates an InPost package for an order",
     *     operationId="create",
     *     tags={"Admin API", "InPost"},
     *     @OA\Parameter(
     *         name="orderId",
     *         description="Identifier of the order the package should be generated for",
     *         @OA\Schema(type="string", pattern="^[0-9a-f]{32}$"),
     *         in="path",
     *         required=true
     *     ),
     *      @OA\Parameter(
     *         name="salesChannelId",
     *         description="Sales channel identifier",
     *         @OA\Schema(type="string", pattern="^[0-9a-f]{32}$"),
     *         in="path",
     *         required=false
     *     ),
     *     @OA\Response(
     *         response="201",
     *         description="Package created successfully.",
     *         @OA\JsonContent(ref="#/components/schemas/Order")
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Bad package data provided"
     *     ),
     *     @OA\Response(
     *         response="404",
     *         description="Not found"
     *     )
     * )
     * @Route("/api/_action/bitbag-inpost-plugin/package/{orderId}", name="api.action.bitbag_inpost_plugin.package", methods={"POST"})
     */
    public function create(
        string $orderId,
        Context $context,
        ?string $salesChannelId = null
    ): JsonResponse {
        $order = $this->orderFinder->getWithAssociations($orderId, $context);
        $package = $this->packageApiService->createPackage($order, $context);
        $sendingMethod = $this->inPostConfigService->getInPostApiConfig($salesChannelId)->getSendingMethod();
        $orderInPostExtensionData = $this->orderExtensionDataResolver->resolve($order);

        if (null !== $orderInPostExtensionData['packageId']) {
            throw new PackageException('package.alreadyCreated');
        }

        $this->orderRepository->update([
            [
                'id' => $order->getId(),
                'inPost' => [
                    'id' => $orderInPostExtensionData['id'],
                    'packageId' => $package['id'],
                    'sendingMethod' => $sendingMethod,
                ],
            ],
        ], $context);

        return new JsonResponse($order, Response::HTTP_CREATED);
    }
}
