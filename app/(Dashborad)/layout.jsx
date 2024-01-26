"use client";
// import { ThemeContext } from "@/Context/ToggleMode";
import * as React from "react";
import { Roboto } from "next/font/google";
import Nav from "./dashboard/Nav/Nav";
import "../globals.css";
import StoreProvider from "../lib/StoreProvider";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
export default function DashboardLayout({ children }) {
  // const { mode } = React.useContext(ThemeContext);
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>
          <div className="flex mt-5">
            <div className="w-[15%]">
              <Nav />
            </div>
            <div className="w-[85%]"> {children}</div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
