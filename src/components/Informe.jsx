import React, { useState, useEffect } from "react";

// import AgendaItem from "./AgendaItem";
// import CardsItem from "./CardsItem";
import { useDispatch, useSelector } from "react-redux";

import "./Informe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTurno, orderVentas, vtasxA } from "../reducer/actions";
import Modal from "./Modal/Modal";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  faChartLine,
  faHandHoldingDollar,
  faCreditCardAlt,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";

function TodoList() {
  const ventas22 = useSelector((state) => state.vtasxAnio);
  console.log(ventas22, "Listventas");
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

  useEffect(() => {
    dispatch(vtasxA());
  }, [dispatch]);

  // const tam = 0;
  // const arrayAños = [2022];
  // const ventasMensCopia = [];
  // const sumaMes = [];
  // const meses = 0;

  // funcion que se encargara de insertar objeto FECHA al array de INFORME

  const fechaN = {
    name: 2022, // 2022
    meses: [
      {
        mesString: "Enero",
        mes: 1,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Febrero",
        mes: 2,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Marzo",
        mes: 3,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Abril",
        mes: 4,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Mayo",
        mes: 5,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Junio",
        mes: 6,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Julio",
        mes: 7,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Agosto",
        mes: 8,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Septiembre",
        mes: 9,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Octubre",
        mes: 10,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Noviembre",
        mes: 11,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
      {
        mesString: "Diciembre",
        mes: 12,
        sumaMes: 0,
        sumaEfectivo: 0,
        sumaTarjeta: 0,
        sumaTransferencia: 0,
      },
    ],
  };

  //se recorre el listado de todas las ventas 
  ventas22.map((vta) => {
    const mes = vta.mes-1;//es -1 poirque mes sera el indice en el array de meses
    //es decir mayo sera 4 en el array de meses
    //console.log(mes,"mes en curso")
    if (vta.valorServ) {
      if(fechaN.meses[mes]){
        fechaN.meses[mes].sumaMes = fechaN.meses[mes].sumaMes + vta.valorServ;
        console.log(fechaN.meses[mes].sumaMes,mes,"suma Mes Curso")
      }
      
    }

    if (vta.efectivo) {
      if(fechaN.meses[mes]){
        fechaN.meses[mes].sumaEfectivo =
          fechaN.meses[mes].sumaEfectivo + vta.efectivo;
      }
    } //else fechaN.meses[mes].sumaEfectivo = fechaN.meses[mes].sumaEfectivo + 0;


    if (vta.tarjeta) {
      if(fechaN.meses[mes]){
        fechaN.meses[mes].sumaTarjeta =
          fechaN.meses[mes].sumaTarjeta + vta.tarjeta;
      }
      
    } //else fechaN.meses[mes].sumaTarjeta = fechaN.meses[mes].sumaTarjeta + 0;
    


    if (vta.transferencia) {
      if(fechaN.meses[mes]){
        fechaN.meses[mes].sumaTransferencia =
          fechaN.meses[mes].sumaTransferencia + vta.transferencia;
      }
    } 
    // else
    //   fechaN.meses[mes].sumaTransferencia =
    //     fechaN.meses[mes].sumaTransferencia + 0;
  });

  const arrayVtas = [];
  if (fechaN.meses) {
    var sumaTotalAnio = 0;
    var efectivoTotalAnio = 0;
    var tarjetaTotalAnio = 0;
    var bcoTotalAnio = 0;
    fechaN.meses.map((valor) => {
      if (valor.sumaMes != 0) {
        arrayVtas.push(valor);
        sumaTotalAnio = sumaTotalAnio + valor.sumaMes;
        efectivoTotalAnio = efectivoTotalAnio + valor.sumaEfectivo;
        bcoTotalAnio = bcoTotalAnio + valor.sumaTransferencia;
        tarjetaTotalAnio = tarjetaTotalAnio + valor.sumaTarjeta;
      }
    });
    arrayVtas.push({ anio: fechaN.name });
  }

  //console.log(arrayVtas)

  // (6) [{…}, {…}, {…}, {…}, {…}, 2022]
  // 0: {mes: 2, sumaMes: 2000, sumaEfectivo: 2000, sumaTarjeta: NaN, sumaTransferencia: NaN}
  // 1: {mes: 3, sumaMes: 4500, sumaEfectivo: 1000, sumaTarjeta: 1500, sumaTransferencia: 1500}
  // 2: {mes: 5, sumaMes: 6000, sumaEfectivo: 600, sumaTarjeta: 5400, sumaTransferencia: 5400}
  // 3: {mes: 6, sumaMes: 5040, sumaEfectivo: 3000, sumaTarjeta: NaN, sumaTransferencia: NaN}
  // 4: {mes: 7, sumaMes: 3000, sumaEfectivo: 1000, sumaTarjeta: 1000, sumaTransferencia: 1000}
  // 5: 2022
  // length: 6

  return (
    <div>
      {Array.isArray(arrayVtas) ? (
        <div>
          <div className="container-lg">
            <h1>Informe Mensual</h1>
            <div className="buttonInf">
              <Link to="/listVentas">
                <button>Listado Ventas</button>
              </Link>
            </div>
          </div>

          <div className="container-lg table-responsive">
            <div className="titInf">
              <h5>{arrayVtas[arrayVtas.length - 1].anio}</h5>
            </div>
            <table className="table table-bordered table-hover table-white">
              <thead class="thead-light table-secondary">
                <tr>
                  <th>Mes</th>
                  <th>Vendido</th>
                  <th>Efectivo</th>
                  <th>Tarjeta</th>
                  <th>Banco</th>
                </tr>
              </thead>
              <tbody>
                {arrayVtas.map((vta) => (
                  <tr>
                    <td>{vta.mesString}</td>
                    <td>{vta.sumaMes}</td>
                    <td>{vta.sumaEfectivo}</td>
                    <td>{vta.sumaTarjeta}</td>
                    <td>{vta.sumaTransferencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="containerInforme">
              <div className="cardInf">
                <div>
                  <FontAwesomeIcon icon={faChartLine} size="lg" />
                  <p>Total Vendido $ {sumaTotalAnio}</p>
                </div>
              </div>
              <div className="cardInf">
                <div>
                  <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
                  <p>Total Efectivo: $ {efectivoTotalAnio}</p>
                </div>
              </div>
              <div className="cardInf">
                <div>
                  <FontAwesomeIcon icon={faBuildingColumns} size="lg" />
                  <p>Total Banco: $ {bcoTotalAnio}</p>
                </div>
              </div>
              <div className="cardInf">
                <div>
                  <FontAwesomeIcon icon={faCreditCardAlt} size="lg" />
                  <p>Total Tarjeta: $ {tarjetaTotalAnio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <Loading>
        //   <p>Loading...</p>
        //   <img src="https://i.imgur.com/5JQ02CS.gif" alt="loading gif" width="100px" />
        // </Loading>
        <h1>fsef</h1>
      )}
    </div>
  );
}

export default TodoList;
