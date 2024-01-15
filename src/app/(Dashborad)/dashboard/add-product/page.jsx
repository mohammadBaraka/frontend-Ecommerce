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
import Inputs from "./Inputs";
import InputFile from "./InputFile";

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
    const isFeatured = inputs.isFeatured === "true" ? true : false;
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
    formData.append("isFeatured", isFeatured);

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
  console.log(inputs.isFeatured);
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
      <div className="flex flex-row justify-center items-center">
        <section className="flex flex-col items-center justify-center xl:flex xl:flex-row xl:justify-between xl:items-center">
          <form className={styles.form} onSubmit={handleSubmit}>
            {/*//?======================Inputs====================== */}
            <Inputs
              categories={categories}
              handleChange={handleChange}
              inputs={inputs}
              updateMode={updateMode}
            />
            <InputFile handleChange={handleChange} inputs={inputs} />
          </form>
        </section>
        {/*//?======================TABLE====================== */}
      </div>
      <Table
        products={products?.data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}
