import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  CalendarPlus,
  ArrowUpDown,
  Pencil,
  Trash2,
  HandCoins,
  FileText,
} from "lucide-react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import ModalAddVtas from "../Modal/ModalAddVtas";
import ModalAddFicha from "../Modal/ModalAddFicha";

import { useSelector, useDispatch } from "react-redux";

import {
  deleteTurno,
  getTurnos,
} from "../../reducer/actions/actionsTurnos";

import ModalEditTurn from "../Modal/ModalEditTurn";
import ModalEditTurnMedicine from "../Modal/ModalEditTurnMedicine";
import ModalDescription from "../Modal/ModalDescription";

const TableTurns = ({ order, setInfo, stateInfo, setOrder }) => {
  const dispatch = useDispatch();

  const companySelectedMenu = useSelector(
    (state) => state.company.companySelected
  );

  const listTurnos = useSelector(
    (state) => state.turns.allTurnos
  );

  const [stateCategory, setStateCategory] =
    useState("Cliente");

  const isMedicine = useSelector(
    (state) => state.company.categoryMedicine
  );

  const personCategory = useSelector(
    (state) => state.company.typePerson
  );

  const [newVentas, setNewVentas] = useState(false);

  const [booleanClose, setBooleanClose] =
    useState(false);

  const [booleanCloseMedicine, setBooleanCloseMedicine] =
    useState(false);

  const [openCargaFich, setOpenCargaFich] =
    useState(false);

  const [stateDataEdit, setStateDataEdit] =
    useState();

  const [stateNewFicha, setStateNewFicha] =
    useState();

  const [stateNewVta, setStateNewVta] =
    useState();

  const [dataDescription, setDataDescription] =
    useState({});

  useEffect(() => {
    if (companySelectedMenu) {
      if (companySelectedMenu.category) {
        setStateCategory(
          companySelectedMenu.category
        );
      }
    }
  }, [companySelectedMenu, dispatch]);

  const MySwal = withReactContent(Swal);

  function convertDay(date) {
    const day = new Date(date).getDay();

    const days = [
      "Dom",
      "Lun",
      "Mar",
      "Mi",
      "Jue",
      "Vie",
      "Sab",
    ];

    return days[day];
  }

  function handleDelete(e, props) {
    MySwal.fire({
      title: "¿Estas seguro?",
      text: "¡El turno será borrado de la base de datos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1ABD53",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTurno(props.idTurn)).then(() => {
          dispatch(
            getTurnos(companySelectedMenu._id)
          );
        });

        MySwal.fire({
          title: "Turno borrado",
          text: "El Turno se borró correctamente.",
          icon: "success",
          confirmButtonColor: "#00A0D2",
        });
      }
    });
  }

  function handleEditTurn(e, turn) {
    setBooleanClose(!booleanClose);
    setStateDataEdit(turn);
  }

  function handleEditMedicine(e, turn) {
    setBooleanCloseMedicine(
      !booleanCloseMedicine
    );

    setStateDataEdit(turn);
  }

  function handleCargaFicha(e, turn) {
    setStateNewFicha(turn);

    setOpenCargaFich(!openCargaFich);
  }

  function handleVentas(e, turn) {
    setStateNewVta(turn);

    setNewVentas(!newVentas);
  }

  function handleOrder(e) {
    setOrder(!order);

    const listOrder = listTurnos;

    const arrayOrder =
      order === true
        ? listOrder.sort(function (a, b) {
            const aux1 =
              a.date.toLocaleLowerCase();

            const aux2 =
              b.date.toLocaleLowerCase();

            if (aux1 > aux2) {
              return 1;
            }

            if (aux2 > aux1) {
              return -1;
            }

            return 0;
          })
        : listOrder.sort(function (a, b) {
            const aux1a =
              a.date.toLocaleLowerCase();

            const aux2b =
              b.date.toLocaleLowerCase();

            if (aux1a > aux2b) {
              return -1;
            }

            if (aux2b > aux1a) {
              return 1;
            }

            return 0;
          });

    return {
      ...listTurnos,
      listTurnos: arrayOrder,
    };
  }

  function handleInfo(e, props) {
    e.preventDefault();

    setInfo(!stateInfo);

    setDataDescription({
      _id: props._id,
      name: props.name,
      phone: props.phone,
      notesTurn: props.notesTurn,
      email: props.email,
    });
  }

  function convertDateFormat(date) {
    let info = 0;

    if (date) {
      info = date
        .split("-")
        .reverse()
        .join("/");
    }

    return info;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.4,
        }}
        className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-6"
      >
        {/* HEADER */}

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
            <CalendarPlus
              className="w-4 h-4 text-white"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* TABLE */}

        <div className="p-2 overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-zinc-950">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  {isMedicine
                    ? "Paciente"
                    : "Mascota"}
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Cliente
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  <button
                    onClick={(e) =>
                      handleOrder(e)
                    }
                    className="flex items-center gap-2"
                  >
                    Fecha

                    <ArrowUpDown
                      className={`w-4 h-4 ${
                        order
                          ? "text-orange-400"
                          : "text-cyan-300"
                      }`}
                    />
                  </button>
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Hora
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Opciones
                </th>

                <th className="px-5 py-3.5 text-center text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Aviso
                </th>
              </tr>
            </thead>

            <tbody>
              {listTurnos
                ? listTurnos.map(
                    (turn, index) => (
                      <motion.tr
                        key={turn._id}
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          delay:
                            0.35 +
                            index * 0.05,
                        }}
                        className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                      >
                        {/* MASCOTA */}

                        <td
                          onClick={(e) =>
                            handleInfo(
                              e,
                              turn
                            )
                          }
                          title={`Informe ${personCategory}`}
                          className="px-5 py-4 text-sm font-medium text-zinc-800 cursor-pointer"
                        >
                          {isMedicine &&
                          turn.name ? (
                            turn.name
                          ) : !turn.name ? (
                            <span className="text-red-500">
                              Paciente NO
                              Asignado
                            </span>
                          ) : turn.nameDog ? (
                            turn.nameDog
                          ) : (
                            <span className="text-red-500">
                              Paciente NO
                              Asignado
                            </span>
                          )}
                        </td>

                        {/* CLIENTE */}

                        <td className="px-5 py-4 text-sm text-zinc-500">
                          {turn.name || "-"}
                        </td>

                        {/* FECHA */}

                        <td className="px-5 py-4 text-sm text-zinc-500">
                          {convertDateFormat(
                            turn.date
                          )}{" "}
                          <span className="ml-2 text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md">
                            {convertDay(
                              turn.date
                            )}
                          </span>
                        </td>

                        {/* HORA */}

                        <td className="px-5 py-4 text-sm text-zinc-500">
                          {turn.time}
                        </td>

                        {/* OPCIONES */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {/* VENTAS */}

                            {turn.nameDog ? (
                              <button
                                onClick={(e) =>
                                  handleVentas(
                                    e,
                                    turn
                                  )
                                }
                                className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all"
                              >
                                <HandCoins className="w-4 h-4" />
                              </button>
                            ) : (
                              <button className="w-9 h-9 rounded-xl border border-red-200 text-red-500 flex items-center justify-center cursor-not-allowed">
                                <HandCoins className="w-4 h-4" />
                              </button>
                            )}

                            {/* EDIT */}

                            {isMedicine ? (
                              <button
                                onClick={(e) =>
                                  handleEditMedicine(
                                    e,
                                    turn
                                  )
                                }
                                className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={(e) =>
                                  handleEditTurn(
                                    e,
                                    turn
                                  )
                                }
                                className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                            )}

                            {/* DELETE */}

                            <button
                              data-testid="btn-eliminar"
                              onClick={(e) =>
                                handleDelete(
                                  e,
                                  {
                                    idTurn:
                                      turn._id,
                                    index:
                                      index,
                                  }
                                )
                              }
                              className="w-9 h-9 rounded-xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {/* FICHA */}

                            {stateCategory &&
                            stateCategory ===
                              "peluAndVet" &&
                            turn.nameDog ? (
                              <button
                                onClick={(e) =>
                                  handleCargaFicha(
                                    e,
                                    turn
                                  )
                                }
                                aria-label="AddFicha"
                                className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                            ) : stateCategory ===
                                "peluAndVet" &&
                              !turn.nameDog ? (
                              <button
                                disabled
                                aria-label="AddFicha"
                                className="w-9 h-9 rounded-xl border border-red-200 text-red-500 flex items-center justify-center"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                            ) : null}
                          </div>
                        </td>

                        {/* NOTIFICACION */}

                        <td className="px-5 py-4 text-center">
                          {turn.isNotifications ? (
                            <div className="flex justify-center">
                              <div className="w-5 h-5 rounded-full bg-emerald-600 animate-pulse" />
                            </div>
                          ) : (
                            <span className="text-zinc-700">
                              —
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    )
                  )
                : null}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* MODALS */}

      <ModalEditTurn
        booleanClose={booleanClose}
        setBooleanClose={setBooleanClose}
        stateDataEdit={stateDataEdit}
        setStateDataEdit={setStateDataEdit}
        nameClient={
          stateDataEdit &&
          stateDataEdit.name
        }
        nameDog={
          stateDataEdit &&
          stateDataEdit.nameDog
        }
      />

      <ModalEditTurnMedicine
        booleanCloseMedicine={
          booleanCloseMedicine
        }
        setBooleanCloseMedicine={
          setBooleanCloseMedicine
        }
        stateDataEdit={stateDataEdit}
        setStateDataEdit={setStateDataEdit}
        nameClient={
          stateDataEdit &&
          stateDataEdit.name
        }
      />

      <ModalAddFicha
        openState={openCargaFich}
        setOpenState={setOpenCargaFich}
        stateDataFicha={stateNewFicha}
      />

      <ModalAddVtas
        state={newVentas}
        setState={setNewVentas}
        stateNewVta={stateNewVta}
        setStateNewVta={setStateNewVta}
      />

      <ModalDescription
        nameClient={dataDescription.name}
        phone={dataDescription.phone}
        notesTurn={
          dataDescription.notesTurn
        }
        email={dataDescription.email}
        setStateModal={setInfo}
        stateModal={stateInfo}
      />
    </>
  );
};

export default TableTurns;