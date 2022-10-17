import React, { useState, useEffect } from "react";

// import AgendaItem from "./AgendaItem";
// import CardsItem from "./CardsItem";
import { useDispatch, useSelector } from "react-redux";
import {
  vtasAnioMesNow,
  orderVentas,
  vtasMesandAnioxParam,
} from "../reducer/actions";
import "./ListVentas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import Modal from "./Modal/Modal";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import { Button} from "../cssSyleComp/index";

import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";

// import { Chart } from "primereact/chart";

export default function TodoList() {
  //devolucion decha actual
  let date = new Date();
  //console.log(date.toISOString().split('T')[0]);
  const mes = date.getMonth() + 1;
  //console.log(mes)
  const anio = date.getFullYear();
  //console.log(anio)

  const MySwal = withReactContent(Swal);
  const ventas = useSelector((state) => state.vtasxAnioandMesNow);
  //console.log(ventas, 'Listventas')

  const vtasFiltered = useSelector((state) => state.vtasxAnioandMesParam);
  console.log(vtasFiltered);

  //console.log(vtaFilterDateNow,"vtas filtradas")
  const dispatch = useDispatch();

  const productsInv3 = useSelector((state) => state.allVentas);
  // console.log(productsInv3, "listVentas");
  const [newTurno, setNewTurno] = useState(false);
  const [newClient, setNewClient] = useState(false);
  const [newVentas, setNewVentas] = useState(false);
  const [editClient, setEditClient] = useState(false);
  const [inputState, setInputState] = useState({
    id: "",
    name: "",
    date: "",
    valorServ: "",
  });
  const [seletedMeses, setSelectedMeses] = useState("");
  //console.log(seletedMeses)
  const [seletedAño, setSelectedAño] = useState("");

  useEffect(() => {
    dispatch(vtasAnioMesNow());
  }, [dispatch]);

  function SearchVentas() {
    const date = "" + seletedAño + seletedMeses;
    dispatch(vtasMesandAnioxParam(date));
  }

  //**************SELECTOR MESES**************************/
  let listadoMeses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const meses = [];

  listadoMeses.map(function (mes, index) {
    const optionMes = { value: index + 1, label: mes };
    meses.push(optionMes);
  });

  //console.log(meses);

  // const meses=[
  // {value: 1, label: 'enero'},
  // {value: 2, label: 'febrero'},
  // {value: 3, label: 'marzo'},
  // {value: 4, label: 'abril'},..........
  // ]

  const changeMeses = (value) => {
    setSelectedMeses(value.value);
  };

  //******************************************** */

  //**************SELECTOR AÑOS**************************/
  let listadoAños = [2022, 2023];
  const años = [];

  listadoAños.map((año) => {
    const optionAño = { value: año, label: año };
    años.push(optionAño);
  });

  //console.log(años);

  // const meses=[
  // {value: 1, label: 'enero'},
  // {value: 2, label: 'febrero'},
  // {value: 3, label: 'marzo'},
  // {value: 4, label: 'abril'},..........
  // ]

  const changeAño = (value) => {
    setSelectedAño(value.value);
  };

  //******************************************** */
  const [order, setOrder] = useState(false);

  const listadoVentas = ventas;

  function handleOrder(e) {
    setOrder(!order);
    dispatch(orderVentas(order));
  }

  let labels = [];
  let data3 = [];

  if (productsInv3) {
    labels = productsInv3.map((e) => e.name);
    //console.log(labels, "listVentas1");
    data3 = productsInv3.map((e) => e.valorServ);
    //console.log(data3, "listVentas2");
  }

  const data = {
    labels,
    datasets: [
      {
        data: data3,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#cacfd2",
          "#a93226",
          "#d1f2eb",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#cacfd2",
          "#a93226",
          "#d1f2eb",
        ],
      },
    ],
  };

  function convertDateFormat(date) {
    if (date) {
      var info = date.split("-").reverse().join("/");
    }
    return info;
  }

  return (
    <div>
      <h1>Ventas</h1>

      <div className="grid-container container">
        <Link to="/Informe">
          <button className="button1">Informe Mensual</button>
        </Link>
        <Link to="/">
          <button className="button1">Back Home</button>
        </Link>
      </div>
      <br />
      {/* <AgendaInputs></AgendaInputs> */}
      {Array.isArray(ventas) ? (
        // HOVER para que semarque con el cursor
        // BODERED para que se marquen los bordes de las columnas
        <div className="container-lg table-responsive">
          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-dark">
              <tr>
                <th>
                  Date{" "}
                  <FontAwesomeIcon
                    onClick={(e) => handleOrder(e)}
                    color={order ? "#FF846A" : "#A2DFFF"}
                    icon={faSortAlphaDown}
                    size="lg"
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th>ValueService</th>
                <th>Efectivo</th>
                <th>Banco</th>
                <th>Tarjeta</th>
                <th>NameClient</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((vta) => (
                <tr key={vta._id}>
                  <td>{convertDateFormat(vta.date)}</td>
                  {vta.valorServ ? <td>$ {vta.valorServ}</td> : <td>$ 0</td>}
                  {vta.efectivo ? <td>$ {vta.efectivo}</td> : <td>$ 0</td>}
                  {vta.transferencia ? (
                    <td>$ {vta.transferencia}</td>
                  ) : (
                    <td>$ 0</td>
                  )}
                  {vta.tarjeta ? <td>$ {vta.tarjeta}</td> : <td>$ 0</td>}
                  <td>{vta.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No existen Ingresos del Mes Actual</h1>
      )}

      <div className="container-lg P-2">
        <Select className="classSelect" placeholder="Seleccione Año" options={años} onChange={changeAño} />
      </div>

      <div className="container-lg P-2">
        <Select className="classSelect" placeholder="Seleccione Mes" options={meses} onChange={changeMeses} />
      </div>
      <div className="container-lg P-2">
        <button
          className="container-lg P-2 buttonBusc"
          onClick={() => SearchVentas()}
        >
          Buscar Listado
        </button>
      </div>

      {vtasFiltered.status === 200 ? (
        <div className="container-lg table-responsive">
          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-dark">
              <tr>
                <th>
                  Date{" "}
                  <FontAwesomeIcon
                    onClick={(e) => handleOrder(e)}
                    color={order ? "#FF846A" : "#A2DFFF"}
                    icon={faSortAlphaDown}
                    size="lg"
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th>ValueService</th>
                <th>Efectivo</th>
                <th>Banco</th>
                <th>Tarjeta</th>
                <th>NameClient</th>
              </tr>
            </thead>
            <tbody>
              {vtasFiltered.data.vtas.map((vta) => (
                <tr key={vta._id}>
                  <td>{convertDateFormat(vta.date)}</td>
                  {vta.valorServ ? <td>$ {vta.valorServ}</td> : <td>$ 0</td>}
                  {vta.efectivo ? <td>$ {vta.efectivo}</td> : <td>$ 0</td>}
                  {vta.transferencia ? (
                    <td>$ {vta.transferencia}</td>
                  ) : (
                    <td>$ 0</td>
                  )}
                  {vta.tarjeta ? <td>$ {vta.tarjeta}</td> : <td>$ 0</td>}
                  <td>{vta.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : vtasFiltered.status === 204?
      <div className="container-lg P-2">
        <h5 className="alertSearch">No se encontraron ventas</h5>
      </div>:null
      }
    </div>
  );
}