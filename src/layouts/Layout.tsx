import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";

export function Layout() {
  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="flex flex-col items-center relative justify-center md:pl-[50px] xl:pl-[330px]">
        <Outlet />
      </div>
    </div>
  );
}
