import db from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
    noStore();
    try {
      const product = await db.product.findMany({
        include: {
          category: true
        }
      });
  
      revalidatePath("/", "layout");
      return NextResponse.json(product);
    } catch (error) {
      console.log("[PRODUCT_GET]", error);
      // Handle error and return error message
      return NextResponse.json(
        { errorMessage: getErrorMessage(error) },
        { status: 500 }
      );
    }
  }
