"use client";

import { getCategoryColumns } from "@/components/CategoryList/CategoryColumn";
import { CategoryDataTable } from "@/components/CategoryList/CategoryDataTable";
import ConfirmModal from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/lib/Features/products/productSlice";
import { Category } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleEdit = (c: Category) => {
    setConfirmOpen(true);
  };
  const handleDelete = (c: Category) => {
    setConfirmOpen(true);
  };
  const columns = getCategoryColumns({
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
        <CategoryDataTable columns={columns} data={data ?? []} />
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
