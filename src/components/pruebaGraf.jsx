import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import gastos from "../icons/gastos.png";
import ventas from "../icons/ventas.png";
import { Link } from "react-router-dom";
import {gtosXanio,vtasxA} from "../reducer/actions"
import filterSumaValues from "../functions/filterSumaValues"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InfGastosAndVtas = () => {
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const listGtosAnio = useSelector((state) => state.gtosxAnio);
  const listVtasAnio = useSelector((state)=>state.vtasxAnio)
  const [stateGtosValue, setStateGtosValue] = useState([]);
  const [stateVtasValue, setStateVtasValue] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let now = new Date();
    let anio = now.getFullYear();
    dispatch(gtosXanio(companySelectedMenu._id, anio));
  }, [companySelectedMenu._id]);
  
  useEffect(() => {
    if (listGtosAnio) {
      const arrayData=filterSumaValues(listGtosAnio)
      setStateGtosValue(sumaValueFilteredXmes(arrayData));
    }
  }, [listGtosAnio]);
  
  useEffect(() => {
    let now = new Date();
    let anio = now.getFullYear();
    dispatch(vtasxA(companySelectedMenu._id, anio));
  }, [companySelectedMenu._id]);
  
  useEffect(() => {
    if (listVtasAnio) {
      const arrayData=filterSumaValues(listVtasAnio)
      setStateVtasValue(sumaValueFilteredXmes(arrayData));
    }
  }, [listVtasAnio]);
  /**
   * 
   * @param {*} arrayData array with values filtered y adds (totals) of transfer, tarjeta, and efectivo 
   * @returns array with sumaMes's values(sumaMes is property object arrayData) [12522,1545,21,etc]
   */
  const sumaValueFilteredXmes = (arrayData) => {
    
    const arraySumaValue = [];
    if (Array.isArray(arrayData)) {
      arrayData.map((data) => {
        arraySumaValue.push(data.sumaMes);
      });
      return arraySumaValue;
    }
  };

  const dataG = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Gastos",
        data: stateGtosValue,
        backgroundColor: "rgba(255, 0, 0, 0.6)",
      },
    ],
  };

  const dataV = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Ventas",
        data: stateVtasValue,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
  };
  const [activeGastos, setActiveGastos] = useState(true);
  const [activeVentas, setActiveVentas] = useState(false);

  const changeVisibleV = () => {
    setActiveVentas(!activeVentas);
    setActiveGastos(!activeGastos);
  };

  const changeVisibleG = () => {
    setActiveVentas(!activeVentas);
    setActiveGastos(!activeGastos);
  };

  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
          <div className="text-center">
            <div className="card-body">
              <button className="btn btn-link" onClick={changeVisibleV}>
                <img src={ventas} />
              </button>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
          <div className="text-center">
            <div className="card-body">
              <button className="btn btn-link" onClick={changeVisibleG}>
                <img src={gastos} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {activeGastos ? (
        <Bar data={dataV} options={options} />
      ) : (
        <Bar data={dataG} options={options} />
      )}
    </div>
  );
};

export default InfGastosAndVtas;
