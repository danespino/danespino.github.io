import { LogLevel, type Configuration } from '@azure/msal-browser';

const {
    VITE_MSAL_CLIENT_ID,
    VITE_MSAL_TENANT_ID,
    VITE_MSAL_REDIR_URI,
    VITE_MSAL_POST_LOGOUT_REDIR,
    VITE_MSAL_TENANT_DOMAIN,
    VITE_MSAL_SIGNIN_POLICY,
    VITE_MSAL_AUTH_HOST,
    VITE_MSAL_IDP_MICROSOFT,
    VITE_MSAL_IDP_GOOGLE,
    VITE_MSAL_IDP_FACEBOOK,
    VITE_MSAL_IDP_INSTAGRAM,
    VITE_MSAL_IDP_LINKEDIN
} = import.meta.env;

if(!VITE_MSAL_CLIENT_ID) {
    throw new Error("VITE_MSAL_CLIENT_ID is not defined");
}

if(!VITE_MSAL_TENANT_ID) {
    throw new Error("VITE_MSAL_TENANT_ID is not defined");
}

if(!VITE_MSAL_TENANT_DOMAIN) {
    throw new Error("VITE_MSAL_TENANT_DOMAIN is not defined");
}

if(!VITE_MSAL_SIGNIN_POLICY) {
    throw new Error("VITE_MSAL_SIGNIN_POLICY is not defined");
}

if(!VITE_MSAL_AUTH_HOST) {
    throw new Error("VITE_MSAL_AUTH_HOST is not defined");
}

const normalizedTenantDomain = VITE_MSAL_TENANT_DOMAIN.replace(/^https?:\/\//, "").replace(/\/+$/, ""); // Avoid introducing an error by setting https in environmental vars
const baseAuthority = `https://${normalizedTenantDomain}/${VITE_MSAL_TENANT_ID}/v2.0`;

export const msalConfig:Configuration = {
  auth: {
        clientId: VITE_MSAL_CLIENT_ID,        // SPA app reg
        authority: baseAuthority,       // default UF: e.g. https://<tenant>.ciamlogin.com/<tenantID>/v2.0
        knownAuthorities: [normalizedTenantDomain], // ciamlogin.com host
        redirectUri: VITE_MSAL_REDIR_URI || window.location.origin,
        postLogoutRedirectUri: VITE_MSAL_POST_LOGOUT_REDIR || window.location.origin,
        navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
        logLevel: LogLevel.Info,
        loggerCallback: (level, message, containsPii) => {
            if (containsPii) {
                return;
            }
            switch (level) {
                case LogLevel.Error:
                    console.error(message);
                    return;
                case LogLevel.Info:
                    console.info(message);
                    return;
                case LogLevel.Verbose:
                    console.debug(message);
                    return;
                case LogLevel.Warning:
                    console.warn(message);
                    return;
                default:
                    return;
            }
        },
    },
  },
};

export const defaultLoginRequest = {
    scopes: ["openid", "profile", "offline_access"],
    extraQueryParameters: {
        p: VITE_MSAL_SIGNIN_POLICY,
    }
};

export const apiRequest = {
    scopes: ["openid"],
}

export const IdPHints = {
    Microsoft: VITE_MSAL_IDP_MICROSOFT,
    Google: VITE_MSAL_IDP_GOOGLE,
    Facebook: VITE_MSAL_IDP_FACEBOOK,
    Instagram: VITE_MSAL_IDP_INSTAGRAM,
    Linkedin: VITE_MSAL_IDP_LINKEDIN
} as const;

export type SupportedProvider = keyof typeof IdPHints;

export function getLoginRequestIdP(provider: SupportedProvider){
    const idp = IdPHints[provider];
    if(!idp){
        return defaultLoginRequest;
    }

    return {
        scopes: ["openid", "profile", "offline_access"],
        extraQueryParameters: {
            idp,
        }
    }
}