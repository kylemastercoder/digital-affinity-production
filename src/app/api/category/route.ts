import db from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  try {
    const category = await db.category.findMany();

    revalidatePath("/", "layout");
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    // Handle error and return error message
    return NextResponse.json(
      { errorMessage: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
