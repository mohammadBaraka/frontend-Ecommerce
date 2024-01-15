import { mainUrl } from "@/utils/mainUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
  reducerPath: "orderSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: mainUrl,
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => `order`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (inputs) => ({
        url: "order",
        method: "POST",
        body: inputs,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetOrderQuery, useCreateOrderMutation } = orderSlice;
