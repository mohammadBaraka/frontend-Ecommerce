"use client";
import Link from "next/link";
import styles from "./Nav.module.css";
import * as React from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useAppSelector } from "@/app/lib/hooks";
import { useGetTokenQuery, useLogoutMutation } from "@/app/lib/apis/authSlice";
import Loader from "../Loader/Loader";
import { redirect, usePathname } from "next/navigation";
import { msgConfirm, msgError, msgSuccess } from "@/utils/handleMessage";
export default function Nav() {
  const [hidden, setHidden] = React.useState(true);
  const { data, isSuccess, isLoading } = useGetTokenQuery();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const cart = useAppSelector((state) => state.cart);
  const isAdmin = data?.user && data?.user !== undefined ? true : false;
  const pathName = usePathname();
  //?==========VAIDATE IF THE USER ADMIN OR NOT OR IS LOGED IN==========
  // if (pathName === "/dashboard" && !isAdmin) return redirect("/404");
  if (pathName === "/login" && data?.user !== undefined) return redirect("/");
  if (pathName === "/register" && data?.user !== undefined)
    return redirect("/");

  const handleLogout = () => {
    logout().then((res) => {
      if (res?.error?.status === 400) {
        return msgError(res?.error?.data.message || "Something went wrong");
      }
      msgSuccess(res?.data?.message || "Logout successfully");
    });
  };

  return (
    <>
      {isLoading || logoutLoading ? <Loader /> : null}
      <section className="flex justify-center gap-10 items-center p-3 xl:flex xl:justify-between xl:items-center relative">
        <div className="font-bold font-mono text-3xl">
          <h2>Logo</h2>
        </div>
        <div>
          <ul
            className={`${
              hidden
                ? `hidden`
                : `fixed left-0 top-0 bg-transparent h-full bg-black shadow-inherit py-4 px-28 text-center -m-90 `
            }   xl:flex xl:justify-between xl:gap-5 xl:font-bold xl:text-xl xl:static xl:bg- xl:shadow-none xl:bg-transparent xl:w-full `}
          >
            <Link href="/">
              <li>About</li>
            </Link>
            <Link href="/">
              <li>Services</li>
            </Link>
            <Link href="/product">
              <li>Products</li>
            </Link>
            <Link href="/cart">
              <li>Cart {cart.length}</li>
            </Link>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-3">
          <ToggleSwitch />

          {isAdmin && isSuccess && (
            <Link href="/dashboard" className={styles.button}>
              Daasboard
              <div className={styles.arrow_wrapper}>
                <div className={styles.arrow}></div>
              </div>
            </Link>
          )}
          {isSuccess ? (
            <button
              className={styles.Btn}
              onClick={() => msgConfirm("Want To Logout", handleLogout)}
            >
              <div className={styles.sign}>
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>

              <div className={styles.text}>Logout</div>
            </button>
          ) : (
            <Link href="/register" className={styles.button}>
              Sign up
              <div className={styles.arrow_wrapper}>
                <div className={styles.arrow}></div>
              </div>
            </Link>
          )}

          <div className="xl:hidden">
            <label className={styles.burger} htmlFor="burger">
              <input
                type="checkbox"
                id="burger"
                onClick={() => setHidden((prev) => !prev)}
              />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
