"use client";
import * as React from "react";
import { Navbar, Collapse, Button, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import NavList from "./NavList";
import { useGetTokenQuery, useLogoutMutation } from "@/app/lib/apis/authSlice";
import Loader from "../Loader/Loader";
import { msgConfirm, msgSuccess } from "@/utils/handleMessage";
import { redirect, usePathname, useRouter } from "next/navigation";
export default function Nav() {
  const router = useRouter();
  const path = usePathname();
  const { data, isSuccess, isLoading } = useGetTokenQuery();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  if (path === "/dashboard" && !data?.user) return redirect("/404");

  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleLogout = () => {
    logout().then((res) => {
      msgSuccess(res?.data?.message || "Logout Success");
    });
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <>
      {isLoading || logoutLoading ? <Loader /> : null}

      <div>
        <Navbar className="mx-auto max-w-[100%] px-4 py-2">
          <div className="flex items-center justify-between text-blue-gray-900 px-4">
            <Link href="/">
              <h6 className="mr-4 cursor-pointer py-1.5 lg:ml-2">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={50}
                  height={50}
                />
              </h6>
            </Link>

            <div className="hidden lg:block">
              <NavList />
            </div>
            {isSuccess ? (
              <div className="hidden gap-2 lg:flex">
                {data?.user && isSuccess && (
                  <Link href="/dashboard">
                    <Button variant="outlined" size="md" color="teal" fullWidth>
                      Dashboadrd
                    </Button>
                  </Link>
                )}

                <Button
                  onClick={() => msgConfirm("Want To Log Out!", handleLogout)}
                  variant="gradient"
                  size="md"
                  color="red"
                  fullWidth
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden gap-2 lg:flex">
                <Link href="/login">
                  <Button variant="outlined" size="md" color="red" fullWidth>
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="gradient" size="md" color="teal" fullWidth>
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
            <IconButton
              variant="text"
              color="blue-gray"
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <Collapse open={openNav}>
            <NavList />
            {isSuccess ? (
              <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                {data?.user && isSuccess && (
                  <Link href="/dashboard">
                    <Button variant="outlined" size="sm" color="teal" fullWidth>
                      Dashboard
                    </Button>
                  </Link>
                )}

                <div>
                  <Button
                    variant="gradient"
                    size="sm"
                    color="red"
                    fullWidth
                    onClick={() => msgConfirm("Want To Log Out!", handleLogout)}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                <Link href="/login">
                  <Button variant="outlined" size="sm" color="red" fullWidth>
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="gradient" size="sm" color="teal" fullWidth>
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </Collapse>
        </Navbar>
      </div>
    </>
  );
}
