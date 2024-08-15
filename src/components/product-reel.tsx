"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { QueryProductValidator } from "@/lib/validators";
import { Product } from "@prisma/client";
import ProductListing from "./product-listing";
import { z } from "zod";
import ProductPlaceholder from "./product-placeholder";
import Image from "next/image";

export type QueryProductValidator = z.infer<typeof QueryProductValidator>;

interface ProductReelProps {
  title: string;
  subtitle?: string;
  query: QueryProductValidator;
}

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, query } = props;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (query.isTrending) {
          response = await axios.get(`/api/trending-product`);
        } else if (query.categoryId) {
          response = await axios.get(
            `/api/specific-product/${query.categoryId}`
          );
        } else {
          response = await axios.get(`/api/product`);
        }
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <section>
      <div className="md:flex md:items-center md:justify-between mt-12 mb-4 w-full">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="text-sm hidden font-medium md:block text-muted-foreground mt-1">
              {subtitle}
            </p>
          ) : null}
        </div>

        {(query.categoryId || query.isTrending) && (
          <Link
            href={"/products"}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            All Digital Products <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center gap-5 flex-wrap w-full">
          {isLoading ? (
            <>
              <ProductPlaceholder count={3} />
              <ProductPlaceholder count={3} />
              <ProductPlaceholder count={3} />
            </>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center mx-auto flex-col">
              <Image
                src="/hippo-empty-cart.png"
                alt="No products available"
                width={300}
                height={300}
              />
              <h3 className="font-semibold text-lg">No Products Found</h3>
              <p className="text-muted-foreground md:text-md text-sm text-center">
                It looks like we don’t have any products to show right now.
              </p>
              <Link
                href="/products"
                className="text-blue-600 mt-2 hover:underline font-semibold"
              >
                Browse all products &rarr;
              </Link>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-10 lg:gap-x-8">
              {products.map((product, i) => (
                <ProductListing
                  key={`product-${i}`}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
