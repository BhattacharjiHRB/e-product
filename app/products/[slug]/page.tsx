"use client";

import Error from "@/app/error";
import Loading from "@/app/loading";
import UpdateProductModal from "@/components/forms/UpdateProduct";
import { Button } from "@/components/ui/button";
import {
  useDeleteProductMutation,
  useGetProductDetailsQuery,
} from "@/lib/Features/products/productSlice";
import { ArrowLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

export type Params = Promise<{ slug: string }>;

export default function Page(props: { params: Params }) {
  const param = use(props.params);
  const slug = param.slug;
  const { data, isLoading } = useGetProductDetailsQuery({ slug });
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirmDelete = async () => {
    try {
      if (!data?.id) return alert("Invalid product ID");
      await deleteProduct(data.id).unwrap();
      router.back();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (isLoading) return <Loading />;
  if (!data) return <Error />;

  return (
    <>
      <Button
        className="flex flex-1 items-center m-5 justify-center gap-2 "
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-10 w-10" />
        <span className="text-md font-medium">Back</span>
      </Button>
      <div className=" container md:mx-auto p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="md:w-1/2 mt-10 space-y-5">
          <img
            src={data.images?.[0]}
            alt="Product Image"
            className="object-cover w-full aspect-square shadow-2xl"
          />
        </div>
        <div className="md:w-1/2 gap-5 flex flex-col">
          <div className="flex justify-between items-start">
            <div className="space-y-6">
              <h1 className="text-xl md:text-3xl lg:text-5xl font-Bold">
                {data.name.substring(0, 150)}
              </h1>
              <div className="w-fit h-8 flex flex-1 items-center px-2 rounded-full border-2 bg-[#AD8A64]/20">
                <span className="border-2 rounded-full p-1">
                  <img
                    src={
                      data.category.image
                        ? data.category.image
                        : "../public/images/error.jpg"
                    }
                    alt=""
                    className="h-5 w-5 object-cover rounded-full"
                  />
                </span>
                <p className="text-sm text-[#AD8A64]">{data.category.name}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm md:text-lg lg:text-xl font-medium">
              ${data.price.toFixed(2)}
            </p>
            <p className="mt-3">{data.description || "No description."}</p>
          </div>

          <div className="flex flex-col md:flex-row w-full gap-4 mt-6">
            <UpdateProductModal slug={slug} />
            <Button
              variant={"destructive"}
              onClick={() => setOpen(true)}
              className="px-5 py-2 flex justify-center rounded-lg border text-white hover:bg-red-300 hover:text-red-500 "
            >
              <Trash className="w-5 h-5" />
              Delete
            </Button>
          </div>

          <ConfirmModal
            open={open}
            title="Delete product?"
            onClose={() => setOpen(false)}
            onConfirm={onConfirmDelete}
            loading={deleting}
          >
            This will permanently remove <strong>{data.name}</strong>.
          </ConfirmModal>
        </div>
      </div>
    </>
  );
}
