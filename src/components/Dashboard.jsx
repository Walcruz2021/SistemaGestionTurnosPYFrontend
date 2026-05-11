import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ShoppingCart,
  UserPlus,
  Users,
  PawPrint,
  CalendarPlus,
  TrendingUp,
  Dog,
  Scale,
  User,
  FileText,
  ArrowUpDown,
  ChevronRight,
} from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSortAlphaDown,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

import { searchHistorialDog } from "../reducer/actions/actionsDog";
import { getClients } from "../reducer/actions/actionsClients";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Link } from "react-router-dom";
import Select from "react-select";

import ModalAddDog from "../components/Modal/ModalAddDog";
import ModalAddClient from "./Modal/ModalAddClient";
import ModalEditTurn from "../components/Modal/ModalEditTurn";
import ModalAddTurn from "../components/Modal/ModalAddTurn";

import TableTurns from "./Turns/TableTurns";

import {
  verificationConection,
} from "../reducer/actions/actions";

import convertNum from "../functions/convertNum";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

function Dashboard() {

  const companySelectedMenu = useSelector(
    (state) => state.company.companySelected
  );

  const listadoTurnos = useSelector(
    (state) => state.turns.allTurnos
  );

  const listClients = useSelector(
    (state) => state.client.allClients
  );

  const vtaxClient = useSelector(
    (state) => state.pets.vtaxClient
  );

  const isMedicine = useSelector(
    (state) => state.company.categoryMedicine
  );

  const personCategory = useSelector(
    (state) => state.company.typePerson
  );

  const userMongo = useSelector(
    (state) => state.user.userEmailSearch
  );

  const loginUser = useSelector(
    (state) => state.user.user
  );

  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedDog, setSelectedDog] = useState(null);

  const [newTurno, setNewTurno] = useState(false);

  const [newClient, setNewClient] = useState(false);

  const [order, setOrder] = useState(false);

  const [stateInfo, setInfo] = useState(false);

  const [stateClientSelected, setStateClientSeleted] =
    useState();

  const [editTurn, setEditTurn] = useState(false);

  const [stateAddDog, setStateAddDog] = useState(false);

  const [stateCategory] = useState("Cliente");

  useEffect(() => {
    if (companySelectedMenu) {
      dispatch(getClients(companySelectedMenu._id));
    }
  }, [companySelectedMenu]);

  useEffect(() => {
    if (loginUser) {
      setIsLoading(false);
    }
  }, [loginUser]);

  useEffect(() => {
    let interval;

    const checkConnection = async () => {
      try {
        const response = await dispatch(
          verificationConection()
        );

        if (response) {
          setIsLoading(false);
          clearInterval(interval);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkConnection();

    interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const ModalAddDogActive = () => {
    setStateAddDog(!stateAddDog);
  };

  const Listdogs = [];

  if (listadoTurnos) {
    listadoTurnos.map((data) => {
      const optionDog = {
        valueIdDog: data.idDog,
        label: data.nameDog,
        idClient: data.Client,
      };

      Listdogs.push(optionDog);

      return Listdogs;
    });
  }

  const ChangeDog = (data) => {
    setSelectedDog(data.valueIdDog);

    setStateClientSeleted(data.idClient);

    SearchDog(data.valueIdDog);
  };

  function SearchDog(idDog) {
    dispatch(searchHistorialDog(idDog));
  }

  function handleOrderHistDog() {

    setOrder(!order);

    const listOrder = vtaxClient.data.vta;

    order === true
      ? listOrder.sort(function (a, b) {
        const aux1 = a.date.toLocaleLowerCase();
        const aux2 = b.date.toLocaleLowerCase();

        if (aux1 > aux2) {
          return 1;
        }

        if (aux2 > aux1) {
          return -1;
        }

        return 0;
      })
      : listOrder.sort(function (a, b) {
        const aux1a = a.date.toLocaleLowerCase();
        const aux2b = b.date.toLocaleLowerCase();

        if (aux1a > aux2b) {
          return -1;
        }

        if (aux2b > aux1a) {
          return 1;
        }

        return 0;
      });
  }

  function convertDay(date) {
    const day = new Date(date).getDay();

    if (day === 0) return "Lun";
    if (day === 1) return "Mar";
    if (day === 2) return "Mi";
    if (day === 3) return "Jue";
    if (day === 4) return "Vie";
    if (day === 5) return "Sab";

    return "Dom";
  }

  function convertDateFormat(date) {
    let info = 0;

    if (date) {
      info = date.split("-").reverse().join("/");
    }

    return info;
  }

  const messageClient = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Debe Ingresar un ${personCategory}`,
    });
  };

  const openHistorial = () => {

    localStorage.setItem(
      "historialData",
      JSON.stringify(stateClientSelected)
    );

    window.open(
      "/historialPet",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const addTurn = () => {

    if (
      userMongo &&
      userMongo.data.findUser.pay === false &&
      listadoTurnos &&
      listadoTurnos.length >= 3
    ) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Para turnos ilimitados debe pagar PREMIUM!",
      });

    } else {

      setNewTurno(!newTurno);

    }
  };

  const ACTION_CARDS = [
    {
      id: "compras",
      label: "Compras",
      sub: "Gestión de insumos",
      icon: ShoppingCart,
      action: "/compraInsumos",
      type: "link",
    },

    {
      id: "cliente",
      label: "Cliente",
      sub: "Nuevo cliente",
      icon: UserPlus,
      action: () => setNewClient(!newClient),
      type: "button",
    },

    {
      id: "clientes",
      label: "Clientes",
      sub: "Ver listado",
      icon: Users,
      action: "/listClient",
      type: "link",
    },

    {
      id: "mascota",
      label: "Mascota",
      sub: "Agregar mascota",
      icon: PawPrint,
      action: listClients
        ? ModalAddDogActive
        : messageClient,
      type: "button",
      hidden: isMedicine,
    },

    {
      id: "turno",
      label: "Turno",
      sub: "Nuevo turno",
      icon: CalendarPlus,
      action: listClients
        ? addTurn
        : messageClient,
      type: "button",
    },

    {
      id: "ventas",
      label: "Ventas",
      sub: "Registrar venta",
      icon: TrendingUp,
      action: "/addVtas",
      type: "link",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center">

        <div className="w-16 h-16 border-4 border-zinc-300 border-t-black rounded-full animate-spin" />

        <p className="mt-6 text-zinc-500 tracking-wide">
          Cargando sistema...
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* TOPBAR */}

      <div className="border-b border-zinc-200 bg-white px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-30">

        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center">
            <PawPrint className="w-4 h-4 text-white" />
          </div>

          <span className="font-bold text-zinc-900 tracking-tight text-lg">
            Sistema PY
          </span>

        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">

          <div className="w-2 h-2 rounded-full bg-emerald-400" />

          Sistema en línea

        </div>
      </div>

      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >

          <p className="text-xs uppercase tracking-widest text-zinc-400 mb-2 font-medium">
            Panel de control
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-950">
            Dashboard
          </h1>

          <p className="text-zinc-500 mt-2 text-base">
            Administrá clientes, mascotas, ventas y turnos desde un solo lugar.
          </p>

        </motion.div>

        <div className="border-t border-zinc-200 mb-8" />

        {/* ACTION CARDS */}

        <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-4">
          Acciones rápidas
        </p>

        <div className="not-bootstrap">

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">

            {ACTION_CARDS
              .filter((card) => !card.hidden)
              .map((card, i) => {

                const Icon = card.icon;

                const content = (
                  <motion.div
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
              relative
              overflow-hidden
              group
              bg-gray
              hover:bg-black
              border
              border-zinc-200
              hover:border-black
              rounded-2xl

              h-[140px]
              min-h-[140px]

              p-4
              cursor-pointer
              transition-all
              duration-300
              hover:shadow-2xl

              flex
              flex-col
              justify-between
            "
                  >

                    {/* CONTENIDO */}
                    <div className="relative z-10 flex flex-col h-full">

                      {/* ICON */}
                      <div className="w-9 h-9 rounded-xl  group-hover:bg-white/10 flex items-center justify-center mb-3 transition-colors duration-300">

                        <Icon
                          className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors duration-300"
                          strokeWidth={1.8}
                        />

                      </div>

                      {/* TITULO */}
                      <div>

                        <h3 className="text-zinc-900 group-hover:text-white font-semibold text-sm transition-colors duration-300">
                          {card.label}
                        </h3>

                        <p className="text-zinc-500 group-hover:text-zinc-300 text-[11px] leading-tight mt-1 transition-colors duration-300 no-underline">
                          {card.sub}
                        </p>

                      </div>

                      {/* FLECHA */}
                      <div className="flex justify-end mt-auto">

                        <ChevronRight
                          className="
                    w-4
                    h-4
                    text-zinc-300
                    group-hover:text-white
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                  "
                        />

                      </div>

                    </div>

                  </motion.div>
                );

                if (card.type === "link") {
                  return (
                    <Link
                      key={card.id}
                      to={card.action}
                      className="block w-full no-underline"
                      style={{ textDecoration: "none" }}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={card.id}
                    onClick={card.action}
                    className="w-full text-left bg-transparent border-0"
                  >
                    {content}
                  </button>
                );
              })}
          </div>
        </div>

        {/* MODALS */}

        <ModalAddClient
          state={newClient}
          setState={setNewClient}
        />

        <ModalAddDog
          stateAddDog={stateAddDog}
          setStateAddDog={setStateAddDog}
        />

        <ModalAddTurn
          stateAddTurn={newTurno}
          setStateAddTurn={setNewTurno}
        />

        <ModalEditTurn />

        {/* TURNOS */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-6"
        >

          <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                Turnos
              </h2>

              <p className="text-zinc-400 text-sm mt-0.5">
                Gestión completa de turnos
              </p>

            </div>

            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

              <CalendarPlus className="w-4 h-4 text-white" />

            </div>

          </div>

          <div className="p-6 overflow-x-auto">

            <TableTurns
              setOrder={setOrder}
              order={order}
              setEditTurn={setEditTurn}
              editTurn={editTurn}
              setInfo={setInfo}
              stateInfo={stateInfo}
            />

          </div>

        </motion.div>

        {/* HISTORIAL */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-white border border-zinc-200 rounded-2xl overflow-hidden"
        >

          <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                Historial de Mascota
              </h2>

              <p className="text-zinc-400 text-sm mt-0.5">
                Consultá el historial de servicios por mascota
              </p>

            </div>

            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

              <FileText className="w-4 h-4 text-white" />

            </div>

          </div>

          <div className="p-6">

            {!stateInfo && !newTurno && !newClient ? (
              <div className="mb-6 max-w-sm">

                <label className="block text-xs uppercase tracking-widest text-zinc-400 font-medium mb-2">
                  Buscar mascota
                </label>

                <Select
                  placeholder="Seleccioná una mascota..."
                  options={Listdogs}
                  onChange={ChangeDog}
                  classNamePrefix="react-select"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />

              </div>
            ) : null}

            <AnimatePresence>

              {selectedDog &&
                vtaxClient.status === 200 ? (

                <motion.div
                  key="historial"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >

                  {/* STAT CARDS */}

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">

  {/* MASCOTA */}
  <div className="bg-zinc-950 rounded-xl p-3 flex flex-col items-center text-center gap-1.5 min-h-[110px] justify-center">

    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
      <Dog className="w-4 h-4 text-white" />
    </div>

    <p className="text-zinc-400 text-[10px] uppercase tracking-[2px]">
      Mascota
    </p>

    <h3 className="text-white font-medium text-xs leading-tight">
      {vtaxClient.data.vta[0].Dog.nameDog}
    </h3>

  </div>

  {/* TAMAÑO */}
  <div className="bg-zinc-950 rounded-xl p-3 flex flex-col items-center text-center gap-1.5 min-h-[110px] justify-center">

    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
      <Scale className="w-4 h-4 text-white" />
    </div>

    <p className="text-zinc-400 text-[10px] uppercase tracking-[2px]">
      Tamaño
    </p>

    <h3 className="text-white font-medium text-xs leading-tight">
      {vtaxClient.data.vta[0].Dog.tamaño}
    </h3>

  </div>

  {/* CLIENTE */}
  <div className="bg-zinc-950 rounded-xl p-3 flex flex-col items-center text-center gap-1.5 min-h-[110px] justify-center">

    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
      <User className="w-4 h-4 text-white" />
    </div>

    <p className="text-zinc-400 text-[10px] uppercase tracking-[2px]">
      Cliente
    </p>

    <h3 className="text-white font-medium text-xs leading-tight">
      {vtaxClient.data.vta[0].name}
    </h3>

  </div>

  {/* NOTA */}
  <div className="bg-zinc-950 rounded-xl p-3 flex flex-col items-center text-center gap-1.5 min-h-[110px] justify-center">

    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
      <FileText className="w-4 h-4 text-white" />
    </div>

    <p className="text-zinc-400 text-[10px] uppercase tracking-[2px]">
      Nota
    </p>

    <h3 className="text-white font-medium text-xs leading-tight line-clamp-2">
      {vtaxClient.data.vta[0].Dog.notaP
        ? vtaxClient.data.vta[0].Dog.notaP
        : "Sin nota"}
    </h3>

  </div>

</div>

                  {/* TABLA HISTORIAL */}

                  <div className="p-6 overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                      <thead>

                        <tr className="bg-zinc-950">

                          <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                            Valor
                          </th>

                          <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">

                            <span className="flex items-center gap-1.5">

                              Fecha

                              <FontAwesomeIcon
                                onClick={handleOrderHistDog}
                                icon={faSortAlphaDown}
                                className="cursor-pointer"
                              />

                            </span>

                          </th>

                          <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                            Nota
                          </th>

                          <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                            Servicio
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {vtaxClient.data.vta.map((vta, i) => (

                          <motion.tr
                            key={vta._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.06 }}
                            className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                          >

                            <td className="px-5 py-4 text-sm font-medium text-zinc-700">
                              {convertNum(vta.valorServ)}
                            </td>

                            <td className="px-5 py-4 text-sm text-zinc-500">

                              {convertDateFormat(vta.date)}

                              <span className="ml-2 text-xs bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded-md">
                                {convertDay(vta.date)}
                              </span>

                            </td>

                            <td className="px-5 py-4 text-sm text-zinc-500">
                              {vta.notesTurn}
                            </td>

                            <td className="px-5 py-4">

                              <span className="inline-block text-xs bg-zinc-950 text-white px-2.5 py-1 rounded-full font-medium">
                                {vta.tipoServ}
                              </span>

                            </td>

                          </motion.tr>
                        ))}

                      </tbody>

                    </table>

                  </div>

                </motion.div>

              ) : null}

            </AnimatePresence>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Dashboard;