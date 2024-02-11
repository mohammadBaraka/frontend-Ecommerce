"use client";
import { useParams } from "next/navigation";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import * as React from "react";
import { useLazyGetProductByIdQuery } from "lib/apis/productSlice";
import Loader from "components/Loader/Loader";
export default function ProductDetails() {
  const [getProductById, { data, isLoading }] = useLazyGetProductByIdQuery();
  const [image, setImage] = React.useState(null);
  const product = data?.data;

  const { id } = useParams();

  React.useEffect(() => {
    getProductById(id);
  }, []);
  const showImages = (src) => {
    setImage(src);
  };
  const images = product?.images.map((image, index) => {
    return (
      <img
        src={image}
        alt={product.name}
        key={index}
        className="w-16 h-16 rounded-full cursor-pointer"
        onClick={() => showImages(image)}
      />
    );
  });

  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-transparent dark:bg-transparent py-8 border-2 darK:border-white marginGlobal w-[95%] m-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4 justify-between">
            <div className="md:flex-1 px-4">
              <div className="h-[560px] rounded-lg light:bg-white dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full"
                  src={image === null ? product?.image : image}
                  alt={product?.name}
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <div className="flex gap-2 items-center mb-4">
                <h2 className="font-bold text-gray-700">Product Name:</h2>
                <p className="text-lg text-primary font-bold">
                  {product?.name}
                </p>
              </div>
              <div className="flex  mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 ">Price: </span>
                  <span className="text-primary text-lg font-bold ">
                    {product?.price}$
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700 ">
                    Availability:
                  </span>
                  {product?.countInstock > 0 ? (
                    <span className="flex items-center gap-2 text-lg font-bold text-primary">
                      In Stock <CheckIcon className="w-6 h-6 font-bold" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-lg font-bold text-red-400">
                      In Stock <XMarkIcon className="w-6 h-6 font-bold" />
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 ">More Images:</span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2 gap-4">
                  <img
                    className="w-16 h-16 rounded-full cursor-pointer"
                    src={product?.image}
                    alt={product?.name}
                    onClick={() => setImage(product.image)}
                  />
                  {images}
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700">
                  Product Description:
                </span>
                <p className="text-primary text-lg mt-2 font-bold">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
