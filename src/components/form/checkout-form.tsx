"use client";

import { CartItem, useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Circle, ImageIcon, Loader2 } from "lucide-react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ImageUpload from "../image-upload";
import SubmitButton from "../submit-button";
import { Button } from "../ui/button";

interface CheckoutFormProps {
  fullName: string;
  email: string;
}

const CheckoutForm = ({ fullName, email }: CheckoutFormProps) => {
  const { items, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Gcash");
  const [isPending, startTransition] = useTransition();
  const [phone, setPhone] = useState<string | undefined>();
  const [proof, setProof] = useState<string | undefined>();

  const handleSelectPaymentMethod = (name: string) => {
    setSelectedPaymentMethod(name);
  };

  const productIds = items.map(({ product }) => product.id);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + Number(product.price),
    0
  );

  const fee = 5 * items.length;

  const totalAmount = cartTotal + fee;
  return (
    <form className="flex flex-col md:flex-row py-14">
      <div className="w-full md:w-1/2 pr-6">
        <Link href="/cart" className="text-gray-200 hover:underline">
          &larr; Back to cart
        </Link>
        <h2 className="text-lg mt-5 font-bold">Product Information & Review</h2>
        <p className="text-sm text-muted-foreground">
          By placing your order, you agree to Digital Affinity&apos;s{" "}
          <Link href="#" className="text-blue-600 font-semibold underline">
            Privacy Policy
          </Link>
          .
        </p>
        {isMounted &&
          items.map(({ product }) => (
            <div
              key={product.id}
              className="mt-4 border gap-x-3 flex items-start p-4 rounded-md shadow"
            >
              <div className="flex-shrink-0">
                <div className="relative h-24 w-24">
                  {product.images ? (
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
              <div className="">
                <h3 className="font-medium">
                  {product.name} - {formatPrice(Number(product.price))}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {product.category.name}
                </p>
                <p className="text-sm line-clamp-2">{product.description}</p>
              </div>
            </div>
          ))}
        <h2 className="mt-6 text-lg font-semibold mb-4">Payment Method</h2>
        <div className="flex flex-col space-y-5">
          <label
            className={`${
              selectedPaymentMethod === "Gcash"
                ? "cursor-pointer"
                : "cursor-default"
            } w-full`}
          >
            <input
              type="radio"
              className="peer sr-only"
              name="payment_method"
              onChange={() => handleSelectPaymentMethod("Gcash")}
              checked={selectedPaymentMethod === "Gcash"}
              disabled={isPending}
            />
            <div
              className={`w-full rounded-md p-5 transition-all shadow-md border ${
                selectedPaymentMethod === "Gcash"
                  ? "border-blue-600"
                  : "border-zinc-300"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    {selectedPaymentMethod === "Gcash" ? (
                      <IconCircleCheckFilled className="text-blue-600" />
                    ) : (
                      <Circle />
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold">Gcash</p>
                        <Badge variant="success">Recommended</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get it after 1 hour or as soon as possiblex
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src="/gcash.png"
                      alt="Gcash"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </label>
          <label
            className={`${
              selectedPaymentMethod === "Maya"
                ? "cursor-pointer"
                : "cursor-default"
            } w-full`}
          >
            <input
              type="radio"
              className="peer sr-only"
              name="payment_method"
              onChange={() => handleSelectPaymentMethod("Maya")}
              checked={selectedPaymentMethod === "Maya"}
              disabled={isPending}
            />
            <div
              className={`w-full rounded-md p-5 transition-all shadow-md border ${
                selectedPaymentMethod === "Maya"
                  ? "border-blue-600"
                  : "border-zinc-300"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    {selectedPaymentMethod === "Maya" ? (
                      <IconCircleCheckFilled className="text-blue-600" />
                    ) : (
                      <Circle />
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold">Maya</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get it after 1 hour or as soon as possiblex
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src="/maya.png"
                      alt="Maya"
                      width={70}
                      className="mt-1"
                      height={70}
                    />
                  </div>
                </div>
              </div>
            </div>
          </label>
          <label
            className={`${
              selectedPaymentMethod === "Paypal"
                ? "cursor-pointer"
                : "cursor-default"
            } w-full`}
          >
            <input
              type="radio"
              className="peer sr-only"
              name="payment_method"
              onChange={() => handleSelectPaymentMethod("Paypal")}
              checked={selectedPaymentMethod === "Paypal"}
              disabled={isPending}
            />
            <div
              className={`w-full rounded-md p-5 transition-all shadow-md border ${
                selectedPaymentMethod === "Paypal"
                  ? "border-blue-600"
                  : "border-zinc-300"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    {selectedPaymentMethod === "Paypal" ? (
                      <IconCircleCheckFilled className="text-blue-600" />
                    ) : (
                      <Circle />
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <p className="font-semibold">Paypal</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Get it after 3 hours or as soon as possible.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src="/paypal.png"
                      alt="Paypal"
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="w-full md:mt-0 mt-5 md:w-1/2 md:pl-6 pl-0 md:border-l border-none md:border-border">
        <h2 className="text-lg font-semibold">Customer Details</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Complete your purchase by providing your details.
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-2">
            <Label>Name</Label>
            <Input
              name="name"
              className="bg-black"
              defaultValue={fullName}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-5">
            <Label>Email Address</Label>
            <Input
              name="email"
              className="bg-black"
              defaultValue={email}
              disabled
              type="email"
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-5">
            <Label>Contact Number</Label>
            <PhoneInput
              defaultCountry="PH"
              placeholder="Enter phone number"
              international
              value={phone}
              withCountryCallingCode
              onChange={setPhone}
              className="input-phone"
            />
          </div>
          <div className="flex flex-col w-full gap-y-2 mt-5">
            <Label>Proof</Label>
            <ImageUpload
              defaultValue={proof as string}
              onImageUpload={(url) => setProof(url)}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Payments are secured and encrypted.
          </p>
          <div className="space-y-1.5 text-sm mt-3">
            <div className="flex">
              <span className="flex-1">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex">
              <span className="flex-1">Transaction Fee</span>
              <span>{formatPrice(fee)}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Total</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>
          <Button disabled={isPending} className="w-full mt-3">
            {isPending && <Loader2 className="animate-spin mr-2" />}
            Pay {formatPrice(totalAmount)} &rarr;
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
