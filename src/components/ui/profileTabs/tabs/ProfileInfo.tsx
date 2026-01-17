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

  type UIField = {
    key: string;
    label: string;
    value?: string;
    link?: string;
    icon?: string;
  };

  // Dynamic profileFields generation
  const iconMap: Record<string, string> = {
    github: "bootstrap/github",
    linkedin: "bootstrap/linkedin",
    work: "bootstrap/briefcase",
    bdate: "bootstrap/cake2-fill",
    location: "bootstrap/geo-alt",
    born: "bootstrap/flag",
  };

  const skillCategoryIconMap: Record<string, string> = {
    backend: "bootstrap/pc",
    frontend: "bootstrap/window-sidebar",
    mobile: "bootstrap/device-mobile",
    cloud: "bootstrap/cloud-fill",
    azure: "bootstrap/microsoft",
    aws: "bootstrap/amazon",
    devops: "bootstrap/file-earmark-code-fill",
    qa: "bootstrap/check2-square",
    aI: "bootstrap/robot",
    automation: "bootstrap/robot",
    databases: "bootstrap/hdd-rack",
    cybersecurity: "bootstrap/shield-lock",
    blockchain: "bootstrap/coin",
    iot: "bootstrap/monitor",
    arvr: "bootstrap/phone",
  };

  const certProviderIconMap: Record<string, string> = {
    Azure: "bootstrap/microsoft",
    Google: "bootstrap/google",
    AWS: "bootstrap/amazon",
    Linux: "bootstrap/tux",
    Salesforce: "bootstrap/cloud-fill",
  };

  const isKeyValueItem = (
    x: any,
  ): x is { key: string; value: string; url?: string } => {
    return x && typeof x === "object" && typeof x.key === "string";
  };

  const labelFromKey = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
  };

  const getSingleEntry = (obj: any): { k: string; v: any } | null => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return null;
    const keys = Object.keys(obj);
    if (keys.length !== 1) return null;
    const k = keys[0];
    return { k, v: obj[k] };
  };

  const normalizeSkills = (
    skills: any[] | undefined,
    iconMap: Record<string, string>,
  ): UIField[] => {
    if (!Array.isArray(skills)) return [];

    const fields: UIField[] = [];

    for (const obj of skills) {
      const entry = getSingleEntry(obj);
      if (!entry) continue;
      const category = entry.k;
      const list = Array.isArray(entry.v) ? entry.v : [];

      fields.push({
        key: `skills.${category}`,
        label: labelFromKey(category),
        value: list.join(", "),
        icon: iconMap[category] || "bootstrap/info-circle",
      });
    }

    return fields;
  };

  const normalizeCertifications = (
    certifications: any[] | undefined,
    providerIconMap: Record<string, string>,
  ) => {
    if (!Array.isArray(certifications)) return [];

    const fields: UIField[] = [];

    for (const obj of certifications) {
      const entry = getSingleEntry(obj);
      if (!entry) continue;
      const provider = entry.k;
      const list = Array.isArray(entry.v) ? entry.v : [];

      for (const cert of list) {
        const code =
          typeof cert?.value === "string" ? cert.value : cert?.name || "cert";
        const name = typeof cert?.name === "string" ? cert.name : code;

        fields.push({
          key: `certifications${provider}.${code}`,
          label: `${provider} - ${code}`,
          value: name,
          link:
            typeof cert?.credentialUrl === "string"
              ? cert.credentialUrl
              : undefined,
          icon: providerIconMap[provider] || "bootstrap/award",
        });
      }
    }

    return fields;
  };

  const profileFields = profileInfo
    ? Object.keys(profileInfo).reduce(
        (acc, domain) => {
          const domainData = profileInfo[domain as keyof Profile];

          if (Array.isArray(domainData)) {
            const items = domainData.filter(isKeyValueItem);

            if (items.length > 0) {
              acc[domain] = domainData.map((item: any) => ({
                key: item.key,
                label: labelFromKey(item.key),
                value: item.value,
                link: item.url,
                icon: iconMap[item.key] || "bootstrap/info-circle",
              }));
              return acc;
            }
          }

          if (domain === "skills") {
            acc[domain] = normalizeSkills(
              profileInfo.skills as any[],
              skillCategoryIconMap,
            );
            return acc;
          }

          if (domain === "certifications") {
            acc[domain] = normalizeCertifications(
              profileInfo.certifications as any[],
              certProviderIconMap,
            );
            return acc;
          }

          return acc;
        },
        {} as Record<string, any[]>,
      )
    : {};

  if (!profileInfo) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">No profile info found</div>
      </div>
    );
  }

  return (
    <div className="flex w-full mx-0.5 my-1 px-8 py-2 flex-row items-center dark:bg-contabdark/80 dark:mt-1.75">
      <div className="flex w-1/3 h-full flex-col border-r border-r-[#DBDBDB] dark:border-r-[#575353] pr-2">
        <p className="lg:pl-14 py-4 font-bold text-2xl">Informaci&oacute;n</p>
        <div className="flex flex-row">
          <div className="grid grid-flow-row w-full text-md font-semibold dark:text-txtabdark gap-3">
            {tabs &&
              tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`rounded-lg cursor-pointer capitalize items-center font-bold text-xl  hover:bg-hvtab dark:hover:bg-hvtabdark px-4 lg:px-20 -ml-6 lg:-ml-6 py-4 ${
                    currentTab === tab.id ? "text-hvtxtabdark" : "text-gray-400"
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
          (Object.keys(profileFields).includes(currentTab) ? (
            <div className="grid grid-flow-row grid-cols-1 gap-5">
              {profileFields[currentTab as keyof typeof profileFields].map(
                (field: UIField) => (
                  <div
                    key={field.key}
                    className={`grid grid-flow-col grid-cols-4 text-lg dark:text-gray-400 ${currentTab !== "certifications" && currentTab !== "skills" ? "" : "lg:grid-cols-7"} gap-5`}
                  >
                    <div className="flex flex-col col-span-1 px-4 justify-self-end self-center lg:col-span-2">
                      <Icon
                        name={field.icon}
                        className="text-gray-700 dark:text-gray-400"
                      />
                    </div>
                    <div className="flex-col inline col-span-3 py-4 md:col-span-4">
                      <span className="text-lg">{field.label}:</span>
                      <span className="font-bold dark:text-gray-200 ml-2">
                        {field.value ? (
                          field.link ? (
                            <a
                              href={field.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {field.value}
                            </a>
                          ) : (
                            field.value
                          )
                        ) : (
                          <a href="#" className="text-blue-500 hover:underline">
                            Not set
                          </a>
                        )}
                      </span>
                    </div>{" "}
                  </div>
                ),
              )}
            </div>
          ) : null)}
      </div>
    </div>
  );
}
