import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const data = [
    {
      id: 1,
      title: "Services1",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              felis ligula.`,
      img: "/images/about-1.jpg",
    },

    {
      id: 2,
      title: "Services2",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
             felis ligula.`,
      img: "/images/about-1.jpg",
    },

    {
      id: 3,
      title: "Services3",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
    felis ligula.`,
      img: "/images/about-1.jpg",
    },
  ];
  return (
    <>
      <h3 className="text-4xl text-center font-bold marginGlobal">Services</h3>
      <section
        className="flex flex-col justify-center items-center 
      xl:flex xl:flex-row xl:justify-between gap-10
      
      
      "
      >
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="marginGlobal relative flex w-10/12 flex-col rounded-xl bg-clip-border  shadow-md
              "
            >
              <div className="relative h-auto mx-6 -mt-6 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-teal-500 to-teal-600">
                <Image src={item.img} alt="image" width={500} height={200} />
              </div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {item.title}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {item.des}
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link href="/">
                  <button
                    data-ripple-light="true"
                    type="button"
                    className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Read More
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
