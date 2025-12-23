import Icon from "../Icon";
import { DEFAULT_ICON_LIB } from "../../../constants";
import React, { useState, useId, useContext } from "react";
import Button from "../Button";

type IconLibrary = "hero" | "bootstrap" | "custom";

type NavMenuController = {
  isMenu: boolean;
  setPanel?: (node: React.ReactNode, opts?: { title?: string }) => void;
  back?: () => void;
  closeMenu?: () => void;
};

interface NavItemsProps {
  text: string;
  url?: string;
  type?: "button" | "link";
  icon?: string;
  className?: string;
  navMenu?: boolean;
  iconSize?: number | string;
  onClick?: () => void;
  children?: React.ReactNode;
  renderPanel?: () => React.ReactNode;
  disabled?: boolean;
}

const iconLocator = (iconLocation?: string) => {
  if (!iconLocation) return undefined;
  if (!iconLocation.includes(":")) {
    return {
      library: DEFAULT_ICON_LIB as IconLibrary, // will return hero or bootstrap
      name: iconLocation,
    };
  } else {
    const findSeparatorIndex = iconLocation.indexOf(":");
    const IconLib = iconLocation.substring(0, findSeparatorIndex);
    const IconName = iconLocation.substring(findSeparatorIndex + 1);
    return {
      library: IconLib as IconLibrary,
      name: IconName,
    };
  }
};

const NavMenuContext = React.createContext<NavMenuController>({
  isMenu: false,
});

