import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div
      className={` fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center h-auto `}
    >
      <div className="w-1/4 h-1/4 p-2 flex justify-center items-center rounded-xl">
        <div className={`${styles.loader}`}>
          <span className={styles.loader_text}>loading</span>
          <span className={styles.load}></span>
        </div>
      </div>
    </div>
  );
}
