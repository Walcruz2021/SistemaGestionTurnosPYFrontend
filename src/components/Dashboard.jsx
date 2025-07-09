import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { ClipLoader } from "react-spinners";
import {
  faSortAlphaDown,
  faPenSquare,
  faTrash,
  faHandHoldingUsd,
  faBone,
  faNoteSticky,
  faScaleBalanced,
  faShieldDog,
  faPerson,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { searchHistorialDog } from "../reducer/actions/actionsDog";

import { getTurnos, deleteTurno } from "../reducer/actions/actionsTurnos";
import { getClients } from "../reducer/actions/actionsClients";
import Swal from "sweetalert2";
import Modal from "./Modal/Modal";
import FormNewTurno from "./Formulario/FormNewTurno";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Select from "react-select";
import ModalDescription from "././Modal/ModalDescription";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { ButtonModal, CloseButton } from "../cssSyleComp/ModalStyles";
import ModalAddDog from "../components/Modal/ModalAddDog";
import "bootstrap/dist/css/bootstrap.css";
import "../css/cssGeneral.css";
import ModalAddClient from "./Modal/ModalAddClient";
import addClient2 from "../icons/addClientSmall.png";
import addPet from "../icons/addPet.png";
import iconAddTurn from "../icons/addTurn.png";
import iconClients from "../icons/listClients.png";
import ModalBoostrap from "react-bootstrap/Modal";
import TableTurns from "./TableTurns";
import ModalAddVtas from "../components/Modal/ModalAddVtas";
import ModalEditTurn from "../components/Modal/ModalEditTurn";
import ModalAddTurn from "../components/Modal/ModalAddTurn";
import carpetaMedica from "../icons/carpetaMedica.png";
import {
  listenToAuthChanges,
  verificationConection,
} from "../reducer/actions/actions";

function Dashboard() {
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const listadoTurnos = useSelector((state) => state.allTurnos);

  const listClients = useSelector((state) => state.allClients);
  const [stateListTurn, setListTurn] = useState([]);
  const [stateCategory, setStateCategory] = useState("");
  const vtaxClient = useSelector((state) => state.vtaxClient);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [selectedDog, setSelectedDog] = useState(null);
  //stateTunrno es una bandera que se modificara cada vez que se elimina un turno
  //se utiliza ya que cada vez que se elimina el turno para que se vea reflkejado el cambio se necesita cambiar algun estado o apretar un boton
  const [newTurno, setNewTurno] = useState(false);
  const [newDog, setNewDog] = useState(false);
  const [newClient, setNewClient] = useState(false);
  const [order, setOrder] = useState(false);
  const [stateInfo, setInfo] = useState(false);
  const [stateClientSelected, setStateClientSeleted] = useState();
  const [editTurn, setEditTurn] = useState(false);
  const [stateAddDog, setStateAddDog] = useState(false);
  const [inputState, setInputState] = useState({
    id: "",
    name: "",
    nameDog: "",
    phone: "",
    date: "",
    notesTurn: "",
    valorServ: "",
    idClient: "",
    notesCli: "",
    time: "",
    nameP: "",
    notaP: "",
    tipoServ: "",
    idDog: "",
    efectivo: "",
    transferencia: "",
    tarjeta: "",
    index: "",
    email: "",
  });
  const userMongo = useSelector((state) => state.userEmailSearch);
  const loginUser = useSelector((state) => state.user);

  const onTurnoAdded = () => {
    dispatch(getTurnos(companySelectedMenu._id));
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

  useEffect(() => {
    if (companySelectedMenu) {
      dispatch(getClients(companySelectedMenu._id));
      if (companySelectedMenu.category) {
        setStateCategory(companySelectedMenu.category);
      }
    }
  }, [companySelectedMenu]);

  useEffect(() => {
    if (loginUser) {
      setIsLoading(false);
    }
  }, [loginUser]);

  // ✅ Esperar la conexión a Mongo antes de mostrar la UI
  useEffect(() => {
    let interval;
    const checkConnection = async () => {
      try {
        const response = await dispatch(verificationConection());
        if (response) {
          setIsLoading(false);
          clearInterval(interval); // Si la conexión es exitosa, detenemos los intentos
        }
      } catch (error) {
        console.error("Error verificando conexión:", error);
      }
    };
    checkConnection();

    // Si el servidor no está disponible, intentamos cada 5 segundos
    interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [dispatch]);

  const [stateAddTurn, setStateAddTurn] = useState(false);

  const ModalAddDogActive = () => {
    setStateAddDog(!stateAddDog);
  };
  //ARRAY DE MASCOTAS PARA SELECT (HISTORIAL)
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

  const cliBusc = useSelector((state) => state.clientBusc);

  if (cliBusc.buscado) {
    const arrayIdClient = cliBusc.buscado.pedidos;
  }

  function SearchDog(idDog) {
    dispatch(searchHistorialDog(idDog));
  }

  function handleOrderHistDog(e) {
    setOrder(!order);
    //dispatch(orderTurnos(order));
    const listOrder = vtaxClient.data.vta;
    const arrayOrder =
      order === true
        ? listOrder.sort(function (a, b) {
            const aux1 = a.date.toLocaleLowerCase();
            const aux2 = b.date.toLocaleLowerCase();
            if (aux1 > aux2) {
              return 1;
            }
            if (aux2 > aux1) {
              return -1;
            } else return 0;
          })
        : // descendente
          listOrder.sort(function (a, b) {
            const aux1a = a.date.toLocaleLowerCase();
            const aux2b = b.date.toLocaleLowerCase();
            if (aux1a > aux2b) {
              return -1;
            }
            if (aux2b > aux1a) {
              return 1;
            } else return 0;
          });

    return {
      ...stateListTurn,
      stateListTurn: arrayOrder,
    };
  }

  function convertDay(date) {
    const day = new Date(date).getDay();
    if (day === 0) {
      return "Lun";
    } else if (day === 1) {
      return "Mar";
    } else if (day === 2) {
      return "Mi";
    } else if (day === 3) {
      return "Jue";
    } else if (day === 4) {
      return "Vie";
    } else if (day === 5) {
      return "Sab";
    } else return "Dom";
  }

  function convertDateFormat(date) {
    let info = 0;
    if (date) {
      info = date.split("-").reverse().join("/");
    }
    return info;
  }

  const handleClose = () => {
    setEditTurn(!editTurn);
  };

  const messageClient = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Debe Ingresar un Cliente`,
    });
  };

  const openHistorial = () => {
    localStorage.setItem("historialData", JSON.stringify(stateClientSelected));
    window.open("/historialPet", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {!isLoading ? (
        <div className="mb-2">
          <div>
            {/* BUTTONS */}
            <div className="container py-3">
              <div className="row justify-content-center">
                <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
                  <div className="text-center">
                    <div className="card-body">
                      <button
                        className="btn btn-link"
                        onClick={() => setNewClient(!newClient)}
                      >
                        <img src={addClient2} />
                      </button>
                    </div>
                  </div>
                </div>

                {listClients ? (
                  <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
                    <div className="text-center">
                      <div className="card-body">
                        <Link to="/listClient">
                          <button className="btn btn-link">
                            <img src={iconClients} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
                    <div className="text-center">
                      <div className="card-body">
                        <button className="btn btn-link">
                          <img src={iconClients} onClick={messageClient} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {listClients ? (
                  <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
                    <div className="text-center">
                      <div className="card-body">
                        <button className="btn btn-link">
                          <img src={addPet} onClick={ModalAddDogActive} />
                        </button>
                        <ModalAddDog
                          stateAddDog={stateAddDog}
                          setStateAddDog={setStateAddDog}
                        />
                      </div>
                    </div>
                  </div>
                ) : !listClients ? (
                  <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
                    <div className="text-center">
                      <div className="card-body">
                        <button className="btn btn-link">
                          <img src={addPet} onClick={messageClient} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {listClients ? (
                  <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
                    <div className="text-center">
                      <div className="card-body">
                        <button className="btn btn-link" onClick={addTurn}>
                          <img src={iconAddTurn} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button className="btn btn-link" onClick={messageClient}>
                    <img src={iconAddTurn} />
                  </button>
                )}
              </div>
            </div>

            {/* MODALS */}
            <ModalAddClient
              state={newClient}
              setState={setNewClient}
            ></ModalAddClient>

            {/* MODAL PERMITE EDITAR UN TURNO */}
          </div>

          {/* <AgendaInputs></AgendaInputs> */}

          <div className="container-fluid table-responsive">
            <ModalAddTurn
              // onTurnoAdded={onTurnoAdded}
              stateAddTurn={newTurno}
              setStateAddTurn={setNewTurno}
            />
          </div>

          {/* /////////////////////////////TABLA TURNOS ////////////////////////////////////////////// */}
          <div className="container-fluid table-responsive">
            <>
              <div className="titGral">
                <h2>TABLA DE TURNOS</h2>
              </div>

              <TableTurns
                setOrder={setOrder}
                setInputState={setInputState}
                order={order}
                setEditTurn={setEditTurn}
                editTurn={editTurn}
                setInfo={setInfo}
                stateInfo={stateInfo}
              />

              <ModalEditTurn />

              <div className="container-lg pb-4">
                {!stateInfo && !newTurno && !newClient && !newDog ? (
                  <div>
                    <Select
                      placeholder="Seleccione Mascota a Buscar"
                      options={Listdogs}
                      onChange={ChangeDog}
                      menuPortalTarget={document.body} // Renderiza el menú fuera del contenedor
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Asegura que esté visible sobre otros elementos
                      }}
                    />
                    {/* Este style evita que el menú empuje el diseño y cause la barra de desplazamiento lateral. */}
                  </div>
                ) : null}

                <div className="titGral">
                  <h1 className="mt-1">{`Historial de Mascota`}</h1>
                </div>
              </div>
            </>
          </div>

          {/* //////////////////////////HISTORIAL MASCOTA /////////////////////////////////////*/}

          <div className="mb-2">
            {selectedDog ? (
              vtaxClient.status === 200 ? (
                <>
                  <div className="container-lg table-responsive">
                    {/* <td>{selectedDog.selectedDog.label}</td> */}

                    <div className="mb-3 text-center">
                      {vtaxClient.data.vta ? (
                        <>
                          <div className="titDetails">
                            <h5 className="text-center">Detalle Mascota</h5>
                          </div>
                          <div className="container py-2">
                            <div
                              className="containerPed"
                              key={vtaxClient.data.vta[0].Dog._id}
                            >
                              <div className="card-body text-center">
                                <p>
                                  <FontAwesomeIcon icon={faBone} size="lg" />
                                </p>
                                <p
                                  className="smallText"
                                  style={{ fontSize: "1em" }}
                                >
                                  {vtaxClient.data.vta[0].Dog.nameDog}
                                </p>
                              </div>

                              <div className="card-body text-center">
                                <p>
                                  <FontAwesomeIcon
                                    icon={faScaleBalanced}
                                    size="lg"
                                  />
                                </p>
                                <p
                                  className="smallText"
                                  style={{ fontSize: "1em" }}
                                >
                                  {vtaxClient.data.vta[0].Dog.tamaño}
                                </p>
                              </div>

                              <div className="card-body text-center">
                                <p>
                                  <FontAwesomeIcon
                                    icon={faPersonWalking}
                                    size="lg"
                                  />
                                </p>
                                <p
                                  className="smallText"
                                  style={{ fontSize: "1em" }}
                                >
                                  {vtaxClient.data.vta[0].name}
                                </p>
                              </div>

                              <div className="card-body  text-center">
                                <p>
                                  <FontAwesomeIcon
                                    icon={faNoteSticky}
                                    size="lg"
                                  />
                                </p>
                                <p
                                  className="smallText"
                                  style={{ fontSize: "1em" }}
                                >
                                  {vtaxClient.data.vta[0].Dog.notaP
                                    ? vtaxClient.data.vta[0].Dog.notaP
                                    : "Sin Nota"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}

                      <img src={addClient2} />
                      {/* BUTTON OPEN HISTORY PDF */}
                      {stateCategory && stateCategory === "peluAndVet" ? (
                        <button
                          onClick={openHistorial}
                          className="d-flex justify-content-center align-items-center mx-auto"
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                          }}
                        >
                          <img
                            src={carpetaMedica}
                            style={{ width: "60px", height: "60px" }}
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="container-lg table-responsive mb-4">
                    {/* <td>{selectedDog.selectedDog.label}</td> */}

                    <table className="table table-bordered table-hover table-dark">
                      <thead class="thead-light table-secondary">
                        <tr>
                          <th>Valor Servicio</th>
                          <th>
                            Fecha{" "}
                            <FontAwesomeIcon
                              onClick={(e) => handleOrderHistDog(e)}
                              color={order ? "#FF846A" : "#A2DFFF"}
                              icon={faSortAlphaDown}
                              size="lg"
                              style={{ cursor: "pointer" }}
                            />
                          </th>
                          <th>Nota Turno</th>
                          <th>Tipo de Servicio</th>
                          {/* <th>Info</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {vtaxClient.status === 200
                          ? vtaxClient.data.vta.map((vta) => (
                              <tr key={vta._id}>
                                <td>$ {vta.valorServ}</td>
                                <td>
                                  {convertDateFormat(vta.date)} -{" "}
                                  {convertDay(vta.date)}
                                </td>
                                <td>{vta.notesTurn}</td>
                                <td>{vta.tipoServ}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="container-lg p-2 mb-2 text-center">
                    <h5 className="alertHist">
                      No existe historial de Mascota
                    </h5>
                  </div>
                </>
              )
            ) : null}
          </div>
        </div>
      ) : (
        <div className="d-flex vh-100 justify-content-center align-items-center flex-column">
          <ClipLoader color="#000" loading={true} size={70} />
          <div className="titGral">
            <h2 className="mt-3">Espere un Momento por favor ...</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
