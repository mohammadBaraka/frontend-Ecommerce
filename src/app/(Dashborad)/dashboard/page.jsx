import { UserCircleIcon } from "@heroicons/react/24/solid";
import { mainData } from "./data-sections/maind_data_section";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-center px-8">
        {mainData?.map((item) => {
          return (
            <section
              key={item.id}
              className={`flex justify-between items-center px-3 py-4 gap-8 ${item.bgColor} text-white rounded-3xl`}
            >
              <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                {item.icons}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-left">{item.title}</span>
                <p className="text-2xl font-bold">{item.detials}</p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
