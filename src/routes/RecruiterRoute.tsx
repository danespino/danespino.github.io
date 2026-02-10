import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type { AppRole } from "../context/AuthProvider";

const { VITE_ROLE_RECRUIT_VAL } = import.meta.env;

export function RecruiterRoute() {
    const { isAuthenticated, hasRole } = useAuth();
    const location = useLocation();

    const isRecruiter = hasRole(VITE_ROLE_RECRUIT_VAL as AppRole);

    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (!isRecruiter) {
        return <Navigate to="/403" state={{ from: location }} replace />;
    }

    return <Outlet />;
}