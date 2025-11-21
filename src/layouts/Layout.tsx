import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";

export function Layout(){
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen md:pl-[30px]">
                <Outlet />
            </div>
        </div>
    )
}