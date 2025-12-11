import Button from "../../components/ui/Button"
import Icon from "../../components/ui/Icon"

import { useBreakpoint } from "../../context/UIProvider"
import { AuthenticatedTemplate } from '@azure/msal-react';
import { ProfileTabs } from '../../components/ui/profileTabs/index';

export default function Profile() {
  const { md, lg, hydrated } = useBreakpoint(); // lg = ≥768px, hydrated = client-ready

  if (!hydrated) return null;
  let iconSize = (lg) ? 24 : 16;

  const tabs = [
    { id:'general', title: 'Personal Information', icon: 'bootstrap/person-badge', 
      content: <>This will display personal info</>},
    { id:'projects', title: 'Projects', icon: 'bootstrap/code-square', },
    { id:'posts', title: 'Posts', icon: 'bootstrap/tags-fill',},
    { id:'reels', title: 'Reels', icon: 'bootstrap/film',}
  ];
  
  return (
    <div className="flex flex-col items-center justify-baseline h-screen w-full">
      <div className="flex flex-row w-10/12 mt-5 justify-center">
        <div className="flex flex-col w-1/3 items-center lg:items-end py-6">
          <img src="./images/profile_pic.jpg" className="rounded-full" width={250} height={250} alt="" />
        </div>
        <div className="flex flex-col w-2/3 items-center justify-center">
          <div className="flex flex-row w-full px-4 pt-5 items-center">
            <div className="flex flex-col w-full items-center justify-center lg:w-6/12 lg:items-end">
              <span className="font-semibold text-4xl text-shadow-sm text-shadow-blue-200">Dan Espino</span>
            </div>
            <div className="flex flex-row lg:w-6/12 items-center">
              <Button className="bg-primary rounded-xl font-bold py-1 lg:px-6 lg:py-3">Follow</Button>
              <Button className="bg-slate-600 rounded-xl font-bold py-0 text-sm lg:px-6 lg:py-2">
                <Icon library="bootstrap" name="chat-square-quote" size={iconSize} className="mt-0.5"></Icon>
              </Button>
              <AuthenticatedTemplate>
                <Button className="bg-transparent font-bold py-0 text-sm lg:px-6 lg:py-2">
                  <Icon library="bootstrap" name="gear-wide" size={iconSize} className="mt-0.5"></Icon>
                </Button>
              </AuthenticatedTemplate>
            </div>
          </div>
          <div className="flex flex-row w-full px-4 pt-5 ml-[1%] lg:justify-evenly">
            <span className="font-extralight text-lg pt-2">Full-Stack Developer & Bachelor in Business Administration</span>
          </div>
          { md && (
              <div className="grid grid-cols-3 w-full px-4 pt-5 gap-5 ">
                <div className="text-center">
                  <span className="font-bold text-md lg:text-xl">18</span>&nbsp;<span>Projects</span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-md lg:text-xl">158</span>&nbsp;<span>Followers</span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-md lg:text-xl">17851</span>&nbsp;<span>Projects</span>
                </div>
              </div>
            )
          }
        </div>
      </div>
      { !md && (
        <div className="flex flex-col w-11/12 my-4 justify-center">
          <div className="grid grid-cols-7 w-full md:grid-cols-6 px-4 pt-5 gap-4">
            <div className="text-end">18</div>
            <div className="">Projects</div>
            <div className="text-end">158</div>
            <div className="">Followers</div>
            <div className="text-end">1785</div>
            <div className="">Followers</div>
          </div>
        </div>  
      )}
      <div className="flex flex-col w-11/12 border justify-center">
        <ProfileTabs tabs={tabs} />
      </div>
    </div>
  )
}