import { Roboto } from "next/font/google";
import Nav from "./dashboard/Nav/Nav";
import "../globals.css";
import StoreProvider from "../lib/StoreProvider";
import TopBar from "./dashboard/TopBar/TopPar";
import ToasterHandlingMessage from "../../utils/ToasterHandlingMessage";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });
export default function DashboardLayout({ children }) {
  // const { mode } = React.useContext(ThemeContext);
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>
          <div className="flex mt-5 ">
            <div className="w-[15%]">
              <Nav />
              <ToasterHandlingMessage />
            </div>
            <div className="w-[85%] flex flex-col justify-center items-center px-4">
              <TopBar />
              {children}
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
