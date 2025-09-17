import { useEffect, useState } from "react";
import NavItem from './elements';
import Logo from '../logo';

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
            <nav id="portfolioBar" className="w-1/12 h-full fixed left-3 justify-center max-w-[280px] border-r border-[#DBDBDB] lg:justify-start lg:w-1/12 xl:w-3/6 dark:bg-black dark:border-r dark:border-[#2B2A33]">
                <div id="tabs" className="flex flex-col justify-start mt-3">
                    <Logo width={width} />
                    <NavItem icon="bootstrap:house-door" url="/" text="Home" />
                    <NavItem icon="bootstrap:search" url="#" text="Search" />
                    <NavItem icon="bootstrap:browser-safari" url="#" text="Explore" />
                    <NavItem icon="bootstrap:collection-play-fill" url="#" text="Reels" />
                    <NavItem icon="bootstrap:messenger" url="#" text="Messages" />
                    <NavItem icon="bootstrap:heart" url="#" text="Notifications" />
                    <NavItem icon="bootstrap:plus-square" url="#" text="Create" />
                    <NavItem icon="bootstrap:list" url="#" text="More" navMenu>
                        <NavItem icon="bootstrap:gear" url="#" text="Settings" />
                        <NavItem icon="bootstrap:activity" url="#" text="Your Activity" />
                        <NavItem icon="bootstrap:bookmark" url="#" text="Saved" />
                        <NavItem icon="bootstrap:moon" url="#" text="Switch Appearence" />
                        <NavItem icon="bootstrap:exclamation-triangle" url="#" text="Report a problem" />
                        <hr className="w-full border-t-6 border-[#DBDBDB] dark:border-[#343434]" />
                        <NavItem url="#" text="Switch Accounts" />
                        <NavItem url="#" text="Log Out" />
                    </NavItem>
                </div>
            </nav>
        )
    }

    return (
        <nav id="portfolioBar" className="fixed w-full top top-0 z-50 bg-white border-b border-[#343434]">
            <Logo isotype width={80} height={25} />
        </nav>
    )
}