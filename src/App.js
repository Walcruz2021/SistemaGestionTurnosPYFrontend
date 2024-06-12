import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgendaTurnos from "./components/AgendaTurnos";
import ListClients from "./components/ListClients.jsx";
import ListVentas from "./components/ListVentas.jsx";
import Informe from "./components/Informe.jsx";
import SettingClient from "./components/SettingClient.jsx";
import FormRegister from "./components/Formulario/FormsRegister.jsx";
import FormLoginNew from "./components/Formulario/FormLoginNew.jsx";
import LoginFirebase from "./components/LoginFirebase.jsx";
import ListCompanies from "./components/ListCompanies.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  functionCompanySelected,
  listenToAuthChanges,
  verificationCompaniesExist,
} from "./reducer/actions.jsx";
import NavBarLat from "../src/components/Menues/NavBarLat.jsx";
import FormAddCompany from "../src/components/Formulario/FormAddCompany.jsx"

function App() {
  const loginUser = useSelector((state) => state.user);
  const companiesList = useSelector((state) => state.arrayCompanies.data);

  const [stateCompanyGralNav, setCompanyGralNav] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  useEffect(() => {
    if (loginUser) {
      dispatch(verificationCompaniesExist(loginUser.email));
    }
  }, [dispatch, loginUser]);

  useEffect(() => {
    if (companiesList && "companies" in companiesList) {
      setCompanyGralNav(companiesList.companies[0]);
      dispatch(functionCompanySelected(companiesList.companies[0]))
      setIsLoading(false); // Cambiar estado de carga a falso
    }
  }, [companiesList]);

  useEffect(() => {
    if (stateCompanyGralNav) {
      setIsLoading(false);
    }
  }, [stateCompanyGralNav]);

  if (isLoading) {
    return <div>Loading...</div>; // Mostrar mensaje de carga mientras se obtienen los datos
  }

  const routesContent = (
    <Routes>
      <Route
        path="/dashboard"
        element={<AgendaTurnos stateCompanyGralNav={stateCompanyGralNav} />} // Condicional para asegurar que el prop no sea null
      />
      <Route path="/listClient" element={<ListClients />} />
      <Route path="/listVentas" element={<ListVentas />} />
      <Route path="/Informe" element={<Informe />} />
      <Route path="/settingClient" element={<SettingClient />} />
      {/* <Route path="/prueba" element={<Prueba />} /> */}
      <Route path="/addCompany" element={<FormAddCompany />} />
      <Route path="/listCompanies" element={<ListCompanies />}></Route>
    </Routes>
  );

  const routesContentInicio = (
    <Routes>
      <Route path="/register" element={<FormRegister />} />
      <Route path="/login" element={<FormLoginNew />} />
      <Route path="/" element={<LoginFirebase />} />
    </Routes>
  );

  return (
    <BrowserRouter>
      {loginUser ? (
        <div>
          <NavBarLat
            userLogin={loginUser.displayName}
            stateCompanyGralNav={stateCompanyGralNav}
            listCompaniesAll={companiesList}
            setCompanyGralNav={setCompanyGralNav}
          />
          <div>{routesContent}</div>
        </div>
      ) : (
        <div>{routesContentInicio}</div>
      )}
    </BrowserRouter>
  );
}

export default App;

//  {selectedCompanyGral ? (
//               <NavBarLat
//                 userLogin={loginUser.displayName}
//                 selectedCompanyGral={selectedCompanyGral}
//                 listCompaniesAll={companies}
//               />
//             ) : (
//               <NavBarLat
//                 userLogin={loginUser.displayName}
//                 selectedCompanyGral="null"
//                 listCompaniesAll={companies}
//               />
//             )}
