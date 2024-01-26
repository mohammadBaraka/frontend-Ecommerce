"use clint";
import { msgConfirm } from "@/utils/handleMessage";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import PaginatedItems from "@/utils/Paginate";
import { Select, Option } from "@material-tailwind/react";
import * as React from "react";
export default function Table({
  products,
  handleEdit,
  handleDelete,
  handleReset,
}) {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(3);
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = products?.slice(start, end);

  return (
    <div className="w-[100%] flex justify-center items-center mt-10 ">
      <div className="w-full xl:w-[95%] mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 shadow-lg rounded ">
          <div className="block w-full overflow-x-auto">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-bold text-blueGray-700 text-lg ">
                    Your Products
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Button
                    onClick={handleReset}
                    className="bg-primary text-white active:bg-primary text-md font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Clear Inputs
                  </Button>
                </div>
              </div>
            </div>
            <table className="items-center bg-transparent w-full border-collapse text-2xl ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Brand
                  </th>

                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Category
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Price
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Is Featured
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Image
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Images
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    aCTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {items?.map((product, index) => {
                  return (
                    <tr key={product.id} className="hover:bg-gray-200">
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {index + 1}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {product.name}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {product.brand}
                      </th>

                      {product?.category === null ? (
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-red-400">
                          Not Found
                        </th>
                      ) : (
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                          {product.category?.name}
                        </th>
                      )}
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {product.price}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        False
                      </th>

                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="rounded-full p-2 w-16 h-16 border-spacing-3 border-2 border-blueGray-700"
                        />
                      </th>

                      <th className="flex border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {product?.images.map((img, index) => {
                          return (
                            <div className="" key={index}>
                              <img
                                src={img}
                                alt={product?.name}
                                className="rounded-full p-2 w-12 h-12 border-spacing-3 border-2 border-blueGray-700"
                              />
                            </div>
                          );
                        })}
                      </th>

                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        <section className="flex justify-center items-center gap-2">
                          <div className="group relative">
                            <button onClick={() => handleEdit(product)}>
                              <PencilSquareIcon className="font-bold w-8 text-blue-400 hover:scale-125 duration-200 hover:stroke-blue-400" />
                            </button>
                            <span
                              className="absolute -top-14 left-[50%] 
                              -translate-x-[50%] z-20 origin-left scale-0 px-3 
                              rounded-lg border border-gray-300 bg-white py-2 
                              text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                            >
                              Edit
                            </span>
                          </div>
                          <div className="group relative">
                            <button
                              onClick={() =>
                                msgConfirm(
                                  `Want To Delete ${product.name} `,
                                  () => handleDelete(product.id)
                                )
                              }
                            >
                              <TrashIcon className="font-bold w-8 text-red-400 hover:scale-125 duration-200 hover:stroke-red-400" />
                            </button>
                            <span
                              className="absolute -top-14 left-[50%] 
                              -translate-x-[50%] z-20 origin-left scale-0 px-3 
                              rounded-lg border border-gray-300 bg-white py-2 
                              text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                            >
                              Delte
                            </span>
                          </div>
                          <div className="group relative">
                            <Link href={`/product/${product.id}`}>
                              <EyeIcon className="font-bold w-8 text-primary hover:scale-125 duration-200 hover:stroke-primary" />
                            </Link>
                            <span
                              className="absolute -top-14 left-[50%] 
                              -translate-x-[50%] z-20 origin-left scale-0 px-3 
                              rounded-lg border border-gray-300 bg-white py-2 
                              text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                            >
                              Show
                            </span>
                          </div>
                        </section>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center items-center gap-6">
              <div className="flex w-72 flex-col gap-6 text-xl">
                <Select
                  onChange={(e) => setLimit(+e)} // Call handleLimitChange when the select value changes
                  name="limit"
                  variant="outlined"
                  label="Limit Of Products"
                >
                  <Option value={"3"}>3</Option>
                  <Option value={"6"}>6</Option>
                  <Option value={"9"}>9</Option>
                  <Option value={"12"}>12</Option>
                  <Option value={"15"}>15</Option>
                </Select>
              </div>

              <PaginatedItems
                products={products}
                itemsPerPage={limit}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
