"use client";

import { useGetCategoriesQuery } from "@/lib/Features/products/productSlice";
import { forwardRef, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CategoryListProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategoryList = forwardRef<HTMLInputElement, CategoryListProps>(
  ({ value, onChange }, ref) => {
    const categoryRef = useRef<HTMLButtonElement | null>(null);
    const { data: categories, isLoading, isError } = useGetCategoriesQuery();

    if (isLoading) {
      return (
        <div className="flex items-center text-sm text-gray-500">
          Loading categories...
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-red-500 text-sm">
          Failed to load categories. Please try again.
        </div>
      );
    }

    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full" ref={categoryRef}>
          <SelectValue>
            {categories?.find((cat) => cat.id === value)?.name ||
              "Select a category"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {categories?.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);
