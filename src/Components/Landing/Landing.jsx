// import Image from "next/image";
import styles from "./Landing.module.css";
import Link from "next/link";
export default function Landing() {
  return (
    <div className="flex flex-col justify-center items-center m-auto p-1 gap-12 w-10/12  xl:flex-row xl:justify-between xl:items-center xl:w-full xl:p-0 marginGlobal">
      <div className="flex flex-col gap-5 justify-center items-center  text-center xl:flex xl:items-start xl:w-2/5">
        <h1 className="text-3xl font-bold xl:text-4xl">
          Start Shopping From Any Whare
        </h1>
        <p className="text-lg mt-4 font-bold text-gray-400 xl:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link href="/">
          <button className={`${styles.button}`}>
            <p>Get Stared</p>
          </button>
        </Link>
      </div>
      <div className="xl:w-1/2">
        <img src="/images/shopping.svg" alt="Shopping" />
      </div>
    </div>
  );
}
