import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import gastos from "../../icons/gastos.png";
import ventas from "../../icons/ventas.png";
import VtasGast from "../../icons/VtasGast.png";
import { gtosXanio} from "../../reducer/actions/actionsGastos";
import {vtasxA } from "../../reducer/actions/actionsVentas";
import "./InfGastosAndVtas.css"

import filterSumaValues from "../../functions/filterSumaValues";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InfGastosAndVtas = () => {
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const listGtosAnio = useSelector((state) => state.gtosxAnio);
  const listVtasAnio = useSelector((state) => state.vtasxAnio);

  const [stateGtosValue, setStateGtosValue] = useState([]);
 
  const [stateVtasValue, setStateVtasValue] = useState([]);

  
  const dispatch = useDispatch();

  useEffect(() => {
    if(companySelectedMenu){
      let now = new Date();
      let anio = now.getFullYear();
      dispatch(gtosXanio(companySelectedMenu._id, anio));
    }
  }, [companySelectedMenu, dispatch]);

  useEffect(() => {
    if (listGtosAnio) {
      const arrayData = filterSumaValues(listGtosAnio);
      setStateGtosValue(sumaValueFilteredXmes(arrayData));
    }else{
      setStateGtosValue([])
    }
  }, [listGtosAnio]);

  useEffect(() => {
    if(companySelectedMenu){
      let now = new Date();
      let anio = now.getFullYear();
      dispatch(vtasxA(companySelectedMenu._id, anio));
    }
  }, [companySelectedMenu, dispatch]);

  useEffect(() => {
    var arrayData=[]
    if (listVtasAnio) {
      arrayData = filterSumaValues(listVtasAnio);
      setStateVtasValue(sumaValueFilteredXmes(arrayData));
    }else{
      setStateVtasValue([])
    }
  }, [listVtasAnio]);

  const sumaValueFilteredXmes = (arrayData) => {
    const arraySumaValue = [];
    if (Array.isArray(arrayData)) {
      arrayData.forEach((data) => {
        arraySumaValue.push(data.sumaMes);
      });
      return arraySumaValue;
    }
    return arraySumaValue;
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

  const dataVyG = {
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
        borderColor: "rgba(255, 0, 0, 0.6)",
      },
      {
        label: "Ventas",
        data: stateVtasValue,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const isMobile = window.innerWidth < 600;

  const options = {
    responsive: true,
    aspectRatio: isMobile ? 0.8 : 2,
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

  const [activeVentas, setActiveVentas] = useState(true);
  const [activeGastos, setActiveGastos] = useState(false);
  const [activeVtasGtos, setActiveVtasGtos] = useState(false);

  const changeVisibleV = () => {
    setActiveVentas(true);
    setActiveGastos(false);
    setActiveVtasGtos(false);
  };

  const changeVisibleG = () => {
    setActiveVentas(false);
    setActiveGastos(true);
    setActiveVtasGtos(false);
  };

  const changeVisibleVyG = () => {
    setActiveVentas(false);
    setActiveGastos(false);
    setActiveVtasGtos(true);
  };

  return (
    <div className="container-lg mb-4">
      <div className="row justify-content-center">
        <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
          <div className="text-center">
            <div className="card-body">
              <button className="btn btn-link" onClick={changeVisibleV}>
                <img src={ventas} alt="Ventas" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
          <div className="text-center">
            <div className="card-body">
              <button className="btn btn-link" onClick={changeVisibleG}>
                <img src={gastos} alt="Gastos" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
          <div className="text-center">
            <div className="card-body">
              <button className="btn btn-link" onClick={changeVisibleVyG}>
                <img src={VtasGast} alt="Ventas y Gastos" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-4">
      {activeGastos ? (
        <Bar data={dataG} options={options} />
      ) : activeVentas ? (
        <Bar data={dataV} options={options} />
      ) : (
        <Line data={dataVyG} options={options}  />
      )}

      </div>
    </div>
  );
};

export default InfGastosAndVtas;
