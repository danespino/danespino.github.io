import React, { useState } from "react";
import type { ReactNode } from "react";

import Button from "../Button"
import Icon from "../Icon";

export interface ProfileTabConfig {
    id: string;
    title: string;
    icon?: ReactNode | string;
    content?: ReactNode | string;
}

export interface ProfileTabsProps {
    tabs: ProfileTabConfig[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    activeTab?: string | undefined;
    className?: string;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
    tabs,
    defaultTab,
    onTabChange,
    activeTab = tabs[0]?.id,
    className,
}) => {
    const initialTabId = defaultTab ?? activeTab;
    const [currentTab, setCurrentTab] = useState<string | undefined>(initialTabId || tabs[0]?.id);

    const handleTabClick = (tabId: string) => {
        setCurrentTab(tabId);
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    return (
        <div className={`flex flex-col w-full ${className}`}>
            <div className="flex flex-row w-full items-center justify-center *:px-4 *:mx-3.5 *:mt-1">
                {tabs.map((tab) => (
                    <div key={tab.id} className="flex">
                        <Button
                            className={`bg-transparent font-bold py-0 text-sm lg:px-6 lg:py-2 ${currentTab === tab.id ? 'text-blue-500' : ''}`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {
                                tab.icon ? 
                                (
                                    typeof tab.icon === 'string' ? <Icon name={tab.icon} title={tab.title} /> : tab.icon
                                ) : 
                                (
                                    tab.title 
                                )
                            }
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex flex-row w-full justify-center">
                {tabs.find((tab) => tab.id === currentTab)?.content}
            </div>
        </div>
    );
};