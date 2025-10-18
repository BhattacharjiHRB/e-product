"use client";

import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/lib/Features/products/productSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenBoxIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CategoryList } from "../CategoryList";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface UpdateProductModalProps {
  slug: string;
  triggerLabel?: string;
}

const productValidation = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().refine((value) => !isNaN(Number(value)), {
    message: "Please enter only numbers",
  }),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  slug: z.string().min(1, "Slug is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export default function UpdateProductModal({ slug }: UpdateProductModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: product } = useGetProductDetailsQuery({ slug });
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const form = useForm<z.infer<typeof productValidation>>({
    resolver: zodResolver(productValidation),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price?.toString() ?? "",
      slug: product?.slug ?? "",
      categoryId: product?.category.id ?? "",
      images: [],
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string[]) => void,
  ) => {
    e.preventDefault();
    const fileReaders: FileReader[] = [];
    const imageArray: string[] = [];

    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFiles(files);

      files.forEach((file, index) => {
        if (!file.type.includes("image")) return;

        fileReaders[index] = new FileReader();
        fileReaders[index].onload = (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          imageArray.push(imageDataUrl);

          if (imageArray.length === files.length) {
            fieldChange(imageArray);
          }
        };
        fileReaders[index].readAsDataURL(file);
      });
    }
  };

  const onSubmit = async (value: z.infer<typeof productValidation>) => {
    setError(null);
    try {
      await updateProduct({
        id: product!.id,
        updata: {
          name: value.name,
          description: value.description,
        },
      }).unwrap();
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err?.data?.message || "Product update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-5 py-2 flex justify-center gap-2 border rounded-lg bg-primary text-white hover:bg-primary/50 hover:text-primary"
        >
          <PenBoxIcon className="w-5 h-5" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update {product?.slug}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled
                      onChange={(e) => handleImage(e, field.onChange)}
                      className="p-10 h-24 border-2 border-dashed bg-primary/10 border-[#4E6E5D]"
                    />
                  </FormControl>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {field.value?.map((imgUri, index) => (
                      <img
                        key={index}
                        src={imgUri}
                        alt={`product-${index}`}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Product name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Product price" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Enter product description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategoryList
                      ref={field.ref}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-red-500 text-center font-semibold">{error}</p>
            )}

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-[#4E6E5D] text-white hover:bg-[#395a4a]"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
