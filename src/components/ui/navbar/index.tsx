import { useEffect, useState } from "react";
import NavItem from './elements';

export default function Navbar() {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpointNav = 764;

    useEffect(()=>{
        const handleWindowResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    }, []);

    if(width > breakpointNav) {
        return (
            <nav id="portfolioBar" className="w-1/12 h-full fixed left-1 justify-center max-w-[305px] border-r border-[#DBDBDB] lg:justify-start lg:w-1/12 xl:w-3/6 dark:bg-black dark:border-r dark:border-[#2B2A33]">
                <div id="tabs" className="flex flex-col justify-start mt-3">
                    <NavItem icon="bootstrap:house-door" url="/" text="Home" className="w-11/12 px-5 py-2 rounded xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1" />
                    <NavItem icon="bootstrap:search" url="#" text="Search" className="w-11/12 px-5 py-2 rounded xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1" />
                    <NavItem icon="bootstrap:browser-safari" url="#" text="Explore" className="w-11/12 px-5 py-2 rounded xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1" />
                    <NavItem icon="bootstrap:collection-play-fill" url="#" text="Reels" className="w-11/12 px-5 py-2 rounded xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1" />
                    <NavItem icon="bootstrap:messenger" url="#" text="Messages" className="w-11/12 px-5 py-2 rounded xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1" />
                    <NavItem icon="bootstrap:heart" url="#" text="Notifications" className="w-11/12 px-5 py-2 rounded xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1" />
                    <NavItem icon="bootstrap:plus-square" url="#" text="Create" className="w-11/12 px-5 py-2 rounded xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1" />
                    <NavItem icon="bootstrap:list" url="#" text="More" navMenu>
                        <NavItem url="#" text="Item1" className="w-full px-5 py-4 rounded xl:text-nowrap lg:px-6 lg:py-3" />
                        <NavItem url="#" text="Item2" className="w-full px-5 py-4 rounded xl:text-nowrap lg:px-6 lg:py-3" />
                    </NavItem>
                </div>
            </nav>
        )
    }

    return (
        <nav id="portfolioBar" className="fixed top top-0">
            <img src="/public/images/logo.png" alt="" width={100} height={100} />
        </nav>
    )
}