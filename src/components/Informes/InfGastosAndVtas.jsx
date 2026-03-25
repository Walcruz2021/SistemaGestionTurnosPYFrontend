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
import { gtosXanio } from "../../reducer/actions/actionsGastos";
import { vtasxA } from "../../reducer/actions/actionsVentas";
import { informSalesSupplyByYear } from "../../reducer/actions/supply/actionsInformSalesSupply"
import "./InfGastosAndVtas.css"
import Select from "react-select";
import filterSumaValues from "../../functions/filterSumaValues";
import filterDataGraphicServ from "../../functions/filterDataGraphicServ";
import filterDataGraphicSales from "../../functions/filterDataGraphicSales";


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
  const companySelectedMenu = useSelector((state) => state.company.companySelected);
  const listGtosAnio = useSelector((state) => state.bills.gtosxAnio);

  const listServByAnio = useSelector((state) => state.sales.vtasxAnio);
  const listSalesByYear = useSelector((state) => state.salesSupply.listSalesSuppliesByYear)
  const [selectedAnio, setSelectedAnio] = useState();
  const [stateGtosValue, setStateGtosValue] = useState([]);

  const [stateServValue, setStateServValue] = useState([]);
  const [stateVtasValue, setStateVtasValue] = useState([]);

  const ListAños = [
    { value: 2020, label: 2020 },
    { value: 2021, label: 2021 },
    { value: 2022, label: 2022 },
    { value: 2023, label: 2023 },
    { value: 2024, label: 2024 },
    { value: 2025, label: 2025 },
    { value: 2026, label: 2026 },
  ];


  const dispatch = useDispatch();

  useEffect(() => {
    if (companySelectedMenu) {
      let now = new Date();
      let anio = now.getFullYear();
      setSelectedAnio(anio);
      dispatch(gtosXanio(companySelectedMenu._id, anio));
      dispatch(vtasxA(companySelectedMenu._id, anio));
      dispatch(informSalesSupplyByYear(companySelectedMenu._id, anio))
    }
  }, [companySelectedMenu, dispatch]);

  useEffect(() => {
    if (listGtosAnio) {
      const arrayData = filterSumaValues(listGtosAnio);
      setStateGtosValue(sumaValueFilteredXmes(arrayData));
    } else {
      setStateGtosValue([])
    }
  }, [listGtosAnio, selectedAnio]);



  useEffect(() => {
    var arrayData = []
    if (listServByAnio) {
      arrayData = filterDataGraphicServ(listServByAnio.totalByMonth);
      setStateServValue(arrayData);
    } else {
      setStateServValue([])
    }
  }, [listServByAnio, selectedAnio]);

  useEffect(() => {
    var arrayData = []
    if (listSalesByYear) {
      arrayData = filterDataGraphicSales(listSalesByYear.monthlyTotals);
      setStateVtasValue(arrayData);
    } else {
      setStateVtasValue([])
    }
  }, [listSalesByYear, selectedAnio]);


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

  //GRAPHICS BILLS
  /*
  data: arrayData
  arrayData=[1000, 2000, 1500, 3000, 2500]
  */
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

  //GRAPHICS SERVICES
  const dataServ = {
    labels: stateServValue.map((item) => item.mesString),
    datasets: [
      {
        label: "Ventas",
        data: stateServValue.map((item) => item.totalValorServ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  //GRAPHICS SALES
  const dataSales = {
    labels: stateVtasValue.map((item) => item.mesString),
    datasets: [
      {
        label: "Ventas",
        data: stateVtasValue.map((item) => item.totalSale),
        backgroundColor: "rgba(20, 63, 22, 0.6)",
        borderColor: "rgba(20, 63, 22, 0.6)",
      },
    ],
  };


  //GRAPHICS SALES, SERVICES AND BILLS
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
        label: "Servicios",
        data: stateServValue.map((item) => item.totalValorServ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Ventas",
        data: stateVtasValue.map((item) => item.totalSale),
        backgroundColor: "rgba(20, 63, 22, 0.6)",
        borderColor: "rgba(20, 63, 22, 0.6)",
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
        text: "",
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

  const ChangeAnio = (value) => {
    setSelectedAnio(value.value);
    SearchDataBackend(value.value);
  };

  function SearchDataBackend(anio) {
    dispatch(gtosXanio(companySelectedMenu._id, anio));
    dispatch(vtasxA(companySelectedMenu._id, anio));
    dispatch(informSalesSupplyByYear(companySelectedMenu._id, anio))
  }

  return (
    <div className="container-lg mb-4">
      <Select
        placeholder="Seleccione Año"
        options={ListAños}
        onChange={ChangeAnio}
        className="classSelect instrument-serif-regular"
      />

      <div className="titInf">
        <h5>{selectedAnio}</h5>
      </div>

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
          <>
            <div className="titGral">
              <h2>Servicios {selectedAnio}</h2>
            </div>
            <Bar data={dataServ} options={options} />
            <div className="titGral">
              <h2>Ventas {selectedAnio}</h2>
            </div>
            <Bar data={dataSales} options={options} />
          </>
        ) : (

          <Line data={dataVyG} options={options} />
        )}

      </div>
    </div>
  );
};

export default InfGastosAndVtas;
