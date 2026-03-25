import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Informe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { orderVentas, vtasxA } from "../../reducer/actions/actionsVentas";
import { informSalesSupplyByYear } from "../../reducer/actions/supply/actionsInformSalesSupply"
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
import convertArrayServxAnio from "../../functions/convertArrayServxAnio";
import convertArraySalesByYear from "../../functions/convertArraySalesByYear";

function InformeAnualVtas() {
  const companySelectedMenu = useSelector((state) => state.company.companySelected);
  const listSalesByYear = useSelector((state) => state.salesSupply.listSalesSuppliesByYear)

  const ListAños = [
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
    { value: 2022, label: 2022 },
    { value: 2023, label: 2023 },
    { value: 2024, label: 2024 },
    { value: 2025, label: 2025 },
    { value: 2026, label: 2026 },
  ];

  const listServByYear = useSelector((state) => state.sales.vtasxAnio);

  const [selectedAnio, setSelectedAnio] = useState();
  const [arrayServByYear, setArrayServByYear] = useState();


  const [arrayVtasByYear, setArrayVtasByYear] = useState();


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
    dispatch(informSalesSupplyByYear(companySelectedMenu._id, anio))
  }

  useEffect(() => {
    if (listServByYear && selectedAnio) {
      //var arrayServ = convertArrayServxAnio(listServByYear, selectedAnio);
      setArrayServByYear(listServByYear);
    }
  }, [listServByYear, selectedAnio])

  useEffect(() => {
    if (listSalesByYear && selectedAnio) {
      // var arrayVtas = convertArraySalesByYear(listSalesByYear.sales, selectedAnio);
      setArrayVtasByYear(listSalesByYear);
    }
  }, [listSalesByYear, selectedAnio])

  return (
    <div>

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

        <div className="titGral">
          <h2>Servicios Anuales</h2>
        </div>
        {
          arrayServByYear && arrayServByYear.totalByMonth.length > 0 && arrayServByYear.totalByYear ?
            <div className="container-lg table-responsive">

              <div className="titInf">
                <h5>{selectedAnio}</h5>
              </div>
              <table className="table table-bordered table-hover table-white">
                <thead className="thead-light table-secondary instrument-serif-regular">
                  <tr>
                    <th>Mes</th>
                    <th>Total Servicio</th>
                    <th>Efectivo</th>
                    <th>Tarjeta</th>
                    <th>Banco</th>
                  </tr>
                </thead>
                <tbody className="instrument-serif-regular">
                  {arrayServByYear && arrayServByYear.totalByMonth && Array.isArray(arrayServByYear.totalByMonth) ? arrayServByYear.totalByMonth.map((vta) => (
                    <tr>
                      <td>{vta._id ? vta._id === 1 ? 'Enero' : vta._id === 2 ? 'Febrero' : vta._id === 3 ? 'Marzo' : vta._id === 4 ? 'Abril' : vta._id === 5 ? 'Mayo' : vta._id === 6 ? 'Junio' : vta._id === 7 ? 'Julio' : vta._id === 8 ? 'Agosto' : vta._id === 9 ? 'Septiembre' : vta._id === 10 ? 'Octubre' : vta._id === 11 ? 'Noviembre' : 'Diciembre' : null}</td>
                      <td>{vta.totalValorServ && convertNum(vta.totalValorServ)}</td>
                      <td>{vta.totalEfectivo && convertNum(vta.totalEfectivo)}</td>
                      <td>{vta.totalTarjeta && convertNum(vta.totalTarjeta)}</td>
                      <td>{vta.totalTransferencia && convertNum(vta.totalTransferencia)}</td>
                    </tr>
                  )) : null}

                </tbody>
              </table>


              <div className="containerInforme">
                <div className="cardInf">
                  <div>
                    <FontAwesomeIcon icon={faChartLine} size="lg" />
                    <p>Total Vendido: {convertNum(arrayServByYear.totalByYear.totalValorServ)}</p>
                  </div>
                </div>
                <div className="cardInf">
                  <div>
                    <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
                    <p>Total Efectivo: {convertNum(arrayServByYear.totalByYear.totalEfectivo)}</p>
                  </div>
                </div>
                <div className="cardInf">
                  <div>
                    <FontAwesomeIcon icon={faBuildingColumns} size="lg" />
                    <p>Total Banco: {convertNum(arrayServByYear.totalByYear.totalTransferencia)}</p>
                  </div>
                </div>
                <div className="cardInf">
                  <div>
                    <FontAwesomeIcon icon={faCreditCardAlt} size="lg" />
                    <p>Total Tarjeta: {convertNum(arrayServByYear.totalByYear.totalTarjeta)}</p>
                  </div>
                </div>
              </div>



            </div> :

            <div className="container-lg table-responsive">

              <h5 className="alertVtas">
                No existen Servicios para el año {selectedAnio}
              </h5>
            </div>
        }



        <div className="titGral">
          <h2>Ventas Anuales</h2>
        </div>

        {
          arrayVtasByYear && arrayVtasByYear.monthlyTotals.length > 0 ?

            <div className="container-lg table-responsive">

              <>
                <div className="titInf">
                  <h5>{selectedAnio}</h5>
                </div>
                <table className="table table-bordered table-hover table-white">
                  <thead className="thead-light table-secondary instrument-serif-regular">
                    <tr>
                      <th>Mes</th>
                      <th>Total Vendido</th>
                      <th>Efectivo</th>
                      <th>Tarjeta</th>
                      <th>Banco</th>
                    </tr>
                  </thead>
                  <tbody className="instrument-serif-regular">
                    {Array.isArray(arrayVtasByYear.monthlyTotals) ? arrayVtasByYear.monthlyTotals.map((vta) => (
                      <tr>
                        <td>{vta._id ? vta._id === 1 ? 'Enero' : vta._id === 2 ? 'Febrero' : vta._id === 3 ? 'Marzo' : vta._id === 4 ? 'Abril' : vta._id === 5 ? 'Mayo' : vta._id === 6 ? 'Junio' : vta._id === 7 ? 'Julio' : vta._id === 8 ? 'Agosto' : vta._id === 9 ? 'Septiembre' : vta._id === 10 ? 'Octubre' : vta._id === 11 ? 'Noviembre' : 'Diciembre' : null}</td>
                        <td>{vta.totalSale && convertNum(vta.totalSale)}</td>
                        <td>{vta.totalPaymentMethodEfectivo && convertNum(vta.totalPaymentMethodEfectivo)}</td>
                        <td>{vta.totalPaymentMethodTarjeta && convertNum(vta.totalPaymentMethodTarjeta)}</td>
                        <td>{vta.totalPaymentMethodTransferencia && convertNum(vta.totalPaymentMethodTransferencia)}</td>
                      </tr>
                    )) : null
                    }
                  </tbody>
                </table>
              </>


              <div className="containerInforme">
                <div className="cardInf">
                  <div>
                    <FontAwesomeIcon icon={faChartLine} size="lg" />
                    <p>Total Vendido: {convertNum(arrayVtasByYear.totals.totalSale)}</p>
                  </div>
                </div>
                <div className="cardInf">
                  <div>
                    <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
                    <p>Total Efectivo: {convertNum(arrayVtasByYear.totals.totalPaymentMethodEfectivo)}</p>
                  </div>
                </div>
                <div className="cardInf">
                  <div>
                    <FontAwesomeIcon icon={faBuildingColumns} size="lg" />
                    <p>Total Banco: {convertNum(arrayVtasByYear.totals.totalPaymentMethodTransferencia)}</p>
                  </div>
                </div>
                <div className="cardInf">
                  <div>
                    <FontAwesomeIcon icon={faCreditCardAlt} size="lg" />
                    <p>Total Tarjeta: {convertNum(arrayVtasByYear.totals.totalPaymentMethodTarjeta)}</p>
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

    </div>
  );
}

export default InformeAnualVtas;
