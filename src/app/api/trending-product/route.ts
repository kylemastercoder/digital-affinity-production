import db from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  try {
    // Fetch products with at least one associated order
    const products = await db.product.findMany({
      where: {
        orders: {
          some: {}, // Filter products with at least one order
        },
      },
      include: {
        category: true,
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    // Optionally, you can use a client-side filter if needed
    const filteredProducts = products.filter(
      (product) => product._count.orders > 0
    );

    revalidatePath("/", "layout");
    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    // Handle error and return error message
    return NextResponse.json(
      { errorMessage: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
