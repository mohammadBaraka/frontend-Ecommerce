"use client";
import styles from "../../register/Register.module.css";
import { useGetTokenQuery } from "@/app/lib/apis/authSlice";
import { useCreateOrderMutation } from "@/app/lib/apis/orderSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { clear } from "@/app/lib/slices/CartSlise";
import { msgError, msgSuccess } from "@/utils/handleMessage";
import * as React from "react";

export default function Ordering() {
  const dispatch = useAppDispatch();
  const { data: userData, isLoading: loadingData } = useGetTokenQuery();
  const userId = userData !== undefined ? userData?.userId : null;
  const [createOrder, { data, isError, isLoading, isSuccess }] =
    useCreateOrderMutation();
  const carts = useAppSelector((state) => state.cart);
  const orderItems = carts.map((item) => {
    const order = {
      quantity: item?.quantity,
      product: item?.id,
    };
    return order;
  });

  const [inputs, setInputs] = React.useState({
    orderItems,
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    user: userId,
  });
  console.log(inputs, "inputs");

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder(inputs).then((res) => {
      if (res?.error?.status === 500)
        return msgError("All Failds Are Reauired");
      dispatch(clear());
      msgSuccess(res?.data?.message || "Ordering Success!");
    });
  };

  return (
    <>
      {carts.length > 0 ? (
        <section className="flex justify-center items-center marginGlobal">
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.title}>Ordering </p>
            <p className={styles.message}>Cash On Deleviry</p>
            <div className={styles.flex}>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="shippingAddress1"
                  onChange={handleChange}
                />
                <span>Shipping Address 1</span>
              </label>

              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="shippingAddress2"
                  onChange={handleChange}
                />
                <span>Shipping Address 2</span>
              </label>
            </div>
            <div className={styles.flex}>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="city"
                  onChange={handleChange}
                />
                <span>City</span>
              </label>

              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="zip"
                  onChange={handleChange}
                />
                <span>Zip Code</span>
              </label>
            </div>

            <div className={styles.flex}>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="country"
                  onChange={handleChange}
                />
                <span>Country</span>
              </label>

              <label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=""
                  name="phone"
                  onChange={handleChange}
                />
                <span>phone</span>
              </label>
            </div>

            <button className={styles.submit}>Submit</button>
          </form>
        </section>
      ) : (
        <div className="flex justify-center marginGlobal text-2xl font-bold">
          No Products To Ordering...
        </div>
      )}
    </>
  );
}
