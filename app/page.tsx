"use client";

import { CategoryList } from "@/components/CategoryList";
import ProductCard from "@/components/ProductCard";
import { useGetProductsDataQuery } from "@/lib/Features/products/productSlice";
import { useAuth } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function Page() {
  const { data, isLoading, error, refetch } = useGetProductsDataQuery();
  const isLoggedIn = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    return data.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || product.category.id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    if (!data) return [];
    const uniqueCategories = Array.from(
      new Set(data.map((p) => p.category.id)),
    );
    return uniqueCategories;
  }, [data]);

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

        <p className="text-lg sm:text-xl md:text-2xl text-white text-center mb-8 max-w-md">
          Please Login to see The Products
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

  return (
    <div className=" flex flex-col items-center justify-center mx-auto container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <div className="md:col-span-2 row-span-2 rounded-2xl p-2 flex flex-col justify-center hover:scale-[1.02] transition">
          <img
            src={"/images/hero-2.jpg"}
            alt="hero"
            loading="lazy"
            className="object-cover rounded-2xl w-full h-full"
          />
          <h1 className=" absolute mx-5 text-xl sm:text-2xl md:text-4xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-black bg-clip-text text-transparent">
            {" "}
            Featured Products{" "}
          </h1>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-center hover:scale-[1.02] transition">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Summer Sale
          </h2>
          <p className="font-semibold">
            Get upto <strong>50%</strong> discount
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-teal-500 flex flex-col justify-center rounded-2xl p-6 text-white shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4x font-bold">
            Electronic Products
          </h2>
          <p className="font-semibold">
            Get upto <strong>30%</strong> discount
          </p>
        </div>

        <div className="md:col-span-2 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl p-6 text-white shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4x font-bold">
            Sneakers
          </h2>
          <p className="font-semibold">
            Get upto <strong>40%</strong> discount
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-evenly my-6 w-full max-w-4xl px-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold p-10 m-10 leading-1">
          Products
        </h1>
        <div></div>
        <fieldset className="w-80 md:w-xl">
          <legend>Search</legend>
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </fieldset>
        <fieldset className=" w-80 md:w-xl">
          <legend>Category</legend>
          <CategoryList
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </fieldset>
      </div>
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center gap-4 h-screen">
          <div className="w-30 h-30 border-4 border-t-[#AD8A64] rounded-full animate-spin"></div>
          <div className="text-6xl font-semibold">Loading..</div>
        </div>
      ) : error ? (
        <div className="text-red-300 bg-red-800 w-fit px-3 py-2 rounded">
          Failed to load products
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-red-700 text-xl font-bold my-20">
          No products found
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 sm:p-5 md:p-0">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} refetch={refetch} />
          ))}
        </div>
      )}
    </div>
  );
}
