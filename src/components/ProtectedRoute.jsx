import React from "react";
import { Outlet,Navigate } from "react-router-dom"
import {useAuth} from "../auth/AuthProvider.tsx"

const ProtectedRoute = ({children }) => {

    const auth=useAuth()  
    // Verificar si el usuario está autenticado
    if (!auth.isAuthenticated) {
      // Si no está autenticado, redirigir al usuario a la página de inicio de sesión
      return <Navigate to="/" />;
    }
  
    // Si está autenticado, mostrar el contenido protegido (children)
    return <>{children}</>;
  };
  export default ProtectedRoute;