import React, { Suspense, useState } from "react";
import type { HydrateTab } from "../../../hooks/ui/useTabsConfig";
import { tabRegistry } from "./tabs/tabsRegistry";
import Button from "../Button";
import Icon from "../Icon";

export interface ProfileTabsProps {
  tabs: HydrateTab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  activeTab?: string | undefined;
  className?: string;
}

function TabRenderer({ tab }: { tab: HydrateTab }) {
  const TabComponent = tabRegistry[tab.component as keyof typeof tabRegistry];

  if (!TabComponent) {
    return <div>Tab component not found: {String(tab.component)}</div>;
  }

  return <TabComponent data={tab.data} {...(tab.props || {})} />;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  activeTab = tabs[0]?.id,
  className,
}) => {
  const initialTabId = defaultTab ?? activeTab;
  const [currentTab, setCurrentTab] = useState<string | undefined>(
    initialTabId || tabs[0]?.id,
  );

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div
        className="flex flex-row w-full items-center justify-center border-b border-b-[#DBDBDB] dark:border-b dark:border-b-gray-700 -mb-2 *:px-4 *:mx-3.5 *:mt-1"
        role="tablist"
      >
        {tabs.map((tab) => (
          <div key={tab.id} className="flex">
            <Button
              className={`bg-transparent font-bold py-0 text-sm mb-0 lg:px-6 lg:py-2 ${
                currentTab === tab.id
                  ? "text-blue-500 border-b-4 border-b-blue-500"
                  : ""
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.icon ? (
                typeof tab.icon === "string" ? (
                  <Icon name={tab.icon} title={tab.label} />
                ) : (
                  tab.icon
                )
              ) : (
                tab.label
              )}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-row w-full justify-center">
        {/* {tabs.find((tab) => 
            tab.id === currentTab)?.component
        } */}
        {currentTab && (
          <Suspense fallback={<div>Loading...</div>}>
            <TabRenderer tab={tabs.find((tab) => tab.id === currentTab)!} />
          </Suspense>
        )}
      </div>
    </div>
  );
};
