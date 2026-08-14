import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet, CreditCard, Banknote, ArrowLeftRight, Calendar } from "lucide-react";
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
import DashboardInformesSale from "./DashboardInformesSale";
import { ElevenLabsChat } from "./ElevenLabsChat.tsx"
import MetricsOverview from "./MetricsOverview.jsx"
import { Package, DollarSign } from "lucide-react";
import convertNum from "../../functions/convertNum";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
);

const InfGastosAndVtas = () => {
  const companySelectedMenu = useSelector((state) => state.company.companySelected);
  const listGtosAnio = useSelector((state) => state.bills.gtosxAnio);
  const listServByAnio = useSelector((state) => state.sales.vtasxAnio);
  const listSalesByYear = useSelector((state) => state.salesSupply.listSalesSuppliesByYear)
  console.log(listServByAnio, "servicios")

  const isIndumentary = useSelector((state) => state.company.categoryIndumentary)
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

  const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


  const dispatch = useDispatch();

  useEffect(() => {
    if (companySelectedMenu) {
      let now = new Date();
      let anio = now.getFullYear();
      setSelectedAnio(anio);
      dispatch(gtosXanio(companySelectedMenu._id, anio));
      dispatch(informSalesSupplyByYear(companySelectedMenu._id, anio))
      if (!isIndumentary) {
        dispatch(vtasxA(companySelectedMenu._id, anio));
      }
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

  // ── Data para recharts ──
  const dataGastos = MESES.map((mes, i) => ({ mes, Gastos: stateGtosValue[i] || 0 }));
  const dataServ = stateServValue.map((item) => ({ mes: item.mesString, Ventas: item.totalValorServ }));
  const dataSales = stateVtasValue.map((item) => ({ mes: item.mesString, Ventas: item.totalSale }));
  const dataVyG = MESES.map((mes, i) => ({
    mes,
    Gastos: stateGtosValue[i] || 0,
    Servicios: stateServValue[i]?.totalValorServ || 0,
    Ventas: stateVtasValue[i]?.totalSale || 0,
  }));

  const tabs = [
    { id: "ventas", label: "Ventas", active: activeVentas, onClick: changeVisibleV, icon: TrendingUp },
    { id: "gastos", label: "Gastos", active: activeGastos, onClick: changeVisibleG, icon: TrendingDown },
    { id: "vtasgastos", label: "Ventas y Gastos", active: activeVtasGtos, onClick: changeVisibleVyG, icon: ArrowLeftRight },
  ];

  function ChartCard({ title, children }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-2xl p-1 sm:p-1"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-foreground rounded-full" />
          <h3 className="text-lg font-black text-foreground tracking-tight">{title}</h3>
        </div>
        {children}
      </motion.div>
    );
  }


  function StatRow({ icon: Icon, label, value, accent }) {
    return (
      <div className="flex items-center justify-between py-3 border-b border-border last:border-0 group">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-sm text-muted-foreground tracking-wide">{label}</span>
        </div>
        <span className="text-sm font-bold text-foreground tabular-nums">{value}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-2 sm:p-10">

      <div className="w-full max-w-6xl">

        <div className="text-center mb-10 pt-3">
          <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-1">
            Vista previa
          </p>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            Informes de Gastos y Ventas
          </h1>
        </div>


        <div className="w-full max-w-6xl mx-auto space-y-6">
          {/* ── Header + Year selector ── */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >

            <div>
              <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-1">
                Informes financieros
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Gastos y Ventas
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-muted-foreground shrink-0" />

              <Select
                placeholder="Seleccione Año"
                options={ListAños}
                className="classSelect instrument-serif-regular"
                onChange={ChangeAnio}
              />
            </div>

          </motion.div>


          {/* ── Tabs BUTTONS── */}
          <div className="flex gap-2 sm:gap-3 flex-wrap">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`
    relative inline-flex items-center gap-2.5 px-5 py-2.5 
    rounded-xl text-xs font-semibold tracking-wide 
    transition-all duration-300 
    ${tab.active
                      ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }
  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ── Charts + Total vendido (lado a lado) ── */}

          <AnimatePresence mode="wait">
            {activeGastos ? (
              <motion.div
                key="gastos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-5"
              >
                <div className="lg:col-span-2">
                  <ChartCard title={`Gastos ${selectedAnio}`}>
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={dataGastos} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "12px" }}
                          labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        <Bar dataKey="Gastos" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
                <div className="lg:col-span-1">
                  <ChartCard title="Resumen del año">
                    <StatRow icon={Wallet} label="Total Gastos" value={convertNum(stateGtosValue.reduce((a, b) => a + b, 0))} accent="bg-red-500/10 text-red-400" />
                    <StatRow icon={Calendar} label="Año" value={selectedAnio} accent="bg-muted text-muted-foreground" />
                  </ChartCard>
                </div>
              </motion.div>
            ) : activeVentas ? (
              <motion.div
                key="ventas"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >

                {/* GRAFICO SERVICIOS Y TOTAL SERVICIOS */}
                {!isIndumentary && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* GRAFICO SERVICIOS */}
                    <div className=" p-2 lg:col-span-2">
                      <ChartCard title={`Servicios ${selectedAnio}`}>
                        <ResponsiveContainer width="100%" height={280}>
                          <BarChart data={dataServ} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                            <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "12px" }} />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />
                            <Bar dataKey="Ventas" fill="hsl(174 72% 56%)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartCard>
                    </div>

                    {/* TOTAL SERVICIOS */}
                    <div className="lg:col-span-1">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-card border border-border rounded-2xl p-1 sm:p-3 h-full"
                      >
                        <div className="flex items-center gap-3 mb-6 pl-2 pt-2">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                            <Wallet className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">Total Servicios</p>
                            {/* en el backend se servicios no trae el año por tanto se ocupa el state de sales */}
                            <p className="text-xs text-muted-foreground">Año {listSalesByYear?.year}</p>
                          </div>
                        </div>

                        <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums mb-6 p-2">
                          {convertNum(listServByAnio?.totalByYear?.totalValorServ ?? 0)}
                        </p>

                        <div className="space-y-0 p-2">
                          <StatRow icon={ArrowLeftRight} label="Transferencia" value={convertNum(listServByAnio?.totalByYear?.totalTransferencia ?? 0)} accent="bg-blue-500/10 text-blue-400" />
                          <StatRow icon={CreditCard} label="Tarjeta" value={convertNum(listServByAnio?.totalByYear?.totalTarjeta
                            ?? 0)} accent="bg-purple-500/10 text-purple-400" />
                          <StatRow icon={Banknote} label="Efectivo" value={convertNum(listServByAnio?.totalByYear?.totalEfectivo ?? 0)} accent="bg-emerald-500/10 text-emerald-400" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* GRAFICO VENTAS Y TOTAL VENDIDO */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* ── Gráfico + Total vendido lado a lado ── */}
                  <div className=" p-2 lg:col-span-2">
                    <ChartCard title={`Ventas ${selectedAnio}`}>
                      <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={dataSales} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                          <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "12px" }} />
                          <Legend wrapperStyle={{ fontSize: "12px" }} />
                          <Bar dataKey="Ventas" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartCard>
                  </div>

                  {/* Total Vendido card */}
                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-card border border-border rounded-2xl p-1 sm:p-3 h-full"
                    >
                      <div className="flex items-center gap-3 mb-6 pl-2 pt-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                          <Wallet className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">Total Vendido</p>
                          <p className="text-xs text-muted-foreground">Año {listSalesByYear?.year}</p>
                        </div>
                      </div>

                      <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums mb-6 p-2">
                        {convertNum(listSalesByYear?.totals?.totalSale ?? 0)}
                      </p>

                      <div className="space-y-0 p-2">
                        <StatRow icon={ArrowLeftRight} label="Transferencia" value={convertNum(listSalesByYear?.totals?.totalPaymentMethodTransferencia ?? 0)} accent="bg-blue-500/10 text-blue-400" />
                        <StatRow icon={CreditCard} label="Tarjeta" value={convertNum(listSalesByYear?.totals?.totalPaymentMethodTarjeta ?? 0)} accent="bg-purple-500/10 text-purple-400" />
                        <StatRow icon={Banknote} label="Efectivo" value={convertNum(listSalesByYear?.totals?.totalPaymentMethodEfectivo ?? 0)} accent="bg-emerald-500/10 text-emerald-400" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vtasgastos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <ChartCard title={`Ventas y Gastos ${selectedAnio}`}>
                  <ResponsiveContainer width="100%" height={380}>
                    <LineChart data={dataVyG} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="mes" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "12px" }} />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Line type="monotone" dataKey="Gastos" stroke="hsl(0 84% 60%)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Servicios" stroke="hsl(174 72% 56%)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Ventas" stroke="hsl(142 71% 45%)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* codigo deprecado no se elimina hasta confirmarlo */}
          {/* 
          <div>
            {activeGastos ? (
              <Bar data={dataG} options={options} />
            ) : activeVentas ? (
              <>
                {!isIndumentary ?
                  <>
                    <div className="titGral">
                      <h2>Servicios {selectedAnio}</h2>
                    </div>
                    <Bar data={dataServ} options={options} />

                  </> : null
                }
                <Bar data={dataSales} options={options} />

               
              </>
            ) : (

              <Line data={dataVyG} options={options} />
            )}

          </div>  */}

          
           <MetricsOverview />
          


        </div>

      </div>

    </div>
  );
};

export default InfGastosAndVtas;
