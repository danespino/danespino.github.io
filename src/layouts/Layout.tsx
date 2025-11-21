import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";

export function Layout(){
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <Outlet />
            </div>
        </>
    )
}