import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useCart } from "@/hooks/use-cart";
import React from "react";
import CheckoutForm from "@/components/form/checkout-form";
import db from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return data;
}

const Checkout = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("No user found.");
  }
  const data = await getData(user.id as string);

  const fullName = `${data?.firstName} ${data?.lastName}`;

  return (
    <MaxWidthWrapper>
      <CheckoutForm fullName={fullName} email={data?.email as string} />
    </MaxWidthWrapper>
  );
};

export default Checkout;