const NavItem: React.FC<NavItemsProps> = ({
  url,
  type = url && url !== "button" ? "link" : "button",
  text,
  icon,
  navMenu = false,
  className,
  iconSize,
  onClick,
  children,
  renderPanel,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const isMenu = useContext(NavMenuContext);

  const baseClasses =
    "w-full text-black inline-flex pt-3 pb-3 focus:text-slate-500";
  const navItemClasses = text
    ? "lg:px-1 xl:px-4 lg:w-full justify-center rounded lg:justify-start my-1"
    : "";
  const menuItemClasses =
    "w-11/12 inline-flex px-5 py-2 mr-1 rounded lg:px-1 lg:py-3 lg:-my-0 hover:bg-[#CCC] focus:text-slate-500 dark:text-white dark:hover:bg-[#1A1A1A] dark:hover:text-slate-300";
  const navAItemClasses =
    "px-4 py-2 xl:w-11/12 rounded hover:bg-[#CCC] dark:hover:bg-[#1A1A1A] xl:text-nowrap lg:px-6 lg:py-3 lg:-my-1";
  const menuAItemClasses =
    "xl:w-11/12 rounded dark:hover:bg-[#1A1A1A] dark:text-white dark:hover:text-slate-300 xl:text-nowrap lg:px-4 lg:py-2 lg:-my-0.5";
  const menuButtonItemClasses =
    "flex justify-start lg:inline-block xl:w-11/12 rounded dark:hover:bg-[#1A1A1A] dark:hover:text-slate-300 xl:text-nowrap px-0 -ml-3 lg:ml-1 lg:px-3 lg:py-2 lg:-my-0.5";
  const iconInfo = iconLocator(icon);
  const sizeIconBar = iconSize ? iconSize : "1.75rem";
  const sizeIconMenu = iconSize
    ? typeof iconSize === "number"
      ? iconSize
      : iconSize
    : "1.5rem";
  const ctx = useContext(NavMenuContext);
  const inMenu = ctx.isMenu;

  const [panel, setPanelState] = useState<React.ReactNode | null>(null);
  const [panelTitle, setPanelTitle] = useState<string | undefined>(undefined);
  const closeMenu = () => {
    setIsOpen(false);
    setPanelState(null);
    setPanelTitle(undefined);
  };
  const back = () => setPanelState(null);
  const setPanel: NavMenuController["setPanel"] = (node, opts) => {
    setPanelTitle(opts?.title);
    setPanelState(node);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (inMenu && typeof renderPanel === "function" && ctx.setPanel) {
      // If button inMenu is clicked, we catch the default event and then render the panel
      e.preventDefault();
      ctx.setPanel(renderPanel(), { title: text });
      return;
    }
    if (onClick) onClick();
  };

  if (navMenu) {
    return (
      <div className="w-full bottom-0 absolute pt-2 inline-block pb-1 my-1.5 lg:-mb-1">
        <button
          className={`${menuItemClasses} ${className} -pr-3`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          {icon && iconInfo && (
            <Icon
              name={iconInfo.name}
              library={iconInfo.library}
              size={sizeIconBar}
            />
          )}
          {text && (
            <span className="hidden xl:inline xl:pl-3 xl:text-xl xl:font-bold">
              {text}
            </span>
          )}
        </button>
        {isOpen && (
          <div
            id={menuId}
            className="origin-top-right bottom-12 left-2 absolute mt-5 w-80 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-neutral-800 dark:text-white"
            onMouseLeave={closeMenu}
            onKeyUp={(e) => {
              if (e.key === "Escape") closeMenu();
            }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
            aria-label={text || "menu"}
          >
            <div className="py-2 px-1">
              <NavMenuContext.Provider
                value={{ isMenu: true, setPanel, back, closeMenu }}
              >
                {panel ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-3">
                      <div className="flex justify-around items-center py-2">
                        <div className="flex flex-col mr-1.5">
                          <Icon
                            name="chevron-left"
                            library="bootstrap"
                            size={sizeIconMenu}
                            onClick={back}
                          />
                        </div>
                        <div className="flex flex-col text-base font-bold opacity-80 truncate ">
                          {panelTitle}
                        </div>
                      </div>
                    </div>
                    <div className="px-2">{panel}</div>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {React.Children.map(children, (child, idx) => (
                      <li key={idx} role="none">
                        {child}
                      </li>
                    ))}
                  </ul>
                )}
              </NavMenuContext.Provider>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`${baseClasses} ${
          isMenu ? menuItemClasses : navItemClasses
        }`}
      >
        {type && type == "button" ? (
          <Button
            className={`${
              isMenu ? menuButtonItemClasses : navAItemClasses
            } ${className} w-full flex`}
            size="small"
            onClick={(e) => handleClick(e)}
          >
            {icon && iconInfo && (
              <Icon
                name={iconInfo.name}
                library={iconInfo.library}
                size={isMenu ? sizeIconMenu : sizeIconBar}
                className={`${inMenu ? "mt-0.5 lg:-ml-9" : ""}`}
              />
            )}
            {text && isMenu ? (
              <span className="md:ml-5 lg:-pl-12 xl:-ml-6 xl:text-lg">
                {text}
              </span>
            ) : (
              <span className="hidden pl-2 xl:inline xl:text-xl xl:font-bold">
                {text}
              </span>
            )}
          </Button>
        ) : !disabled ? (
          <a
            href={url}
            className={`${
              isMenu ? menuAItemClasses : navAItemClasses
            } ${className}`}
            title={`${inMenu ? "" : text}`}
          >
            {icon && iconInfo && (
              <Icon
                name={iconInfo.name}
                library={iconInfo.library}
                size={isMenu ? sizeIconMenu : sizeIconBar}
                className={`float-start ${isMenu ? "mt-0.5" : "lg:mr-2"}`}
              />
            )}
            {text ? (
              isMenu ? (
                <span
                  className={`${
                    inMenu
                      ? "inline ml-6 xl:text-lg"
                      : "hidden xl:inline lg:ml-3 xl:text-lg"
                  }`}
                >
                  {text}
                </span>
              ) : (
                <span className="hidden xl:inline xl:pl-4 xl:text-xl xl:font-bold">
                  {text}
                </span>
              )
            ) : null}
          </a>
        ) : (
          <a
            href={url}
            className={`${
              isMenu ? menuAItemClasses : navAItemClasses
            } ${className} cursor-not-allowed`}
            title={`${inMenu ? "" : text}`}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {icon && iconInfo && (
              <Icon
                name={iconInfo.name}
                library={iconInfo.library}
                size={isMenu ? sizeIconMenu : sizeIconBar}
                className={`float-start ${isMenu ? "mt-0.5" : "lg:mr-2"}`}
              />
            )}
            {text ? (
              isMenu ? (
                <span
                  className={`${
                    inMenu
                      ? "inline ml-6 xl:text-lg"
                      : "hidden xl:inline lg:ml-3 xl:text-lg"
                  }`}
                >
                  {text}
                </span>
              ) : (
                <span className="hidden xl:inline xl:pl-4 xl:text-xl xl:font-bold">
                  {text}
                </span>
              )
            ) : null}
          </a>
        )}
      </div>
    );
  }
};

export default NavItem;
