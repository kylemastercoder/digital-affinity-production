import db from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  noStore();
  try {
    if (!params.productId) {
      return NextResponse.json(
        {
          errorMessage: getErrorMessage("Product ID is required."),
        },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return NextResponse.json(
      { errorMessage: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
