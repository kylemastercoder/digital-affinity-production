import { Product as PrismaProduct, Category } from "@prisma/client";

// Extend the Product type to include the Category
export type ProductWithCategory = PrismaProduct & {
  category: Category;
};
