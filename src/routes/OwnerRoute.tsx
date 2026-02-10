import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type { AppRole } from "../context/AuthProvider";

const { VITE_ROLE_OWNER_VAL } = import.meta.env; 

export function OwnerRoute() {
    const { isAuthenticated, hasRole } = useAuth();
    const location = useLocation();

    const isOwner = hasRole(VITE_ROLE_OWNER_VAL as AppRole);

    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (!isOwner) {
        return <Navigate to="/403" state={{ from: location }} replace />;
    }

    return <Outlet />;
}