
import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    //Dentro de la función, se utiliza el hook useContext(AuthContext) para obtener el valor actual del contexto de 
    //autenticación. Esto se asigna a la variable auth.
    const { auth } = useContext(AuthContext);
    //useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")

    //Se utiliza el hook useDebugValue para proporcionar una etiqueta de depuración al valor de auth. En este caso, 
    //se establece una etiqueta que indica si el usuario está "Logged In" (con sesión iniciada) o "Logged Out" 
    //(sin sesión iniciada)
    useDebugValue(auth, auth => auth && auth.userName ? "Logged In" : "Logged Out");

    //Finalmente, se devuelve el valor del contexto AuthContext utilizando useContext(AuthContext). 
    //Esto permite que otros componentes utilicen el contexto de autenticación accediendo a useAuth().
    return useContext(AuthContext);
}

//La función useAuth se puede utilizar en componentes de la aplicación para acceder fácilmente al contexto de 
//autenticación y utilizar los datos de autenticación en diferentes partes de la aplicación, como la visualización 
//del estado de inicio de sesión, el acceso a la información del usuario, etc.
export default useAuth;