"use client";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function ProductCard({
  product,
  refetch,
}: {
  product: Product;
  refetch?: () => void;
}) {
  const router = useRouter();

  return (
    <div
      className="relative text-white rounded-2xl overflow-hidden
      transform transition duration-500 hover:scale-[1.05]"
    >
      <img
        src={product.images?.[0] ? product.images[0] : "/Images/error.jpg"}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-cover aspect-square rounded-2xl"
        onClick={() => router.push(`/products/${product.slug}`)}
      />

      <div className="absolute bottom-2 w-full">
        <div className="mx-auto w-[94%] px-3 py-4 space-y-2 bg-black/25 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
          <small className="block text-lg md:text-xl font-semibold w-[95%] overflow-hidden whitespace-nowrap text-ellipsis">
            {product.name}
          </small>
          <p className="text-[#FFD580] text-sm">${product.price.toFixed(2)}</p>

          <div className="flex w-fit p-2 rounded-3xl h-8 bg-[#AD8A64]/80 items-center gap-2">
            <span className="border  border-white/30 rounded-full p-[3px]">
              <img
                src={
                  product.category.image
                    ? product.category.image
                    : "/Images/error.jpg"
                }
                alt={"img"}
                className="h-5 w-5 object-cover rounded-full"
              />
            </span>
            <p className="text-sm text-[#E0C097]">{product.category.name}</p>
          </div>

          <p className="text-xs text-gray-200 w-[95%] overflow-hidden whitespace-nowrap text-ellipsis">
            {product.description.length > 50
              ? product.description.substring(0, 70) + "..."
              : "No Description Found"}
          </p>

          <div className="flex justify-start space-x-4 items-center mt-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${product.slug}`);
              }}
              className=" w-full md:px-10 xl:px-16 xl:py-4 lg:py-3 py-[3px] text-xs md:text-sm bg-gradient-to-r from-primary to-[#AD8A64] rounded-full text-white hover:scale-105 transition-transform"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
