import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AgendaTurnos from "./components/AgendaTurnos";
import ListClients from "./components/ListClients.jsx";
import ListVentas from "./components/ListVentas.jsx";
import InformeAnualVtas from "./components/Informes/InformeAnualVtas.jsx";
import InformeAnualGtos from "./components/Informes/InformeAnualGtos.jsx";
import SettingClient from "./components/SettingClient.jsx";
import FormRegister from "./components/Formulario/FormsRegister.jsx";
import FormLoginNew from "./components/Formulario/FormLoginNew.jsx";
import LoginFirebase from "./components/LoginFirebase.jsx";
import ListCompanies from "./components/ListCompanies.jsx";
import FormAddCompany from "../src/components/Formulario/FormAddCompany.jsx";
import Gastos from "./components/Gastos.jsx";
import InformeGastos from "./components/Informes/InformeGastos.jsx";
import InfGastosAndVtas from "./components/Informes/InfGastosAndVtas.jsx";
import FormSoporteContact from "./components/Formulario/FormSoporteContact.jsx";
import FormSoporteContactLoginReg from "./components/Formulario/FormSoporteContactLoginReg.jsx";
import HistorialPet from "./components/HistorialPet.jsx";
import NavBarLat from "../src/components/Menues/NavBarLat.jsx";
import {
  functionCompanySelected,
  verificationCompaniesExist,
} from "./reducer/actions/actionsCompany.jsx";
import {
  listenToAuthChanges,
  verificationConection,
} from "./reducer/actions/actions.jsx";
import { ClipLoader } from "react-spinners";

