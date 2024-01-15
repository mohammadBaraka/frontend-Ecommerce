"use client";
import { ThemeContext } from "@/Context/ToggleMode";
import * as React from "react";
import Nav from "./dashboard/Nav/Nav";
export default function DashboardLayout({ children }) {
  const { mode } = React.useContext(ThemeContext);
  return (
    <div className="flex mt-5">
      <div className="w-[15%]">
        <Nav />
      </div>
      <div className="w-[85%]"> {children}</div>
    </div>
  );
}
