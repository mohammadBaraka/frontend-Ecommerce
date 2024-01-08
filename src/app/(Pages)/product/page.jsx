"use client";
import { useGetCategoriesQuery } from "@/app/lib/apis/categoriesSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { addToCart } from "@/app/lib/slices/CartSlise";
import { mainUrl } from "@/utils/mainUrl";
import axios from "axios";
import Link from "next/link";
import * as React from "react";
export default async function Products() {
  const [categriesParams, setCategoriesParams] = React.useState(null);
  console.log(categriesParams);

  const { data: ctaegories } = useGetCategoriesQuery();
  const dispatch = useAppDispatch();
  const res =
    categriesParams === null
      ? await axios.get(`${mainUrl}/product`)
      : await axios.get(`${mainUrl}/product?categories=${categriesParams}`);

  return (
    <>
      <h3 className="text-2xl text-center my-4 font-Bold">
        Filter By Category
      </h3>
      <div className="flex flex-col justify-center xl:flex-row  xl:gap-4 border-2 border-teal-400 w-fit px-4 py-2 m-auto rounded-xl">
        <label htmlFor="All">
          {" "}
          All Product
          <input
            type="radio"
            id="All"
            name="categories"
            value={categriesParams}
            onClick={() => setCategoriesParams(null)}
            className="ml-2 mt-3"
          />
        </label>

        {ctaegories?.data.map((category) => {
          return (
            <div className="">
              <label htmlFor={category.name}>
                {category.name}
                <input
                  type="radio"
                  id={category.name}
                  name="categories"
                  value={category.id}
                  onClick={() => setCategoriesParams(category.id)}
                  className="ml-2 mt-3"
                />
              </label>
            </div>
          );
        })}
      </div>
      <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0 mt-5">
        <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
          {res.data.data.map((product) => {
            return (
              <section
                key={product.id}
                className="p-5 py-10 bg-transparen shadow-gray-400 text-center transform duration-500 hover:-translate-y-2"
              >
                <Link href={`product/${product.id}`}>
                  <img src={product.image} loading="lazy" alt={product.name} />
                </Link>

                <h1 className="text-3xl my-5">{product.name}</h1>
                <p className="mb-5">{product.description}</p>
                <h2 className="font-semibold mb-5">{product.price}$</h2>
                <button
                  className="p-2 px-6 bg-teal-500 text-white rounded-md mb-auto hover:bg-teal-600"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add To Cart
                </button>
              </section>
            );
          })}
        </section>
      </section>
    </>
  );
}
