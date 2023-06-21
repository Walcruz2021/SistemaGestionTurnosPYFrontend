import React from "react"
import { Outlet } from "react-router-dom"


//<Outlet>  es un componente proporcionado por React Router. Es utilizado para renderizar el contenido asociado a 
//las rutas secundarias anidadas dentro de una ruta principal en la estructura de enrutamiento con React Router.
// representa el contenido asociado al enrutamiento de nivel superior.En este caso es Layout
const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout
