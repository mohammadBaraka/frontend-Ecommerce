import { mainUrl } from "@/utils/mainUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
  reducerPath: "orderSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: mainUrl,
  }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => `order`,
      providesTags: ["category"],
    }),
  }),
});

export const { useGetOrderQuery } = orderSlice;
