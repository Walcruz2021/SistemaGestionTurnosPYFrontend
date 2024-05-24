import React, { useState, useEffect } from "react";
import helpHttp from "./ruteBack/helpHttp";
import linkBack from "./ruteBack/vbledeploy";
// import CardsItem from "./CardsItem";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Dashboard from "./Dashboard";
import { getClients } from "../reducer/actions";
import "./AgendaTurnos.css";
import SideBar from "././Menues/SideBar";
import NavBarLat from "./Menues/NavBarLat";
import axios from "axios";
import { auth } from "../hooks/configFirebase";
import { getUserLogin } from "../reducer/actions";

function TodoList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [db, setDb] = useState(null);
  console.log(db)
  const [error, setError] = useState(null);
  const loginUser = useSelector((state) => state.user);
  const companies = useSelector((state) => state.arrayCompanies.data);
  
//const idCompany="664fa827777c0f136cba108b"
  useEffect(() => {
    const getTurnosList = async () => {
      if(typeof companies==="object"){
        const idCompany = companies.companies[0]._id;
        try {
          const res = await axios.get(
            `${linkBack.development}/api/getTurnos/${idCompany}`
          );
          console.log(res)
          setLoading(true);
          setDb(res.data.turnos);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(err);
        }
      }
    };
    getTurnosList();
  }, []);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((userCred) => {
  //     if (userCred) {
  //       const { email, emailVerified, displayName } = userCred;
  //       setLoginUser({ email, emailVerified, displayName });
  //     } else {
  //       setLoginUser(null);
  //     }
  //     setAuthLoading(false); // Autenticación completada
  //   });

  //   return () => unsubscribe();
  // }, []);

  // if (authLoading) {
  //   return <div>Loading authentication...</div>; // Mostrar un indicador de carga mientras se determina el estado de autenticación
  // }

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
          ) : (
            db && <Dashboard turnos={db} /> 
          )}
          {error && <Message />}
        </div>
      </>
    </>
  );
}

export default TodoList;
