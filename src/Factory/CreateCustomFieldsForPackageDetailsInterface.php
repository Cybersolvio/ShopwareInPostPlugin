<?php

declare(strict_types=1);

namespace BitBag\ShopwareInPostPlugin\Factory;

use Shopware\Core\Framework\Context;

interface CreateCustomFieldsForPackageDetailsInterface
{
    public function create(Context $context): void;
}
