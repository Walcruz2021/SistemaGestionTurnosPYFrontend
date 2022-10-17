import React, { useState, useEffect } from "react";
import helpHttp from "./ruteBack/helpHttp";
// import CardsItem from "./CardsItem";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Dashboard from "./Dashboard";
import { getClients } from "../reducer/actions";
import "./AgendaTurnos.css";



import axios from "axios";

function TodoList() {
  const dispatch = useDispatch();

  //LISTADO DE TURNOS
  //const turnos = useSelector((state) => state.allTurnos);
  const [loading, setLoading] = useState(false);
  //console.log(loading);

  //LISTADO DE CLIENTES

  //*console.log(clientes);
  // console.log(venta);
  const cliBusc = useSelector((state) => state.clientBusc);

  //console.log(selectedDog)

  const [db, setDb] = useState(null);
  console.log(db);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getTurnosList = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://peluqueriapichichu.onrender.com/api/getTurnos"
        );
        setDb(res.data.turnos);
      } catch (err) {
        setLoading(false);
      }
    };
    getTurnosList();
  }, []);

  //console.log(db,"lisssttttado")

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  /// ///////////////////////////////

  if (cliBusc.buscado) {
    const arrayIdClient = cliBusc.buscado.pedidos;
    // setCli(...cli,arrayIdClient)
    // console.log(arrayIdClient, "array de id de pedidos");
  }

  return (
    <div>
      <h1>Turnos</h1>

      {db ? <Dashboard turnos={db}/> :

        <div className="loader-container">
          {/* <div className="spinner"></div> */}
          <div className="spinner"></div>
        </div>
      }
      {error && <Message />}
    </div>
  );
}

export default TodoList;
