
import Link from "next/link";
import db from "@/lib/db";

const NavItems = async () => {
  const categories = await db.category.findMany();
  return (
    <div className="flex items-center h-full space-x-8">
      {categories.map((category) => (
        <Link className="text-white text-sm hover:underline" key={category.id} href={`/products?category=${category.name}&to=${category.id}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
