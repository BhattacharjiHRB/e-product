"use client";

import ConfirmModal from "@/components/ConfirmModal";
import { getProductColumns } from "@/components/ProductList/Column";
import { ProductDataTable } from "@/components/ProductList/DataTable";
import { Button } from "@/components/ui/button";
import {
  useDeleteProductMutation,
  useGetProductsDataQuery,
} from "@/lib/Features/products/productSlice";
import { Product } from "@/lib/types";
import { useAuth } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const [deleteProduct] = useDeleteProductMutation();
  const { data, isLoading, error, refetch } = useGetProductsDataQuery();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const router = useRouter();
  const isLoggedIn = useAuth();

  const handleEdit = (product: Product) => {
    router.replace(`/products/${product.slug}`);
  };
  const handleDelete = async (product: Product) => {
    try {
      await deleteProduct(product.id).unwrap();
      refetch();
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-red-200 via-red-300 to-red-400 px-4">
        <img
          src="/images/error.jpg"
          alt="Error Illustration"
          className="w-86 h-2/4 rounded-2xl object-contain mb-8 animate-bounce-slow"
        />

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 text-center animate-pulse">
          Oops! Something Went Wrong
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-red-500 text-center font-bold mb-8 max-w-md">
          Please Login to see the products
        </p>

        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-lg hover:bg-red-100 transition transform hover:scale-105 duration-300"
        >
          Login
        </button>
      </div>
    );
  }

  const columns = getProductColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <Button
        className="flex flex-1 items-center justify-center gap-2 m-5 "
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-10 w-10" />
        <span className="text-md font-medium">Back</span>
      </Button>
      <div className="container flex flex-col items-center mx-auto justify-center mt-10 ">
        <ProductDataTable columns={columns} data={data ?? []} />
        {confirmOpen && (
          <ConfirmModal
            open={confirmOpen}
            title="warning"
            onClose={() => setConfirmOpen(false)}
            loading={isLoading}
          >
            Only Admin can <strong> Edit Or Delete </strong> the Category
          </ConfirmModal>
        )}
      </div>
    </>
  );
}

export default page;
