import Icon from "../Icon";
import { DEFAULT_ICON_LIB } from "../../../constants";
import React, { useState, useId, useContext } from 'react';

type IconLibrary = 'hero' | 'bootstrap' | 'custom';

interface NavItemsProps {
    url: string;
    text: string;
    icon?: string;
    className?: string;
    navMenu?: boolean;
    iconSize?: number | string;
    children?: React.ReactNode;
}

const iconLocator = (iconLocation?: string) => {
    if(!iconLocation) return undefined;
    if(!iconLocation.includes(":")) {
        return {
            library: DEFAULT_ICON_LIB as IconLibrary,     // will return hero or bootstrap
            name: iconLocation
        };
    } else {
        const findSeparatorIndex = iconLocation.indexOf(":");
        const IconLib = iconLocation.substring(0, findSeparatorIndex);
        const IconName = iconLocation.substring(findSeparatorIndex + 1);
        return {
            library: IconLib as IconLibrary,
            name: IconName
        }
    }
}

const NavMenuContext = React.createContext(false);

const NavItem: React.FC<NavItemsProps> = ({
    url,
    text,
    icon,
    navMenu = false,
    className,
    iconSize,
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuId = useId();
    const isMenu = useContext(NavMenuContext);

    const baseClasses = "w-full text-black inline-flex pt-4 pb-4 dark:text-white focus:text-slate-500";
    const navItemClasses = (text ? "lg:px-2 xl:px-4 xl:w-11/12 justify-center rounded lg:justify-start my-0 " : "");
    const menuItemClasses = "w-11/12 text-black inline-flex px-5 py-2 rounded lg:px-6 lg:py-3 lg:-my-1 dark:text-white focus:text-slate-500 dark:hover:bg-[#1A1A1A] dark:hover:text-slate-300";
    const navAItemClasses = "xl:w-11/12 rounded dark:hover:bg-[#1A1A1A] dark:hover:text-slate-300 xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1";
    const menuAItemClasses = "xl:w-11/12 rounded dark:hover:bg-[#1A1A1A] dark:hover:text-slate-300 xl:text-nowrap lg:px-6 lg:py-2 lg:-my-0.5";
    const iconInfo = iconLocator(icon);
    const sizeIconBar = iconSize ? iconSize : "1.75rem";
    const sizeIconMenu = iconSize ? (typeof iconSize === 'number' ? iconSize : iconSize) : "1.5rem";

    if(navMenu) {
        return (
            <div className="w-full bottom-0 absolute pt-2 inline-block pb-1 my-1.5 lg:-mb-1">
                <button className={`${baseClasses} ${menuItemClasses} ${className}`} onClick={()=>setIsOpen(!isOpen)} aria-haspopup="menu" aria-expanded={isOpen} aria-controls={menuId}>
                    { icon && iconInfo && ( <Icon name={iconInfo.name} library={iconInfo.library} size={sizeIconBar} /> )}
                    { text && ( <span className="hidden xl:inline xl:pl-4 xl:text-xl xl:font-bold">{text}</span> )}
                </button>
                { isOpen && (
                    <div id={menuId} className="origin-top-right bottom-12 left-2 absolute mt-5 w-80 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-neutral-800 dark:text-white"
                    onMouseLeave={()=>setIsOpen(!isOpen)} onKeyUp={(e)=> { if(e.key === "Escape") setIsOpen(false)}}
                    role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button" aria-label={text || 'menu'}>
                        <div className="py-2 px-1">
                            <ul className="space-y-1">
                                <NavMenuContext.Provider value={true}>
                                    {React.Children.map(children, (child, idx) => (
                                        <li key={idx} role="none">
                                            {child}
                                        </li>
                                    ))}
                                </NavMenuContext.Provider>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className={`${baseClasses} ${isMenu ? menuItemClasses : navItemClasses }`}>
                <a href={url} className={`${isMenu ? menuAItemClasses : navAItemClasses} ${className}`}>
                    { icon && iconInfo && ( <Icon name={iconInfo.name} library={iconInfo.library} size={ isMenu ? sizeIconMenu : sizeIconBar} className={`float-start ${isMenu ? "mt-0.5" : ""}`}  /> )}
                    { text && isMenu ? <span className="inline ml-3 xl:text-lg">{text}</span> : <span className="hidden xl:inline xl:pl-4 xl:text-xl xl:font-bold">{text}</span> }
                </a>
            </div>
        )
    }
}

export default NavItem;