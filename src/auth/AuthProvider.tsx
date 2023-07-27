import React from "react";
import { useContext, createContext, useState} from "react";

interface AuthProviderProps{
    children: React.ReactNode
}

const AuthContext=createContext({
    isAuthenticated:false
})

export function AuthProvider({children}:AuthProviderProps){
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    return (
        <AuthContext.Provider value={{isAuthenticated}}>
        {children}
        </AuthContext.Provider>
    )
}

// export const useAuth=()=>{
//     useContext(AuthContext) 
// }

export function useAuth() {
    return useContext(AuthContext);
  }

// import React, { useContext, createContext, useState } from "react";

// interface AuthContextProps {
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextProps>({
//   isAuthenticated: false,
// });

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   return (
//     <AuthContext.Provider value={{ isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

