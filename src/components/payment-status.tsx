"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface PaymentStatusProps {
  orderEmail: string;
  isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, isPaid }: PaymentStatusProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isPaid) router.refresh();
  }, [isPaid, router]);
  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-300">
      <div>
        <p className="font-medium text-gray-100">Shipping To</p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-100">Order Status</p>
        <p>{isPaid ? "Payment successful" : "Pending payment"}</p>
      </div>
    </div>
  );
};

export default PaymentStatus;
