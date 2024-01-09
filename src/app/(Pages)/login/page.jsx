"use client";
import Image from "next/image";
import styles from "../register/Register.module.css";
import * as React from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useLoginMutation } from "@/app/lib/apis/authSlice";
import Loader from "@/Components/Loader/Loader";
import { msgSuccess, msgError } from "../../../utils/handleMessage";
export default function Register() {
  const router = useRouter();
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs).then((res) => {
      if (res?.error?.status === 400) {
        return msgError(res?.error?.data.message || "Something went wrong");
      }
      msgSuccess(res?.data?.message || "Login successfully");
      router.push("/");
    });
  };

  return (
    <>
      {/* Validatin For Login Mutation  */}
      {isLoading && <Loader />}
      <section
        className="flex flex-col items-center justify-center marginGlobal

    xl:flex xl:flex-row xl:justify-between xl:items-center"
      >
        <form className={`${styles.form} w-8/12`} onSubmit={handleSubmit}>
          <p className={styles.title}>Login </p>
          <p className={styles.message}>
            Signin now and get full access to our app.
          </p>

          <label>
            <input
              className={styles.input}
              type="email"
              placeholder=""
              name="email"
              onChange={handleChange}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              className={styles.input}
              type="password"
              placeholder=""
              name="password"
              onChange={handleChange}
            />
            <span>Password</span>
          </label>

          <button className={styles.submit}>Submit</button>

          <p className={styles.signin}>
            Already have an acount ? <Link href="/register">Signin</Link>{" "}
          </p>
        </form>
        <div className="hidden xl:flex">
          <Image
            src="/images/login.svg"
            alt="signup"
            width={800}
            height={800}
          />
        </div>
      </section>
    </>
  );
}
