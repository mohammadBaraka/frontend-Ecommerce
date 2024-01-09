"use client";
import { useGetCategoriesQuery } from "@/app/lib/apis/categoriesSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { addToCart } from "@/app/lib/slices/CartSlise";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Radio,
} from "@material-tailwind/react";
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
  console.log(res?.data);
  return (
    <>
      <h3 className="text-2xl text-center my-4 font-Bold">
        Filter By Category
      </h3>
      <div className="flex flex-col justify-center xl:flex-row  xl:gap-4 border-2 border-teal-400 w-fit px-4 py-2 m-auto rounded-xl">
        <Radio
          label="All Product"
          color="teal"
          type="radio"
          id="All"
          name="categories"
          value={categriesParams}
          onClick={() => setCategoriesParams(null)}
        />
        {ctaegories?.data.map((category) => {
          return (
            <div className="">
              <Radio
                label={category?.name}
                color="teal"
                type="radio"
                id={category.name}
                name="categories"
                value={category.id}
                onClick={() => setCategoriesParams(category.id)}
              />
            </div>
          );
        })}
      </div>
      <section className="mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0 mt-5 w-[100%] xl:w-[90%]">
        <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
          {res?.data?.data?.map((product) => {
            return (
              <Card className="w-[100%] h-[100%] relative">
                <CardHeader shadow={false} floated={false} className="h-96">
                  <img
                    src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                    alt={product?.name}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium ml-2">
                      {product?.name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium mb-4">
                      ${product?.price}
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75 my-6"
                  >
                    {product?.description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 ">
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="absolute bottom-3 
                    left-auto w-[90%]
                     bg-teal-900/10 text-blue-gray-900 shadow-none
                      hover:scale-105 hover:shadow-none 
                      focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </section>
      </section>
    </>
  );
}
