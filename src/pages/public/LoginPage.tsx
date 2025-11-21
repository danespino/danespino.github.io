import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="flex flex-col w-full items-center md:flex-row md:justify-center md:w-2/3">
                <img src="/public/images/instantfolio_lite.svg" alt="InstantFolio Lite by Dan Espino" title="InstantFolio Lite by Dan Espino" className="w-2/3 md:w-1/3" />
            </div>
            <div className="flex flex-row w-full py-4 md:w-1/3 md:py-0 items-center-safe justify-around border">
                <div className="flex flex-col w-3/4 border items-center justify-start *:w-2/3">
                    <button className="border py-2 my-1.5">Login with Microsoft</button>
                    <button className="border py-2 my-1.5">Login with Google</button>
                    <button className="border py-2 my-1.5">Login with Facebook</button>
                    <button className="border py-2 my-1.5">Login with Instagram</button>
                </div>
            </div>
        </div>
    )
}