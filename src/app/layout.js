import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "./lib/StoreProvider";
import Nav from "@/Components/Nav/Nav";
import ToasterHandlingMessage from "@/utils/ToasterHandlingMessage";
import { ToggleThemeProvider } from "@/Context/ToggleMode";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>
          <ToggleThemeProvider>
            <Nav />
            <ToasterHandlingMessage />
            {children}
          </ToggleThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
