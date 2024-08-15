"use client";

import AddToCartButton from "@/components/add-to-cart-button";
import ImageSlider from "@/components/image-slider";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductReel from "@/components/product-reel";
import axios from "axios";
import { formatPrice } from "@/lib/utils";
import { ProductWithCategory } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCheck, Shield } from "lucide-react";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const ViewProduct = ({ searchParams }: PageProps) => {
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const productId = Array.isArray(searchParams.product)
    ? searchParams.product[0]
    : searchParams.product || "";

  useEffect(() => {
    if (!productId) {
      router.replace("/products");
      return;
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productId, router]);

  const imageUrls = product?.images ?? [];

  return (
    <MaxWidthWrapper>
      {isLoading && (
        <div
          className={`fixed bg-black z-50 w-full h-full inset-0 transition-opacity duration-1000 ease-in-out ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        ></div>
      )}

      {product && (
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-100">
                  {formatPrice(Number(product.price))}
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  {product.category?.name || "No category available"}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckCheck
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-600"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant delivery
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square">
              <ImageSlider urls={imageUrls} />
            </div>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <AddToCartButton product={product} />
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700">
                    10 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {product && (
        <ProductReel
          query={{ categoryId: product.categoryId, limit: 3 }}
          title="Similar Products"
          subtitle={`Browse similar high-quality ${product.category.name} just like '${product.name}'`}
        />
      )}
    </MaxWidthWrapper>
  );
};

export default ViewProduct;
