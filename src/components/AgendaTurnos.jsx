import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Dashboard from "./Dashboard";
import {
  getTurnos,
} from "../reducer/actions/actionsTurnos";


import {
  verificationCompaniesExist,
  companySelected,
} from "../reducer/actions/actionsCompany";
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
  const listAllClients = useSelector((state) => state.allClients);


  useEffect(() => {
    dispatch(verificationCompaniesExist(loginUser.email));
  }, [dispatch, loginUser]);

  useEffect(() => {
    const getTurnosList = async () => {
      if (companySelectedMenu) {
        try {
          setLoading(false);
          const turnosResponse = await dispatch(
            getTurnos(companySelectedMenu._id)
          );
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
        <Dashboard setlistClients={setlistClients} />
      </>
    </>
  );
}

export default AgendaTurnos;
