import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import type { AccountInfo } from '@azure/msal-browser';
import { loginRequest } from '../services/msalConfig';

export type AppRole = "Owner" | "Recruiter";
export type IdentityProviders = "Microsoft" | "Google" | "Facebook" | "Instagram" | "LinkedIn";

interface AuthUser {
    id?: string;
    name?: string;
    email: string;
    avatarUrl?: string;
}

interface AuthContextValue {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: AuthUser | null;
    roles: AppRole[];
    hasRole: (role: AppRole) => boolean;
    login: () => void;
    loginWithProvider: (provider: IdentityProviders) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode; }){
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const activeAccount: AccountInfo | null = useMemo(() => {
        if(!accounts || accounts.length === 0) return null;
        return accounts[0];
    }, [accounts]);

    const roles: AppRole[] = useMemo(() => {
        if(!activeAccount) return [];
        const roles = activeAccount.idTokenClaims?.roles as AppRole[] ?? [];
        return roles;
    }, [activeAccount]);

    const user: AuthUser | null = useMemo(() => {
        if(!activeAccount) return null;
        const claims = activeAccount.idTokenClaims as any;

        return {
            id: claims?.oid ?? claims?.sub,
            name: activeAccount.name,
            email: activeAccount.username,
            avatarUrl: claims?.picture ?? null,
        };
    }, [activeAccount]);

    const login = () => instance.loginRedirect(loginRequest);
    const loginWithProvider = (_provider: IdentityProviders) => instance.loginRedirect(loginRequest);

    const logout = () => instance.logoutRedirect({
        postLogoutRedirectUri: "/",
    });

    const contextValue: AuthContextValue = {
        isAuthenticated,
        isLoading: inProgress !== 'none',
        user,
        roles,
        hasRole: (role: AppRole) => roles.includes(role),
        login,
        loginWithProvider,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}