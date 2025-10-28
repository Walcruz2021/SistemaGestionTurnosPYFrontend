

import React, { useState, useEffect } from "react";

// import AgendaItem from "./AgendaItem";
// import CardsItem from "./CardsItem";
import { useDispatch, useSelector } from "react-redux";
import {
  vtasAnioMesNow,
  orderVentas,
  orderVentasMonthNow,
  vtasMesandAnioxParam,
  orderVentasMonthAnioXParam,
  resetVentasXanioandMesParam,
  vtasxA,
  predictionsSalesxAnio
} from "../../reducer/actions/actionsVentas";
import "./InformeVentas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import back from "../../icons/back.png";
import infMonth from "../../icons/infMonth.png";
import convertArraySalesxAnio from "../../functions/convertArraySalesxAnio";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import { FaChartBar } from "react-icons/fa";
import convertNum from "../../functions/convertNum";
import sumaTotalesArray from "../../functions/sumaTotalesArray";
import {
  faChartLine,
  faHandHoldingDollar,
  faCreditCardAlt,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";
// import { Chart } from "primereact/chart";

export default function TodoList() {
  const companySelectedMenu = useSelector((state) => state.company.companySelected);


  //devolucion decha actual
  let date = new Date();
  //console.log(date.toISOString().split('T')[0]);
  const mes = date.getMonth() + 1;
  //console.log(mes)
  const anio = date.getFullYear();
  //console.log(anio)

  const MySwal = withReactContent(Swal);
  const ventas = useSelector((state) => state.sales.vtasxAnioandMesNow);

  const ventasXAnio = useSelector((state) => state.sales.vtasxAnio);
  const numberPrediction = useSelector((state) => state.sales.dataPrediction)


  const vtasFiltered = useSelector((state) => state.sales.vtasxAnioandMesParam);

  //console.log(vtaFilterDateNow,"vtas filtradas")
  const dispatch = useDispatch();

  const productsInv3 = useSelector((state) => state.sales.allVentas);
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
const [sumaTotalsState,setStateSumaTotals]=useState({
  sumaMes: 0,
  sumaEfectivo: 0,  
  sumaTarjeta: 0,
  sumaTransferencia: 0,
});
const [sumaTotalsState2,setStateSumaTotal2]=useState({
  sumaMes: 0,
  sumaEfectivo: 0,  
  sumaTarjeta: 0,
  sumaTransferencia: 0,
});

  useEffect(() => {
    if (companySelectedMenu) {
      dispatch(vtasAnioMesNow(companySelectedMenu._id));
      dispatch(vtasxA(companySelectedMenu._id, anio));

    }
  }, [dispatch, companySelectedMenu]);

  useEffect(() => {
    if (ventasXAnio && ventasXAnio.length) {
      const predictionsSales = convertArraySalesxAnio(ventasXAnio).meses;
      const listSales = predictionsSales.map(e => e.sumaMes);
      if (listSales.length) {
        dispatch(predictionsSalesxAnio(listSales));
      }
    }
  }, [ventasXAnio, dispatch]);

  useEffect(() => {
    if (ventas && ventas.length) {
       setStateSumaTotals(sumaTotalesArray(ventas))
    }
  }, [ventasXAnio, dispatch]);

  useEffect(() => {
    if (vtasFiltered && vtasFiltered.length) {
      setStateSumaTotal2(sumaTotalesArray(vtasFiltered));
    }
  }, [vtasFiltered, dispatch]);



  function SearchVentas() {
    const date = "" + seletedAño + seletedMeses;
    dispatch(vtasMesandAnioxParam(companySelectedMenu._id, date));
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
  let listadoAños = [2022, 2023, 2024, 2025];
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
  const [order2, setOrder2] = useState(false);

  const listadoVentas = ventas;

  function handleOrder(e) {
    setOrder(!order);
    dispatch(orderVentasMonthNow(order));
  }

  function handleOrder2(e) {
    setOrder2(!order2);
    dispatch(orderVentasMonthAnioXParam(order2));
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

  function resetVtasXParams() {
    dispatch(resetVentasXanioandMesParam())
  }



  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 col-md-4 mb-3 justify-content-center">
            <div className="text-center">
              <div className="card-body">
                <Link to="/InformeAnualVtas">
                  <button className="btn btn-link">
                    <img src={infMonth} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-4 mb-3 justify-content-center">
            <div className="text-center">
              <div className="card-body mt-1">
                <Link to="/">
                  <button className="btn btn-link">
                    <img src={back} onClick={resetVtasXParams} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* <AgendaInputs></AgendaInputs> */}
      <div className="titGral">
        <h2>Ventas del Mes Actual</h2>
      </div>

      {Array.isArray(ventas) && ventas.length != 0 ? (
        // HOVER para que semarque con el cursor
        // BODERED para que se marquen los bordes de las columnas
        <div className="container-lg table-responsive">
          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-dark">
              <tr className="instrument-serif-regular">
                <th >
                  Fecha{" "}
                  <FontAwesomeIcon
                    onClick={(e) => handleOrder(e)}
                    color={order ? "#FF846A" : "#A2DFFF"}
                    icon={faSortAlphaDown}
                    size="lg"
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th>Valor Servicio</th>
                <th>Efectivo</th>
                <th>Banco</th>
                <th>Tarjeta</th>
                <th>Cliente</th>
              </tr>
            </thead>
            <tbody className="instrument-serif-regular">
              {ventas.map((vta) => (
                <tr key={vta._id}>
                  <td>{convertDateFormat(vta.date)}</td>
                  {vta.valorServ ? <td>{convertNum(vta.valorServ)}</td> : <td>{convertNum(0)}</td>}
                  {vta.efectivo ? <td>{convertNum(vta.efectivo)}</td> : <td>{convertNum(0)}</td>}
                  {vta.transferencia ? (
                    <td>{convertNum(vta.transferencia)}</td>
                  ) : (
                    <td>{convertNum(0)}</td>
                  )}
                  {vta.tarjeta ? <td>{convertNum(vta.tarjeta)}</td> : <td>{convertNum(0)}</td>}
                  <td>{vta.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="titGral container-lg P-2">
          <h2 className="alertSearch">No existen Ingresos del Mes Actual</h2>
        </div>
      )}

      <div className="containerInforme">
        <div className="cardInf">
          <div>
            <FontAwesomeIcon icon={faChartLine} size="lg" />
            <p>Total Vendido: {convertNum(sumaTotalsState.sumaMes)}</p>
          </div>
        </div>
        <div className="cardInf">
          <div>
            <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
            <p>Total Efectivo: {convertNum(sumaTotalsState.sumaEfectivo)}</p>
          </div>
        </div>
        <div className="cardInf">
          <div>
            <FontAwesomeIcon icon={faBuildingColumns} size="lg" />
            <p>Total Banco: {convertNum(sumaTotalsState.sumaTransferencia)}</p>
          </div>
        </div>
        <div className="cardInf">
          <div>
            <FontAwesomeIcon icon={faCreditCardAlt} size="lg" />
            <p>Total Tarjeta: {convertNum(sumaTotalsState.sumaTarjeta)}</p>
          </div>
        </div>
      </div>


      <div className="containerInforme">
        <div className="cardInf">
          <div className="titGral">

            <h2>Prediccion de ventas para el mes {mes + 1} </h2>
          </div>
          <p>
            <FaChartBar /> {convertNum(numberPrediction)}
          </p> 
        </div>

      </div>

      <div className="container-lg p-1 instrument-serif-regular">
        <Select
          className="classSelect"
          placeholder="Seleccione Año"
          options={años}
          onChange={changeAño}
        />
      </div>

      <div className="container-lg p-1 instrument-serif-regular">
        <Select
          className="classSelect"
          placeholder="Seleccione Mes"
          options={meses}
          onChange={changeMeses}
        />
      </div>
      <div className="container-lg p-2">
        <button
          className="container-lg P-2 buttonBusc"
          onClick={() => SearchVentas()}
        >
          Buscar Listado
        </button>
      </div>

      {vtasFiltered ? (
        <div className="container-lg table-responsive">
          <div className="titGral">
            <h2>Ventas del Mes Seleccionado</h2>
          </div>
          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-dark instrument-serif-regular">
              <tr>
                <th>
                  Fecha{" "}
                  <FontAwesomeIcon
                    onClick={(e) => handleOrder2(e)}
                    color={order2 ? "#FF846A" : "#A2DFFF"}
                    icon={faSortAlphaDown}
                    size="lg"
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th>Valor de Servicio</th>
                <th>Efectivo</th>
                <th>Banco</th>
                <th>Tarjeta</th>
                <th>Cliente</th>
              </tr>
            </thead>
            <tbody className="instrument-serif-regular">
              {vtasFiltered.map((vta) => (
                <tr key={vta._id}>
                  <td>{convertDateFormat(vta.date)}</td>
                  {vta.valorServ ? <td>{convertNum(vta.valorServ)}</td> : <td>{convertNum(0)}</td>}
                  {vta.efectivo ? <td>{convertNum(vta.efectivo)}</td> : <td>{convertNum(0)}</td>}
                  {vta.transferencia ? (
                    <td>{convertNum(vta.transferencia)}</td>
                  ) : (
                    <td>{convertNum(0)}</td>
                  )}
                  {vta.tarjeta ? <td>{convertNum(vta.tarjeta)}</td> : <td>{convertNum(0)}</td>}
                  <td>{vta.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="titGral container-lg p-2">
          <h2 className="alertSearch">No se encontraron ventas</h2>
        </div>
      )}

       <div className="containerInforme">
        <div className="cardInf">
          <div>
            <FontAwesomeIcon icon={faChartLine} size="lg" />
            <p>Total Vendido: {convertNum(sumaTotalsState2.sumaMes)}</p>
          </div>
        </div>
        <div className="cardInf">
          <div>
            <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
            <p>Total Efectivo: {convertNum(sumaTotalsState2.sumaEfectivo)}</p>
          </div>
        </div>
        <div className="cardInf">
          <div>
            <FontAwesomeIcon icon={faBuildingColumns} size="lg" />
            <p>Total Banco: {convertNum(sumaTotalsState2.sumaTransferencia)}</p>
          </div>
        </div>
        <div className="cardInf">
          <div>
            <FontAwesomeIcon icon={faCreditCardAlt} size="lg" />
            <p>Total Tarjeta: {convertNum(sumaTotalsState2.sumaTarjeta)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

