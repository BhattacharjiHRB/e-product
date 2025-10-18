"use client";

import { useCreateProductMutation } from "@/lib/Features/products/productSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CategoryList } from "../CategoryList";
import { Button } from "../ui/button";
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

const productValidation = z.object({
  images: z.array(z.string()).optional(), // base64 encoded strings
  name: z.string().min(1, "Name is required"),
  price: z
    .string()
    .refine((v) => !isNaN(Number(v)), "Please enter only numbers"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

type ProductFormValues = z.infer<typeof productValidation>;

const CreateProductForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productValidation),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      categoryId: "",
      images: [],
    },
  });

  // Convert images to Base64
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string[]) => void,
  ) => {
    e.preventDefault();

    const fileReaders: FileReader[] = [];
    const imageArray: string[] = [];

    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      files.forEach((file, index) => {
        if (!file.type.includes("image")) return null;

        fileReaders[index] = new FileReader();
        fileReaders[index].onload = (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          imageArray.push(imageDataUrl);

          // once all files are processed
          if (imageArray.length === files.length) {
            fieldChange(imageArray);
          }
        };
        fileReaders[index].readAsDataURL(file); // convert to base64
      });
    }
  };

  // Submit handler
  const onSubmit = async (values: ProductFormValues) => {
    setError(null);
    try {
      await createProduct({
        name: values.name,
        description: values.description || "",
        price: Number(values.price),
        categoryId: values.categoryId,
        images: values.images || [],
      }).unwrap();
      router.push("/products");
    } catch (err: any) {
      setError(err?.data?.message || "Product creation failed");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-lg"
      >
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div>
                  {field.value && field.value.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {field.value.map((imgUri, index) => (
                        <img
                          key={index}
                          src={imgUri}
                          alt={`Preview ${index}`}
                          className="object-cover rounded-lg aspect-square border border-primary"
                        />
                      ))}
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImage(e, field.onChange)}
                    className="p-10 h-24 border-2 border-dashed bg-primary/10 border-[#4E6E5D]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Product Name"
                  {...field}
                  value={field.value ?? ""}
                  className="px-6 bg-transparent border-[#4E6E5D]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Product Price"
                  {...field}
                  value={field.value ?? ""}
                  className="px-6 bg-transparent border-[#4E6E5D]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Product Description"
                  {...field}
                  value={field.value ?? ""}
                  rows={4}
                  className="px-6 bg-transparent border-[#4E6E5D]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategoryList
                  ref={field.ref}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 font-bold text-center">{error}</p>}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full flex justify-center items-center mt-3 bg-[#4E6E5D]"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-t-[#AD8A64] rounded-full animate-spin"></div>
          ) : (
            "Create Product"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
