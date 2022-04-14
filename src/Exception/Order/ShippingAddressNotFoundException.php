<?php

declare(strict_types=1);

namespace BitBag\ShopwareInPostPlugin\Exception\Order;

use Shopware\Core\Framework\ShopwareHttpException;
use Symfony\Component\HttpFoundation\Response;

final class ShippingAddressNotFoundException extends ShopwareHttpException
{
    public function getErrorCode(): string
    {
        return 'BITBAG_INPOST_PLUGIN__SHIPPING_ADDRESS_NOT_FOUND';
    }

    public function getStatusCode(): int
    {
        return Response::HTTP_NOT_FOUND;
    }
}
