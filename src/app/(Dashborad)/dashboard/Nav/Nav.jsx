import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const activeLink = "bg-gray-300";
  const router = usePathname();
  return (
    <div className="flex flex-col gap-5 gb-red-500">
      <h2 className="text-sm py-2 font-bold text-white bg-teal-500   xl:text-2xl text-center ">
        Dashboard Settings
      </h2>
      <ul className="flex flex-col pl-4 gap-7 mt-4">
        <Link
          href="/dashboard"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl  ${
            router === "/dashboard" && activeLink
          }`}
        >
          <div className="flex justify-between">
            <li className="hidden xl:flex pr-4">Dashboard</li>
          </div>
        </Link>
        <Link
          href="/dashboard/add-product"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl ${
            router === "/dashboard/add-product" && activeLink
          }`}
        >
          <div className="flex justify-between">
            <li className="hidden xl:flex pr-4">Add Product</li>
          </div>
        </Link>

        <Link
          href="/dashboard/add-category"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl ${
            router === "/dashboard/add-category" && activeLink
          }`}
        >
          <div className="flex justify-between">
            <li className="hidden xl:flex pr-4">Add Category</li>
          </div>
        </Link>

        <Link
          href="/dashboard/orders"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl ${
            router === "/dashboard/orders" && activeLink
          }`}
        >
          <div className="flex justify-between">
            <li className="hidden xl:flex pr-4">Orders</li>
          </div>
        </Link>

        <Link
          href="/dashboard/setting"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl ${
            router === "/dashboard/setting" && activeLink
          }`}
        >
          <div className="flex justify-between">
            <li className="hidden xl:flex pr-4">Settings</li>
          </div>
        </Link>
      </ul>
    </div>
  );
}
