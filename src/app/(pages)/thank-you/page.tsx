import MaxWidthWrapper from "@/components/max-width-wrapper";
import PaymentStatus from "@/components/payment-status";
import db from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Category, User } from "@prisma/client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  noStore();
  const orderId = Array.isArray(searchParams.orderId)
    ? searchParams.orderId[0]
    : searchParams.orderId;
  const order = await db.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      products: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!order) return notFound();

  const products = order.products;

  const orderTotal = products.reduce((total, product) => {
    return total + Number(product.price);
  }, 0);

  return (
    <main className="relative flex flex-col min-h-screen overflow-hidden">
      <MaxWidthWrapper>
        <div className="py-10">
          <p className="text-sm font-medium text-blue-600">Order successful</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
            Thanks for ordering
          </h1>
          {order?.isPaid ? (
            <p className="mt-2 text-base text-muted-foreground">
              Your order was processed and your assets are available to download
              below. We&apos;ve sent your receipt and order details to{" "}
              {order.userId ? (
                <span className="font-medium text-gray-100">
                  {order.user.email}
                </span>
              ) : null}
              .
            </p>
          ) : (
            <p className="mt-2 text-base text-muted-foreground">
              We appreciate your order, and we&apos;re currently processing it.
              So hang tight and we&apos;ll send you confirmation very soon!
            </p>
          )}

          <div className="mt-16 text-sm font-medium">
            <div className="text-muted-foreground">Order #:</div>
            <div className="mt-2 text-gray-100">{order.id}</div>

            <ul className="mt-6 divide-y divide-gray-800 border-t border-gray-800 text-sm font-medium text-muted-foreground">
              {products.map((product) => {
                return (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <div className="flex-shrink-0">
                      <div className="relative h-24 w-24">
                        {product.images.length > 0 ? (
                          <Image
                            fill
                            src={product.images[0]}
                            alt="Product Image"
                            className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-secondary">
                            <ImageIcon
                              aria-hidden="true"
                              className="h-4 w-4 text-muted-foreground"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-auto flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-gray-100">{product.name}</h3>

                        <p className="my-1">
                          Category: {(product.category as Category).name}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      {order.isPaid ? (
                        <a
                          href={product.file}
                          download={product.name}
                          className="text-blue-600 hover:underline underline-offset-2"
                        >
                          Download asset
                        </a>
                      ) : null}
                    </div>

                    <p className="flex-none font-medium text-gray-100">
                      {formatPrice(Number(product.price))}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-6 border-t border-gray-800 pt-6 text-sm font-medium text-muted-foreground">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="text-gray-100">{formatPrice(orderTotal)}</p>
              </div>

              <div className="flex justify-between">
                <p>Transaction Fee</p>
                <p className="text-gray-100">{formatPrice(5)}</p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-800 pt-6 text-gray-100">
                <p className="text-base">Total</p>
                <p className="text-base">
                  {formatPrice(Number(order.totalAmount))}
                </p>
              </div>
            </div>

            <PaymentStatus
              isPaid={order.isPaid}
              orderEmail={(order.user as User).email}
            />

            <div className="mt-16 border-t border-gray-800 py-6 text-right">
              <Link
                href="/products"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Continue shopping &rarr;
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default ThankYouPage;