const AppRoutes = () => {
  const conectionMongo = useSelector((state) => state.conectionMongo);
  const loginUser = useSelector((state) => state.user);

  const companiesList = useSelector((state) => state.arrayCompanies.data);
  const companySelected = useSelector((state) => state.companySelected);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Esperar la conexión a Mongo antes de mostrar la UI
  useEffect(() => {
    let interval;
    const checkConnection = async () => {
      try {
        const response = await dispatch(verificationConection());
        if (response) {
          setIsLoading(false);
          clearInterval(interval); // Si la conexión es exitosa, detenemos los intentos
        }
      } catch (error) {
        console.error("Error verificando conexión:", error);
      }
    };
    checkConnection();

    // Si el servidor no está disponible, intentamos cada 5 segundos
    interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [dispatch]);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  useEffect(() => {
    if (loginUser) {
      setIsLoading(false);
    }
  }, [loginUser]);

  useEffect(() => {
    if (loginUser) {
      dispatch(verificationCompaniesExist(loginUser.email));
    }
  }, [dispatch, loginUser]);

  useEffect(() => {
    if (companiesList?.companies) {
      if (!companySelected) {
        dispatch(functionCompanySelected(companiesList.companies[0]));
        setIsLoading(false);
        navigate("/");
      }
    } else if (loginUser?.emailVerified) {
      navigate("/addCompany");
      setIsLoading(false);
    }
  }, [companiesList, dispatch, loginUser, companySelected, navigate]);

  return (
    <div>
      {!isLoading ? (
        loginUser?.emailVerified ? (
          <div>
            <NavBarLat />
            <Routes>
              <Route path="/" element={<AgendaTurnos />} />
              <Route path="/listClient" element={<ListClients />} />
              <Route path="/listVentas" element={<ListVentas />} />
              <Route path="/InformeAnualVtas" element={<InformeAnualVtas />} />
              <Route path="/InformeAnualGtos" element={<InformeAnualGtos />} />
              <Route path="/gastos" element={<Gastos />} />
              <Route path="/settingClient" element={<SettingClient />} />
              <Route path="/addCompany" element={<FormAddCompany />} />
              <Route path="/listCompanies" element={<ListCompanies />} />
              <Route path="/InformeGastos" element={<InformeGastos />} />
              <Route path="/informes" element={<InfGastosAndVtas />} />
              <Route path="/support" element={<FormSoporteContact />} />
              <Route path="/historialPet" element={<HistorialPet />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/register" element={<FormRegister />} />
            <Route path="/login" element={<FormLoginNew />} />
            <Route path="*" element={<FormLoginNew />} />
            <Route
              path="/supportForm"
              element={<FormSoporteContactLoginReg />}
            />
          </Routes>
        )
      ) : (
        <div className="d-flex vh-100 justify-content-center align-items-center flex-column">
          <ClipLoader color="#000" loading={true} size={70} />
          <div className="titGral">
            <h2 className="mt-3">Espere un Momento por favor ...</h2>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import AgendaTurnos from "./components/AgendaTurnos";
// import ListClients from "./components/ListClients.jsx";
// import ListVentas from "./components/ListVentas.jsx";
// import InformeAnualVtas from "./components/Informes/InformeAnualVtas.jsx";
// import InformeAnualGtos from "./components/Informes/InformeAnualGtos.jsx";
// import SettingClient from "./components/SettingClient.jsx";
// import FormRegister from "./components/Formulario/FormsRegister.jsx";
// import FormLoginNew from "./components/Formulario/FormLoginNew.jsx";
// import LoginFirebase from "./components/LoginFirebase.jsx";
// import ListCompanies from "./components/ListCompanies.jsx";
// import NavBarLat from "../src/components/Menues/NavBarLat.jsx";
// import FormAddCompany from "../src/components/Formulario/FormAddCompany.jsx";
// import Gastos from "./components/Gastos.jsx";
// import InformeGastos from "./components/Informes/InformeGastos.jsx";
// import InfGastosAndVtas from "./components/Informes/InfGastosAndVtas.jsx";
// import FormSoporteContact from "./components/Formulario/FormSoporteContact.jsx"
// import FormSoporteContactLoginReg from "./components/Formulario/FormSoporteContactLoginReg.jsx"

// import {
//   functionCompanySelected,
//   verificationCompaniesExist,
// } from "./reducer/actions/actionsCompany.jsx";

// import {listenToAuthChanges} from "./reducer/actions/actions.jsx"

// const AppRoutes = () => {
//   const loginUser = useSelector((state) => state.user);

//   //companiesList es el listado de empresas que tiene el user logueado
//   const companiesList = useSelector((state) => state.arrayCompanies.data);

//   //companySelected es la empresa que se elije del listado de empresas visualizado en el sideBar
//   const companySelected = useSelector((state) => state.companySelected);

//   const navigate = useNavigate();
//   const [stateCompanyGralNav, setCompanyGralNav] = useState(null);

//   const [isLoading, setIsLoading] = useState(true); // Estado de carga

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(listenToAuthChanges())
//   }, [dispatch]);

//   useEffect(() => {
//     if (loginUser) {
//       dispatch(verificationCompaniesExist(loginUser.email));
//     }
//   }, [dispatch, loginUser]);

//   useEffect(() => {
//       if (companiesList && companiesList.companies) {
//         if (!companySelected) {
//           setCompanyGralNav(companiesList.companies[0]);
//           dispatch(functionCompanySelected(companiesList.companies[0]));
//           setIsLoading(false); // Cambiar estado de carga a falso
//           navigate("/")
//         }
//       } else if(loginUser&&loginUser.emailVerified){
//         navigate("/addCompany");
//         setIsLoading(false);
//       }
//       // else {
//       //   navigate("/login")
//       //   //alert("ingreso aqui")
//       // }

//   }, [companiesList, dispatch,loginUser, companySelected, navigate]);

//   const routesContent = (
//     <Routes>
//       <Route
//         path="/"
//         element={<AgendaTurnos stateCompanyGralNav={stateCompanyGralNav} />} // Condicional para asegurar que el prop no sea null
//       />
//       <Route path="/listClient" element={<ListClients />} />
//       <Route path="/listVentas" element={<ListVentas />} />
//       <Route path="/InformeAnualVtas" element={<InformeAnualVtas />} />
//       <Route path="/InformeAnualGtos" element={<InformeAnualGtos />} />
//       <Route path="/gastos" element={<Gastos />} />
//       <Route path="/settingClient" element={<SettingClient />} />
//       <Route path="/addCompany" element={<FormAddCompany />} />
//       <Route path="/listCompanies" element={<ListCompanies />}></Route>
//       <Route path="/InformeGastos" element={<InformeGastos />}></Route>
//       <Route path="/informes" element={<InfGastosAndVtas />}></Route>
//       <Route path="*" element={<div>*404 Not Found</div>} />
//       <Route path="/support" element={<FormSoporteContact/>}></Route>
//     </Routes>
//   );

//   const routesContentInicio = (
//     <Routes>
//       <Route path="/register" element={<FormRegister />} />
//       <Route className="bg-primary" path="/login" element={<FormLoginNew />} />
//       <Route path="*" element={<FormLoginNew />} />
//       {/* <Route path="/" element={<LoginFirebase />} /> */}
//       <Route path="/supportForm" element={<FormSoporteContactLoginReg/>}></Route>
//     </Routes>
//   );

//   return (
//     <div>
//       {loginUser && loginUser.emailVerified? (
//         <div>
//           <NavBarLat
//             listCompaniesAll={companiesList}
//           />
//           <div>{routesContent}</div>
//         </div>
//       ) : (
//         <div>{routesContentInicio}</div>

//       )}
//     </div>
//   );
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;
