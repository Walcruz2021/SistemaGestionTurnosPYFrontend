import React, { useState, useEffect } from "react";

// import AgendaItem from "./AgendaItem";
// import CardsItem from "./CardsItem";
import { useDispatch, useSelector } from "react-redux";
import {
  orderGastosMonthNow,
  gastosXanioandMesNow,
  gastosXanioandMesParam,
  orderGastosXanioandMesParam
} from "../../reducer/actions/actionsGastos";
import ModalBoostrap from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import back from "../../icons/back.png";
import infMonth from "../../icons/infMonth.png";
import ModalTypeGasto from "../Modal/ModalTypeGasto";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import convertNum from "../../functions/convertNum"
// import { Chart } from "primereact/chart";

export default function InformeGastos() {
  const companySelectedMenu = useSelector((state) => state.company.companySelected);

  //devolucion decha actual
  let date = new Date();
  //console.log(date.toISOString().split('T')[0]);
  const mes = date.getMonth() + 1;
  //console.log(mes)
  const anio = date.getFullYear();
  //console.log(anio)

  const MySwal = withReactContent(Swal);
  const gastos = useSelector((state) => state.bills.gastosXanioandMesNow);


  const gastosFiltered = useSelector((state) => state.bills.gastosXanioandMesParam);

  const dispatch = useDispatch();

  const productsInv3 = useSelector((state) => state.bills.allGastos);
  // console.log(productsInv3, "listgastos");
  const [newTurno, setNewTurno] = useState(false);
  const [stateDetailsGasto, setStateDetailsGasto] = useState({
    transferencia: "",
    tarjeta: "",
    efectivo: "",
    description: "",
  });

  const [stateInfo, setInfo] = useState(false);
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
    if (companySelectedMenu) {
      dispatch(gastosXanioandMesNow(companySelectedMenu._id));
    }
  }, [dispatch, companySelectedMenu]);

  function Searchgastos() {
    const date = "" + seletedAño + seletedMeses;
    dispatch(gastosXanioandMesParam(companySelectedMenu._id, date));
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

  const listadoGastos = gastos;

  function handleOrder(e) {
    setOrder(!order);
    dispatch(orderGastosMonthNow(order));
  }

  function handleOrder2(e) {
    setOrder(!order);
    dispatch(orderGastosXanioandMesParam(order));
  }


  let labels = [];
  let data3 = [];

  if (productsInv3) {
    labels = productsInv3.map((e) => e.name);
    //console.log(labels, "listgastos1");
    data3 = productsInv3.map((e) => e.valorServ);
    //console.log(data3, "listgastos2");
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

  function handleInfo(e, description, efectivo, tarjeta, transferencia) {
    setStateDetailsGasto({
      efectivo: efectivo,
      tarjeta: tarjeta,
      transferencia: transferencia,
      description: description,
    });
    setInfo(!stateInfo);
  }

  return (
    <div className="instrument-serif-regular">
      {stateInfo ? (
        <>
          <ModalBoostrap show={stateInfo} centered>
            <ModalBoostrap.Body>
              <ModalTypeGasto
                state={stateInfo}
                setStateModal={setInfo}
                descripcion={stateDetailsGasto.description}
                efectivo={stateDetailsGasto.efectivo}
                tarjeta={stateDetailsGasto.tarjeta}
                transferencia={stateDetailsGasto.transferencia}
              />
            </ModalBoostrap.Body>
          </ModalBoostrap>
        </>
      ) : null}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 col-md-4 mb-3 justify-content-center">
            <div className="text-center">
              <div className="card-body">
                <Link to="/InformeAnualGtos">
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
                <Link to="/gastos">
                  <button className="btn btn-link">
                    <img src={back} />
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
        <h2>Gastos del Mes Actual</h2>
      </div>

      {gastos && gastos.length === 0 ? (
        <div className="container-lg P-2">
          <h5 className="alertSearch">No existen Gastos del Mes Actual</h5>
        </div>
      ) : null}

      {gastos && Array.isArray(gastos) ? (
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
                <th>Categoria Gasto</th>
                <th>Tipo de Gasto</th>
                <th>Valor de Gasto</th>
                {/* <th>Efectivo</th>
                <th>Banco</th>
                <th>Tarjeta</th> */}
              </tr>
            </thead>
            <tbody>
              {gastos.map((gtos) => (
                <tr key={gtos._id}>
                  <td>{convertDateFormat(gtos.date)}</td>
                  {gtos.categoryGasto ? (
                    <td> {gtos.categoryGasto}</td>
                  ) : (
                    <td>" "</td>
                  )}
                  {gtos.typeGasto ? <td> {gtos.typeGasto}</td> : <td>" "</td>}
                  {gtos.value ? (
                    <td
                      onClick={
                        (e) =>
                          handleInfo(
                            e,
                            gtos.description,
                            gtos.efectivo,
                            gtos.tarjeta,
                            gtos.transferencia
                          )
                        // console.log(turn.notesTurn,"-->notes")
                      }
                      style={{ cursor: "pointer" }}
                      title="Ver Detalles"
                    >
                      {convertNum(gtos.value)}
                    </td>
                  ) : (
                    <td>{convertNum(0)}</td>
                  )}
                  {/* {gtos.efectivo ? <td>$ {gtos.efectivo}</td> : <td>$ 0</td>}
                  {gtos.transferencia ? (
                    <td>$ {gtos.transferencia}</td>
                  ) : (
                    <td>$ 0</td>
                  )}
                  {gtos.tarjeta ? <td>$ {gtos.tarjeta}</td> : <td>$ 0</td>} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="container-lg P-2">
        <Select
          className="classSelect"
          placeholder="Seleccione Año"
          options={años}
          onChange={changeAño}
        />
      </div>

      <div className="container-lg P-2">
        <Select
          className="classSelect"
          placeholder="Seleccione Mes"
          options={meses}
          onChange={changeMeses}
        />
      </div>
      <div className="container-lg P-2">
        <button
          className="container-lg P-2 buttonBusc"
          onClick={() => Searchgastos()}
        >
          Buscar Listado
        </button>
      </div>

      {gastosFiltered ? (
        <div className="container-lg table-responsive">
          <div className="titGral">
            <h2>Gastos del Mes Seleccionado</h2>
          </div>
          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-dark">
              <tr>
                <th>
                  Date{" "}
                  <FontAwesomeIcon
                    onClick={(e) => handleOrder2(e)}
                    color={order ? "#FF846A" : "#A2DFFF"}
                    icon={faSortAlphaDown}
                    size="lg"
                    style={{ cursor: "pointer" }}
                  />
                </th>
                <th>Categoria Gasto</th>
                <th>Tipo de Gasto</th>
                <th>Valor de Gasto</th>
              </tr>
            </thead>
            <tbody>
              {gastosFiltered.map((gtos) => (
                <tr key={gtos._id}>
                  <td>{convertDateFormat(gtos.date)}</td>
                  {gtos.categoryGasto ? (
                    <td> {gtos.categoryGasto}</td>
                  ) : (
                    <td>" "</td>
                  )}

                  {gtos.typeGasto ? <td> {gtos.typeGasto}</td> : <td>" "</td>}

                  {gtos.value ? (
                    <td
                      onClick={(e) =>
                        handleInfo(
                          e,
                          gtos.description,
                          gtos.efectivo,
                          gtos.tarjeta,
                          gtos.transferencia
                        )
                      }
                      style={{ cursor: "pointer" }}
                      title="Ver Detalles"
                    >
                      {convertNum(gtos.value)}
                    </td>
                  ) : (
                    <td>{convertNum(0)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container-lg P-2">
          <h5 className="alertSearch">No se encontraron gastos</h5>
        </div>
      )}
    </div>
  );
}
