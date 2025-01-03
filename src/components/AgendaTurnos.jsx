import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Dashboard from "./Dashboard";
import {
  getUserLogin,
  verificationCompaniesExist,
  companySelected,
  getClients,
  getTurnos,
} from "../reducer/actions/actions";
import "./AgendaTurnos.css";
import linkBack from "./ruteBack/vbledeploy";

function AgendaTurnos() {
  // debugger
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState(null);

  const [listClients, setlistClients] = useState(null);
  const [error, setError] = useState(null);
  const loginUser = useSelector((state) => state.user);
  const companies = useSelector((state) => state.arrayCompanies.data);
  const [companyFirst, setCompanyFirst] = useState({});
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const listAllClients=useSelector((state)=>state.allClients)


  const changeClients = () => {
    dispatch(getClients(companySelectedMenu._id)); 
  };


  useEffect(() => {
    dispatch(verificationCompaniesExist(loginUser.email));
  }, [dispatch, loginUser]);

  useEffect(() => {
    const getTurnosList = async () => {
      if (companySelectedMenu) {
        try {
          setLoading(false);
          const turnosResponse = await dispatch(getTurnos(companySelectedMenu._id));
         
          const listClientsResponse = await axios.get(
            `${linkBack}/api/listClientsCompany/${companySelectedMenu._id}`
          );
          setlistClients(listClientsResponse.data);
          setDb(turnosResponse.payload); // Asegúrate de que turnosResponse.data contenga la información correcta
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };
    if (companySelectedMenu) {
      getTurnosList();
    }
  }, [companySelectedMenu, dispatch]);

  return (
    <>
      <>
        <div className="titGral">
          <h1>DASHBOARD</h1>
        </div>
        <div>
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <Message /> // Aquí se muestra el componente de error si hay un error
          ) : db ? (
            <Dashboard
              listClientsCompany={listClients}
              setlistClients={setlistClients}
              //onTurnoAdded={onTurnoAdded}
              changeClients={changeClients}
            />
          ) : (
            //when not exists tuns
            <Dashboard
              turnos={db}
              listClientsCompany={listClients}
              setlistClients={setlistClients}
              changeClients={changeClients}
            />
          )}
        </div>
      </>
    </>
  );
}

export default AgendaTurnos;
