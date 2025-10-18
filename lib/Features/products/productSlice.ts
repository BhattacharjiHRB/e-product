import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../Store/store";
import { Category, Product } from "../../types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.bitechx.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; isLoggedIn?: boolean }
    >({
      query: (email) => ({
        url: "/auth",
        method: "POST",
        body: email,
      }),
    }),

    getProductsData: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : ["Products"],
    }),

    getProductsFilter: builder.query<
      { items: Product[]; total: number },
      { page?: number; limit?: number; search?: string; categoryId?: string }
    >({
      query: ({ page, limit, search, categoryId }) => {
        const params = new URLSearchParams();
        if (page !== undefined) params.append("offset", String(page));
        if (limit !== undefined) params.append("limit", String(limit));
        if (search) params.append("search", search);
        if (categoryId) params.append("categoryId", categoryId);
        return `/products?offset=${page}&limit=${limit}`;
      },
      providesTags: (result) => {
        if (!result || !Array.isArray(result.items)) {
          return [{ type: "Products", id: "LIST" }];
        } else {
          return [
            ...result.items.map(({ id }) => ({
              type: "Products" as const,
              id,
            })),
            { type: "Products", id: "LIST" },
          ];
        }
      },
    }),

    getProductDetails: builder.query<Product, { slug: string }>({
      query: ({ slug }) => `/products/${slug}`,
      providesTags: (data, error, { slug }) => [{ type: "Products", id: slug }],
    }),

    createProduct: builder.mutation<
      Product,
      {
        name: string;
        price: number;
        description?: string;
        categoryId: string;
        images?: string[];
      }
    >({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string; updata: Partial<Product> }
    >({
      query: ({ id, updata }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updata,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),

    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsDataQuery,
  useGetProductsFilterQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = productApi;
