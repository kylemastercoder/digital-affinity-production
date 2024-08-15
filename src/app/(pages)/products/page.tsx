import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductReel from "@/components/product-reel";
import React from "react";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Products = ({ searchParams }: PageProps) => {
  const category = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category || "";

  const categoryId = Array.isArray(searchParams.to)
    ? searchParams.to[0]
    : searchParams.to || "";

  const trending = Array.isArray(searchParams.query)
    ? searchParams.query[0]
    : searchParams.query || "";

  return (
    <MaxWidthWrapper>
      <div className="w-full py-10">
        {trending ? (
          <ProductReel
            query={{ sort: "desc", isTrending: trending }}
            title="Trending Products"
            subtitle="Browse the products with the highest number of buyers."
          />
        ) : !category ? (
          <ProductReel
            query={{ sort: "desc" }}
            title="All Digital Products"
            subtitle="This page displays all the products available on our site."
          />
        ) : (
          <ProductReel
            query={{ categoryId, sort: "desc" }}
            title={category}
            subtitle={`This page displays all the products categorized under ${category.toLowerCase()}.`}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Products;
