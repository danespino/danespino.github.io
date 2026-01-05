import { useState } from "react";
import type { AppData } from "../../../../services/data/fetchTypes";
import Profile from "../../../../pages/public/Profile";
import Icon from "../../Icon";

type Profile = AppData["profile"];

function TabMapping(fields: Profile) {
  if (!fields) return null;
  const tabsMapped: { id: string; label: string }[] = [];

  Object.keys(fields).forEach((key) => {
    const field = fields[key as keyof Profile];
    if (typeof field === "object") {
      if (Array.isArray(field)) {
        tabsMapped.push({
          id: key,
          label: key,
        });
      }
    }
  });
  return tabsMapped;
}

export default function ({ data }: { data?: Profile }) {
  const profileInfo = data;
  const tabs = data ? TabMapping(data) : null;
  const [currentTab, setCurrentTab] = useState<string | null>("general");

  if (!profileInfo) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">No profile info found</div>
      </div>
    );
  }

  return (
    <div className="flex w-full bg-[#343535] mx-2 my-1 px-8 py-2 flex-row items-center justify-center">
      <div className="flex w-1/3 flex-col border-r border-r-[#e2e8f] pr-2">
        <div className="flex flex-row">
          <div className="grid grid-flow-row text-gray-500 gap-3">
            {tabs &&
              tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`cursor-pointer capitalize ${
                    currentTab === tab.id
                      ? "text-gray-300 text-xl font-bold"
                      : ""
                  }`}
                  onClick={() => setCurrentTab(tab.id)}
                >
                  {tab.label}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex w-2/3 flex-col pl-2">
        {currentTab &&
          (() => {
            switch (currentTab) {
              case "general":
                return (
                  <div className="grid grid-flow-row grid-cols-1">
                    <div className="flex flex-row justify-center *:mx-2 text-gray-500">
                      <div className="flex flex-col">
                        <Icon name="bootstrap/briefcase" />
                      </div>
                      <div className="flex flex-col">Work Location:</div>
                      <div className="flex flex-col text-gray-200">
                        Hermes LLC.
                      </div>
                    </div>
                  </div>
                );
              default:
                return null; // This one will never be reached, but declared in case it breaks somehow
            }
          })()}
      </div>
    </div>
  );
}
