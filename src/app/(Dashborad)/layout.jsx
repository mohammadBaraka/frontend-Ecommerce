"use client";
import { ThemeContext } from "@/Context/ToggleMode";
import * as React from "react";
import Nav from "./dashboard/Nav/Nav";
export default function DashboardLayout({ children }) {
  const { mode } = React.useContext(ThemeContext);
  return (
    <div
      className={`w-[100%] flex absolute left-0 min-h-screen ${
        mode === "light" ? `bg-[#333]` : "bg-white"
      } transition-colors duration-[0.4s] `}
    >
      <div
        className={` w-[15%] shadow-xl  ${
          mode === "light" ? "shadow-white" : "shadow-black"
        } `}
      >
        <Nav />
      </div>
      <div className="w-full py-4 mb-10 "> {children}</div>
    </div>
  );
}
