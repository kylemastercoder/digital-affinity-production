import db from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  noStore();
  try {
    if (!params.categoryId) {
      return NextResponse.json(
        {
          errorMessage: getErrorMessage("Category ID is required."),
        },
        { status: 400 }
      );
    }

    const product = await db.product.findMany({
      where: {
        categoryId: params.categoryId,
      },
      include: {
        category: true
      },
      orderBy: { createdAt: "desc" },
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
