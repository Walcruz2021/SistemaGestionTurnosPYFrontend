import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Informe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { orderVentas, vtasxA } from "../../reducer/actions/actionsVentas";
import { Link } from "react-router-dom";
import back from "../../icons/back.png";

import {
  faChartLine,
  faHandHoldingDollar,
  faCreditCardAlt,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import convertNum from "../../functions/convertNum";
import convertArraySalesxAnio from "../../functions/convertArraySalesxAnio";

function InformeAnualVtas() {
  const companySelectedMenu = useSelector((state) => state.company.companySelected);
  const ListAños = [
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
    { value: 2022, label: 2022 },
    { value: 2023, label: 2023 },
    { value: 2024, label: 2024 },
    { value: 2025, label: 2025 },
  ];

  const ventas22 = useSelector((state) => state.vtasxAnio);

  const [selectedAnio, setSelectedAnio] = useState();

  //segun el año seleccionado traera las ventas de todos los meses correspondiente a ese año
  //console.log(ventas22, "Listventas");
  // [{Dog:"628ae644d66d1f4760a02319"
  // año:2022
  // client:"6287c8a0da18314e74b9325a"
  // date:"2022-05-21"
  // efectivo:600
  // idTurno:"62b64deeabde7c1c0883f177"
  // mes:5
  // name:"Malachi Hahn"
  // notesTurn:"llega en auto"
  // tarjeta:5400
  // tipoServ:"corte cuchilla 25-25"
  // valorServ:6000
  // _id:"62b64e05abde7c1c0883f17c"},{},......]

  const dispatch = useDispatch();

  const [order, setOrder] = useState(false);

  function handleOrder(e) {
    setOrder(!order);
    dispatch(orderVentas(order));
  }


  const ChangeAnio = (value) => {
    setSelectedAnio(value.value);
    SearchVtas(value.value);
  };

  function SearchVtas(anio) {
    //console.log(anio);
    dispatch(vtasxA(companySelectedMenu._id, anio));
  }



  if (ventas22) {

    var arrayVtas = convertArraySalesxAnio(ventas22, selectedAnio);
    console.log(arrayVtas)
  }


  return (
    <div>
      {
        <div>
          <div className="container-lg">

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-6 col-md-4 text-center">
                  <div className="tex-center">
                    <div className="card-body">
                      <div className="btn btn-link">
                        <Link to="/InformeVentas">
                          <button className="btn btn-link">
                            <img src={back} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="titGral">
              <h1>Informe Anual</h1>
            </div>
            <Select
              placeholder="Seleccione Año"
              options={ListAños}
              onChange={ChangeAnio}
              className="classSelect instrument-serif-regular"
            />
          </div>

          {
            arrayVtas ?
              <div className="container-lg table-responsive">
                {ventas22 ? (
                  <>
                    <div className="titInf">
                      <h5>{arrayVtas.sumas[arrayVtas.sumas.length - 1].anio}</h5>
                    </div>
                    <table className="table table-bordered table-hover table-white">
                      <thead className="thead-light table-secondary instrument-serif-regular">
                        <tr>
                          <th>Mes</th>
                          <th>Vendido</th>
                          <th>Efectivo</th>
                          <th>Tarjeta</th>
                          <th>Banco</th>
                        </tr>
                      </thead>
                      <tbody className="instrument-serif-regular">
                        {Array.isArray(arrayVtas.meses) ? arrayVtas.meses.map((vta) => (
                          <tr>
                            <td>{vta.mesString}</td>
                            <td>{vta.sumaMes && convertNum(vta.sumaMes)}</td>
                            <td>{vta.sumaEfectivo && convertNum(vta.sumaEfectivo)}</td>
                            <td>{vta.sumaTarjeta && convertNum(vta.sumaTarjeta)}</td>
                            <td>{vta.sumaTransferencia && convertNum(vta.sumaTransferencia)}</td>
                          </tr>
                        )) : null
                        }
                      </tbody>
                    </table>
                  </>
                ) : (
                  <h5 className="alertVtas">
                    No existen Ventas para el año {selectedAnio}
                  </h5>
                )}

                <div className="containerInforme">
                  <div className="cardInf">
                    <div>
                      <FontAwesomeIcon icon={faChartLine} size="lg" />
                      <p>Total Vendido: {convertNum(arrayVtas.sumas[1].sumaTotalAnio)}</p>
                    </div>
                  </div>
                  <div className="cardInf">
                    <div>
                      <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
                      <p>Total Efectivo: {convertNum(arrayVtas.sumas[2].efectivoTotalAnio)}</p>
                    </div>
                  </div>
                  <div className="cardInf">
                    <div>
                      <FontAwesomeIcon icon={faBuildingColumns} size="lg" />
                      <p>Total Banco: {convertNum(arrayVtas.sumas[4].bcoTotalAnio)}</p>
                    </div>
                  </div>
                  <div className="cardInf">
                    <div>
                      <FontAwesomeIcon icon={faCreditCardAlt} size="lg" />
                      <p>Total Tarjeta: {convertNum(arrayVtas.sumas[3].tarjetaTotalAnio)}</p>
                    </div>
                  </div>
                </div>
              </div> :

              <div className="container-lg table-responsive">

                <h5 className="alertVtas">
                  No existen Ventas para el año {selectedAnio}
                </h5>


              </div>

          }
        </div>
      }
    </div>
  );
}

export default InformeAnualVtas;
