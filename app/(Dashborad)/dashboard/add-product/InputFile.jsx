"use client";
import {
  DocumentArrowUpIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/solid";
import styles from "./AddProduct.module.css";
export default function InputFile({ inputs, handleChange, changeImages }) {
  return (
    <div className="flex justify-between items-center">
      <label className={styles.custum_file_upload} htmlFor={inputs.image}>
        <div className={styles.icon}>
          <DocumentArrowUpIcon />
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

      <label className={styles.custum_file_upload} htmlFor="images">
        <div className={styles.icon}>
          <CloudArrowUpIcon />
        </div>
        <div className={styles.text}>
          <span>Upload More Images</span>
        </div>
        <input
          type="file"
          id="images"
          name="files"
          multiple
          onChange={changeImages}
        />
      </label>
    </div>
  );
}
