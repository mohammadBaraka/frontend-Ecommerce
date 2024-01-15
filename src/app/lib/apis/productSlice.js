import { mainUrl } from "@/utils/mainUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productSlice = createApi({
  reducerPath: "productSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: mainUrl,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => "product",
      providesTags: ["product"],
    }),
    getProductByCategory: builder.mutation({
      query: (category) => ({
        url: `product?categories=${category}`,
        method: "GET",
      }),
    }),

    getProductById: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (inputs) => ({
        url: "product",
        method: "POST",
        body: inputs,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});
export const {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByCategoryMutation,
  useLazyGetProductByIdQuery,
} = productSlice;
