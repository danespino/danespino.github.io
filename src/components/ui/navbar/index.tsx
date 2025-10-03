import NavItem from './elements';
import Logo from '../logo';
import { useBreakpoint } from '../../../context/UIProvider';
import ThemePanel from './panel/themePanel';

export default function Navbar() {
  const { md, hydrated } = useBreakpoint(); // md = ≥768px, hydrated = client-ready

  if (!hydrated) return null; // prevents SSR mismatch flashes

  if (md) {
    return (
      <nav
        id="portfolioBar"
        className="w-1/12 h-full fixed left-3 justify-center max-w-[330px] border-r border-[#DBDBDB] md:float-left lg:pr-5 lg:pl-3 lg:justify-start lg:w-1/12 xl:w-3/6 dark:border-[#262626]"
      >
        <div id="tabs" className="flex flex-col justify-start mt-3">
          <Logo />
          <NavItem icon="bootstrap:house-door" url="/" text="Home" />
          <NavItem icon="bootstrap:search" url="#" text="Search" />
          <NavItem icon="bootstrap:browser-safari" url="#" text="Explore" />
          <NavItem icon="bootstrap:collection-play-fill" url="#" text="Reels" />
          <NavItem icon="bootstrap:messenger" url="#" text="Messages" />
          <NavItem icon="bootstrap:heart" url="#" text="Notifications" />
          <NavItem icon="bootstrap:plus-square" url="#" text="Create" />
          <NavItem icon="bootstrap:list" url="#" text="More" className='w-auto xl:w-[89.5%] lg:ml-3 xl:ml-1.5 xl:pl-1' navMenu>
            <NavItem icon="bootstrap:gear" url="#" text="Settings" />
            <NavItem icon="bootstrap:activity" url="#" text="Your Activity" />
            <NavItem icon="bootstrap:bookmark" url="#" text="Saved" />
            <NavItem icon="bootstrap:moon" type='button' text="Switch Appearance" renderPanel={()=><ThemePanel />} />
            <NavItem icon="bootstrap:exclamation-triangle" url="#" text="Report a problem" />
            <hr className="w-full border-t-6 border-[#DBDBDB] dark:border-[#343434]" />
            <NavItem url="#" text="Switch Accounts" />
            <NavItem url="#" text="Log Out" />
          </NavItem>
        </div>
      </nav>
    );
  }

  // Mobile nav
  return (
    <nav
      id="portfolioBar"
      className="fixed w-full top-0 justify-center z-50 border-b border-[#343434] dark:border-[#2B2A33]"
    >
      <Logo />
    </nav>
  );
}