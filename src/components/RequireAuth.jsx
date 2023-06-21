import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    let hasAllowedRole = false;
    if (auth && auth.roles && allowedRoles) {
        hasAllowedRole = allowedRoles.some(role => auth.roles.includes(role));
    }

    return (
        hasAllowedRole
            ? <Outlet />
            : auth && auth.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/loginUser" state={{ from: location }} replace />
    );
};

export default RequireAuth;