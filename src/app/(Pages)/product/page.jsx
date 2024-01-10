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
import Link from "next/link";
import * as React from "react";
import { useGetTokenQuery } from "@/app/lib/apis/authSlice";
import Loader from "@/Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { msgConfirm } from "@/utils/handleMessage";
import {
  useGetProductByCategoryMutation,
  useGetProductQuery,
} from "@/app/lib/apis/productSlice";

export default function Products() {
  const router = useRouter();
  const { data: token, isLoading, isError } = useGetTokenQuery(null);
  const { data: ctaegories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(null);
  const { data: products, isLoading: productLoading } =
    useGetProductQuery(null);
  const [getProductByCategory, { data: category }] =
    useGetProductByCategoryMutation();
  console.log("🚀 ~ Products ~ category:", category);

  const dispatch = useAppDispatch();
  const loginPage = () => {
    router.push("/login");
  };
  const porductShow = category?.data ? category?.data : products?.data;
  return (
    <>
      {isLoading || categoriesLoading || productLoading ? <Loader /> : null}
      <h3 className="text-2xl text-center my-8 font-Bold ">
        Filter By Category
      </h3>
      <div className="flex flex-col justify-center xl:flex-row  xl:gap-4 border-2 border-teal-400 w-fit px-4 py-2 m-auto rounded-xl">
        <Radio
          defaultChecked
          label="All Products"
          value="all"
          color="teal"
          type="radio"
          id="All"
          name="categories"
          onClick={() => getProductByCategory(products?.data)}
        />
        {ctaegories?.data.map((category) => {
          return (
            <div className="" key={category?.id}>
              <Radio
                label={category?.name}
                color="teal"
                type="radio"
                id={category.name}
                name="categories"
                value={category.id}
                onClick={() => getProductByCategory(category?.id)}
              />
            </div>
          );
        })}
      </div>
      <section className="mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0 mt-5 w-[100%] md:w-[95%] xl:w-[90%]">
        <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
          {porductShow?.map((product) => {
            return (
              <Card className="w-[100%] h-[100%] relative" key={product?.id}>
                <CardHeader shadow={false} floated={false} className="h-96">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="h-full w-full"
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
                  {!token?.user && (
                    <Button
                      onClick={
                        isError
                          ? () => msgConfirm("You Should Login", loginPage)
                          : () => dispatch(addToCart(product))
                      }
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
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </section>
      </section>
    </>
  );
}
