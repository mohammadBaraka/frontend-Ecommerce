"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import * as React from "react";
import styles from "./AddProduct.module.css";
import Table from "./TablesProduct";
import Inputs from "./Inputs";
import InputFile from "./InputFile";
import { useGetCategoriesQuery } from "@/app/lib/apis/categoriesSlice";
import Loader from "@/Components/Loader/Loader";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGalleryMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/app/lib/apis/productSlice";
import { msgError, msgSuccess } from "@/utils/handleMessage";
import { Button } from "@material-tailwind/react";

export default function AddProducts() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: products, isLoading: productLoading } = useGetProductQuery();
  const [createProduct, { isLoading: loadingProduct }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: deletedLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [gallery, { data: galleries, isLoading: galleryLoading }] =
    useGalleryMutation();

  const [updateMode, setUpdateMode] = React.useState(false);
  const [moreImages, SetMoreImages] = React.useState([]);
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
    images: null,
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
      images: [],
      brand: "",
      price: 0,
      category: "",
      countInstock: 0,
      isFeatured: false,
    });
    SetMoreImages([]);
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
  const handleEdit = (product) => {
    setUpdateMode(true);
    setInputs({
      id: product.id || "",
      name: product.name || "",
      description: product.description || "",
      richDescription: product.richDescription || "",
      image: product.image || null,
      brand: product.brand || "",
      price: product.price || 0,
      category: product.category?.id || "",
      countInstock: product.countInstock || 0,
      isFeatured: product.isFeatured || false,
      images: product.images || [],
    });
    SetMoreImages([...product.images]);
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
  const hndleUploadMoreImages = () => {
    const images = new FormData();
    for (let i = 0; i < moreImages.length; i++) {
      images.append("images", moreImages[i]);
    }
    gallery({ id: inputs.id, images }).then((res) => {
      if (res?.error?.status === 400)
        return msgError(res?.error?.data.message || "Something went wrong");
      msgSuccess(res?.data?.message || "Images uploaded successfully");
    });
  };
  const spliceImages = (index) => {
    moreImages.splice(index, 1);
    SetMoreImages([...moreImages]);
  };
  const imagesShow = moreImages?.map((image, index) => {
    return image?.type ? (
      <div className="relative" key={index}>
        <img
          className="w-24 h-24 rounded-md"
          src={URL.createObjectURL(image)}
        />
        <TrashIcon
          className="w-6 h-w-6 text-red-400 absolute top-0 right-0 cursor-pointer"
          onClick={() => spliceImages(index)}
        />
      </div>
    ) : (
      <div key={index}>
        <img className="w-24 h-24 rounded-md" src={image} />
      </div>
    );
  });

  return (
    <>
      {isLoading ||
      loadingProduct ||
      deletedLoading ||
      updateLoading ||
      productLoading ? (
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
            <InputFile
              inputs={inputs}
              changeImages={(e) => SetMoreImages([...e.target.files])}
              moreImages={moreImages}
              handleChange={handleChange}
            />

            <Button onClick={hndleUploadMoreImages}>Upload</Button>

            {inputs?.image?.type ? (
              <div className="flex flex-col justify-start gap-2 ">
                <h2 className="text-gray-600 font-bold">Main Image</h2>
                <img
                  src={URL.createObjectURL(inputs?.image)}
                  alt="mainImage"
                  loading="lazy"
                  className="rounded-xl w-24 h-24"
                />
              </div>
            ) : (
              inputs?.image && (
                <div className="flex flex-col justify-start gap-2 ">
                  <h2 className="text-gray-600 font-bold">Main Image</h2>
                  <img
                    src={inputs.image}
                    alt="mainImage"
                    loading="lazy"
                    className="rounded-xl w-24 h-24"
                  />
                </div>
              )
            )}

            {moreImages?.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-gray-600 font-bold">More Images</h2>

                <div className="flex items-center gap-4">{imagesShow}</div>
              </div>
            )}
          </form>
        </section>
        {/*//?======================TABLE====================== */}
      </div>
      <Table
        products={products?.data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        product={handleEdit}
        handleReset={handleReset}
      />
    </>
  );
}
