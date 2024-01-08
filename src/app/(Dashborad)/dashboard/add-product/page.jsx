"use client";
import styles from "./AddProduct.module.css";
import * as React from "react";
import { useGetCategoriesQuery } from "@/app/lib/apis/categoriesSlice";
import Loader from "@/Components/Loader/Loader";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/app/lib/apis/productSlice";
import { msgError, msgSuccess } from "@/utils/handleMessage";
import Table from "./TablesProduct";

export default function AddProducts() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: products, isLoading: productLoading } = useGetProductQuery();
  const [createProduct, { isLoading: loadingProduct }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: deletedLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [updateMode, setUpdateMode] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    id: "",
    name: "",
    description: "",
    richDescription: "",
    image: null,
    brand: "",
    price: 0,
    category: "",
    countInstock: 0,
    isFeatured: false,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleReset = () => {
    setInputs({
      id: "",
      name: "",
      description: "",
      richDescription: "",
      image: null,
      brand: "",
      price: 0,
      category: "",
      countInstock: 0,
      isFeatured: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("richDescription", inputs.richDescription);
    formData.append("image", inputs.image);
    formData.append("brand", inputs.brand);
    formData.append("price", inputs.price);
    formData.append("category", inputs.category);
    formData.append("countInstock", inputs.countInstock);
    formData.append("isFeatured", inputs.isFeatured);

    if (updateMode) {
      const id = inputs.id;
      updateProduct({ id, formData }).then((res) => {
        if (res?.error?.status === 400)
          return msgError(res?.error?.data.message || "Something went wrong");
        if (res?.error?.status === 500) return msgError("Plz Select Category");
        msgSuccess(res?.data?.message || "Updated Success");
        setUpdateMode(false);
        handleReset();
      });
    } else {
      createProduct(formData).then((res) => {
        if (res?.error?.status === 400)
          return msgError(
            res?.error?.data.message || "All Flailds Are Required"
          );
        msgSuccess(res?.data?.message || "Product created successfully");
        handleReset();
      });
    }
  };
  const handleEdit = (product) => {
    setUpdateMode(true);
    setInputs({
      id: product.id || "",
      name: product.name || "",
      description: product.description || "",
      richDescription: product.richDescription || "",
      image: inputs.image || null,
      brand: product.brand || "",
      price: product.price || 0,
      category: product.category?.id || "",
      countInstock: product.countInstock || 0,
      isFeatured: product.isFeatured || false,
    });
    scroll({
      top: 0,
      behavior: "smooth",
    });
    console.log(product);
  };

  const handleDelete = (id) => {
    deleteProduct(id).then((res) => {
      if (res?.error?.status === 400)
        return msgError(res?.error?.data.message || "Something went wrong");
      msgSuccess(res?.data?.message || "Product deleted successfully");
      handleReset();
    });
  };
  return (
    <>
      {isLoading || loadingProduct || deletedLoading || updateLoading ? (
        <Loader />
      ) : null}
      <div className="w-full flex justify-center ">
        <section className="flex flex-col items-center justify-center xl:flex xl:flex-row xl:justify-between xl:items-center">
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.title}>
              {updateMode ? "Update Product" : "Add Product"}{" "}
            </p>
            <select
              onChange={handleChange}
              name="category"
              value={inputs.category}
              className="py-4 px-2 border-solid border-teal-400 border-2 border-spacing-0 rounded-lg outline-none bg-transparent"
            >
              <option value="" className="text-teal-500">
                Select Category
              </option>
              {categories?.data.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="bg-gray-200"
                >
                  {category.name}
                </option>
              ))}
            </select>
            <label>
              <input
                className={styles.input}
                type="text"
                value={inputs.name}
                name="name"
                onChange={handleChange}
              />
              <span>Name</span>
            </label>
            <label>
              <textarea
                className={styles.input}
                value={inputs.description}
                name="description"
                onChange={handleChange}
              />
              <span>Discription</span>
            </label>

            <label>
              <input
                className={styles.input}
                type="text"
                value={inputs.richDescription}
                name="richDescription"
                onChange={handleChange}
              />
              <span>Rich Description</span>
            </label>
            <label>
              <input
                className={styles.input}
                type="text"
                value={inputs.brand}
                name="brand"
                onChange={handleChange}
              />
              <span>Brand</span>
            </label>

            <div className={styles.flex}>
              <label>
                <input
                  className={styles.input}
                  type="number"
                  value={inputs.price}
                  name="price"
                  onChange={handleChange}
                />
                <span>Price</span>
              </label>

              <label>
                <input
                  className={styles.input}
                  type="number"
                  value={inputs.countInstock}
                  name="countInstock"
                  onChange={handleChange}
                />
                <span>Count Instock</span>
              </label>
            </div>
            <select
              name="isFeatured"
              id=""
              className="py-4 px-2 border-solid border-teal-400 border-2 border-spacing-0 rounded-lg outline-none bg-transparent"
              onChange={handleChange}
            >
              <option value="" className="text-teal-500">
                Select Category
              </option>

              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            {updateMode ? (
              <button className={`${styles.submit}`}>Update</button>
            ) : (
              <button className={`${styles.submit}`}>Submit</button>
            )}

            {/*//?===========UPLOAD AN IMAGE=============*/}

            <label className={styles.custum_file_upload} htmlFor={inputs.image}>
              <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    id="SVGRepo_tracerCarrier"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>
              </div>
              <div className={styles.text}>
                <span>Click to upload image</span>
              </div>
              <input
                type="file"
                id={inputs.image}
                name="image"
                onChange={handleChange}
              />
            </label>
          </form>
        </section>
      </div>
      {/*//?======================TABLE====================== */}
      <Table
        products={products?.data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}
