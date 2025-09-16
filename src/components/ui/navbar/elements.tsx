import Icon from "../Icon";
import { DEFAULT_ICON_LIB } from "../../../constants";
import React, { useState, useId } from 'react';

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

const iconLocator = (iconLocation: string) => {
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

    let baseClasses = "w-full text-black inline-flex pt-4 pb-4 dark:text-white focus:text-slate-500";
    baseClasses += text ? "lg:px-2 xl:px-4 justify-center lg:justify-start my-0" : "";
    const iconInfo = icon ? iconLocator(icon) : '';

    if(navMenu) {
        return (
            <div className="w-full bottom-0 absolute pt-2 inline-block pb-1 my-1.5 lg:-mb-1">
                <button className={baseClasses + " " + className } onClick={()=>setIsOpen(!isOpen)} aria-haspopup="menu" aria-expanded={isOpen} aria-controls={menuId}>
                    { icon && iconInfo && ( <Icon name={iconInfo.name} library={iconInfo.library} size={ iconSize ? iconSize : "1.5rem"} /> )}
                    { text && ( <span className="hidden lg:inline ml-4 text-xl">{text}</span> )}
                </button>
                { isOpen && (
                    <div id={menuId} className="origin-top-right bottom-12 left-2 absolute mt-5 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-neutral-800 dark:text-white"
                    onMouseLeave={()=>setIsOpen(!isOpen)} onKeyUp={()=>setIsOpen(!isOpen)}
                    role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        <div className="py-2 px-1">
                            <ul className="space-y-1">
                                {React.Children.map(children, (child, idx) => (
                                <li key={idx} role="none">
                                    {child}
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className={baseClasses}>
                <a href={url} className={"xl:w-11/12 dark:hover:bg-[#1A1A1A] dark:hover:text-slate-300" + className}>
                    { icon && iconInfo && ( <Icon name={iconInfo.name} library={iconInfo.library} size={ iconSize ? iconSize : "1.75rem"} className="float-start"  /> )}
                    { text && ( <span className="hidden xl:inline xl:pl-4 xl:text-xl xl:font-bold">{text}</span> )}
                </a>
            </div>
        )
    }
}

export default NavItem;