import Image from "next/image";
import styles from "./About.module.css";
import Link from "next/link";
export default function About() {
  const data = [
    {
      id: 1,
      title: "Section1",
      desc: `  Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
      perspiciatis quo et, ducimus sint enim asperiores consequatur ab vero
      ipsam, culpa veniam voluptates laudantium ut qui sapiente esse eum
      voluptatum!`,
      img: "/images/about-1.jpg",
    },
    {
      id: 2,
      title: "Section2",

      desc: `  Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
      perspiciatis quo et, ducimus sint enim asperiores consequatur ab vero
      ipsam, culpa veniam voluptates laudantium ut qui sapiente esse eum
      voluptatum!`,
      img: "/images/about-1.jpg",
    },
  ];
  return (
    <>
      <h3 className="text-4xl text-center font-bold marginGlobal">About Us</h3>
      <section className="marginGlobal flex flex-col gap-10 xl:gap-7">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="
               flex flex-col gap-5 w-5/6 m-auto 
               xl:flex xl:flex-row xl:w-full xl:odd:flex-row-reverse
               "
            >
              <div className="w-full">
                <Image
                  src={item.img}
                  alt="image"
                  width={600}
                  height={600}
                  className=" rounded-xl"
                />
              </div>
              <div
                className="flex flex-col items-center justify-center gap-5 
              xl:items-start"
              >
                <h2 className="text-3xl font-bold text-center">{item.title}</h2>
                <h3
                  className="text-md text-center font-bold text-gray-400 
                xl:text-xl xl:text-left"
                >
                  {item.desc}
                </h3>
                <Link href="/">
                  <button className={`${styles.button}`}>
                    <p>Get Stared</p>
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
