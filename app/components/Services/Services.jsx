import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const dataServices = [
    {
      id: 1,
      title: "Services1",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              felis ligula.`,
      img: "/about-1.jpg",
    },

    {
      id: 2,
      title: "Services2",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
             felis ligula.`,
      img: "/shopping2.jpg",
    },

    {
      id: 3,
      title: "Services3",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
    felis ligula.`,
      img: "/shopping3.jpg",
    },
  ];
  return (
    <>
      <h3 className="text-4xl text-center font-bold marginGlobal">Services</h3>
      <section className="grid grid-cols-1 gap-8 w-[90%] mr-[250px] xl:w-[90%] m-auto md:grid md:grid-cols-2 xl:grid xl:grid-cols-3">
        {dataServices?.map((item) => {
          return (
            <div key={item.id} className="marginGlobal relative mb-4">
              <div className="relative w-full h-[300px]  mx-6 -mt-6 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-teal-500 to-teal-600">
                <Image src={item.img} alt="image" fill />
              </div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {item.title}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {item.des}
                </p>
              </div>
              <div className="p-6 w-[100%]">
                <Link href="/">
                  <button
                    data-ripple-light="true"
                    type="button"
                    className="absolute bottom-0  select-none rounded-lg bg-teal-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-teal-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
