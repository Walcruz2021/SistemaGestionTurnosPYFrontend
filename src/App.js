
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
import NavBarLat from "../src/components/Menues/NavBarLat.jsx";
import FormAddCompany from "../src/components/Formulario/FormAddCompany.jsx";
import Gastos from "./components/Gastos.jsx";
import InformeGastos from "./components/Informes/InformeGastos.jsx";
import InfGastosAndVtas from "./components/Informes/InfGastosAndVtas.jsx";

import {
  functionCompanySelected,
  listenToAuthChanges,
  verificationCompaniesExist,
} from "./reducer/actions/actions.jsx";

const AppRoutes = () => {
  const loginUser = useSelector((state) => state.user);

  const companiesList = useSelector((state) => state.arrayCompanies.data);
  //console.log(companiesList);
  const companySelected = useSelector((state) => state.companySelected);

  const navigate = useNavigate();
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
      if (companiesList && companiesList.companies) {
        if (!companySelected) {
          
          setCompanyGralNav(companiesList.companies[0]);
          dispatch(functionCompanySelected(companiesList.companies[0]));
          setIsLoading(false); // Cambiar estado de carga a falso
          navigate("/")
        }
      } else if(loginUser&&loginUser.emailVerified){
        navigate("/addCompany");
        setIsLoading(false);
      } 
      // else {
      //   navigate("/login")
      //   //alert("ingreso aqui")
      // }
    
  }, [companiesList, dispatch,loginUser, companySelected, navigate]);


  const routesContent = (
    <Routes>
      <Route
        path="/"
        element={<AgendaTurnos stateCompanyGralNav={stateCompanyGralNav} />} // Condicional para asegurar que el prop no sea null
      />
      <Route path="/listClient" element={<ListClients />} />
      <Route path="/listVentas" element={<ListVentas />} />
      <Route path="/InformeAnualVtas" element={<InformeAnualVtas />} />
      <Route path="/InformeAnualGtos" element={<InformeAnualGtos />} />
      <Route path="/gastos" element={<Gastos />} />
      <Route path="/settingClient" element={<SettingClient />} />
      <Route path="/addCompany" element={<FormAddCompany />} />
      <Route path="/listCompanies" element={<ListCompanies />}></Route>
      <Route path="/InformeGastos" element={<InformeGastos />}></Route>
      <Route path="/informes" element={<InfGastosAndVtas />}></Route>
      <Route path="*" element={<div>*404 Not Found</div>} />
    </Routes>
  );

  const routesContentInicio = (
    <Routes>
      <Route path="/register" element={<FormRegister />} />
      <Route className="bg-primary" path="/login" element={<FormLoginNew />} />
      <Route path="*" element={<FormLoginNew />} />
      {/* <Route path="/" element={<LoginFirebase />} /> */}
    </Routes>
  );

  return (
    <div>
      {loginUser && loginUser.emailVerified? (
        <div>
          <NavBarLat
            listCompaniesAll={companiesList}
          />
          <div>{routesContent}</div>
        </div>
      ) : (
        <div>{routesContentInicio}</div>
        
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
