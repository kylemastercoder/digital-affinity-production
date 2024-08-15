"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import ImageSlider from "./image-slider";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  const imageUrls = product?.images ?? [];

  if (isVisible && product) {
    return (
      <Link
        href={`/view-product?product=${product.id}`}
        className={cn("rounded-lg relative invisible group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div className="flex flex-col">
          <ImageSlider urls={imageUrls} />
          <h3 className="mt-4 font-semibold text-sm">
            {product.name}
          </h3>
          <p className="mt-1 font-medium text-sm text-gray-200">
            {formatPrice(Number(product.price))}
          </p>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-1">{product.description}</p>
        </div>
      </Link>
    );
  }
};

export default ProductListing;
