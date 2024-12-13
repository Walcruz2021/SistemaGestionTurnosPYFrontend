import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Label, InputContainer } from "../cssSyleComp/StyleForm";
import {
  faSortAlphaDown,
  faPenSquare,
  faTrash,
  faHandHoldingUsd,
  faBone,
  faNoteSticky,
  faScaleBalanced,
  faShieldDog,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Options } from "../cssSyleComp/Table";
import {
  //tra los turnos
  searchHistorialDog,
  deleteTurno,
  getClients,
  getTurnos,
} from "../reducer/actions/actions";
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
import "./Dashboard.css";
import ModalAddClient from "./Modal/ModalAddClient";
import addClient2 from "../icons/addClientSmall.png";
import addPet from "../icons/addPet.png";
import iconAddTurn from "../icons/addTurn.png";
import listClients from "../icons/listClients.png";
import ModalBoostrap from "react-bootstrap/Modal";
import TableTurns from "./TableTurns";
import ModalAddVtas from "../components/Modal/ModalAddVtas";
import ModalEditTurn from "../components/Modal/ModalEditTurn";
import ModalAddTurn from "../components/Modal/ModalAddTurn";

function Dashboard({
  listClientsCompany,
  setlistClients,
  idCompanySelected,
  changeClients,
}) {
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const listadoTurnos = useSelector((state) => state.allTurnos);

  const [stateListTurn, setListTurn] = useState([]);
  const vtaxClient = useSelector((state) => state.vtaxClient);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [selectedDog, setSelectedDog] = useState(null);
  //stateTunrno es una bandera que se modificara cada vez que se elimina un turno
  //se utiliza ya que cada vez que se elimina el turno para que se vea reflkejado el cambio se necesita cambiar algun estado o apretar un boton
  const [stateTurno, setTurno] = useState(false);
  const [newTurno, setNewTurno] = useState(false);
  const [newDog, setNewDog] = useState(false);
  const [newClient, setNewClient] = useState(false);
  const [order, setOrder] = useState(false);
  const [changeTurn, setChangeTurn] = useState(false);
  const [stateInfo, setInfo] = useState(false);
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
  });

  // const onTurnoAdded = () => {
  //   dispatch(getTurnos(companySelectedMenu._id));
  // };

  const addTurn = () => {
    setNewTurno(!newTurno);
  };

  const [stateAddTurn, setStateAddTurn] = useState(false);

  const ModalAddDogActive = () => {
    setStateAddDog(!stateAddDog);
  };
  //ARRAY DE MASCOTAS PARA SELECT (HISTORIAL)
  const Listdogs = [];
  if (listadoTurnos) {
    listadoTurnos.map((dog) => {
      const optionDog = { value: dog.idDog, label: dog.nameDog };
      Listdogs.push(optionDog);
      return Listdogs;
    });
    //console.log(Listdogs);
  }

  const ChangeDog = (value) => {
    setSelectedDog(value.value);
    SearchDog(value.value);
  };

  const cliBusc = useSelector((state) => state.clientBusc);

  if (cliBusc.buscado) {
    const arrayIdClient = cliBusc.buscado.pedidos;
  }

  function SearchDog(idDog) {
    //console.log(idDog);
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
    // console.log("se hizo click");
  };

  return (
    <>
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

            <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
              <div className="text-center">
                <div className="card-body">
                  <Link to="/listClient">
                    <button className="btn btn-link">
                      <img src={listClients} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
              <div className="text-center">
                <div className="card-body">
                  <button className="btn btn-link">
                    <img src={addPet} onClick={ModalAddDogActive} />
                  </button>
                  <ModalAddDog
                    stateAddDog={stateAddDog}
                    setStateAddDog={setStateAddDog}
                    changeClients={changeClients}
                  />
                </div>
              </div>
            </div>

            <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
              <div className="text-center">
                <div className="card-body">
                  <button className="btn btn-link" onClick={addTurn}>
                    <img src={iconAddTurn} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODALS */}
        <ModalAddClient
          state={newClient}
          setState={setNewClient}
        ></ModalAddClient>

        {/* MODAL QUE PERMITE INGRESAR VALORES A VENTA */}

        {stateInfo ? (
          <>
            <ModalBoostrap show={stateInfo} onHide={handleClose} centered>
              <ModalBoostrap.Body>
                <ModalDescription
                  nameClient={inputState.name}
                  phone={inputState.phone}
                  notesTurn={inputState.notesTurn}
                  state={stateInfo}
                  setStateModal={setInfo}
                />
              </ModalBoostrap.Body>
            </ModalBoostrap>
          </>
        ) : null}

        {/* MODAL PERMITE EDITAR UN TURNO */}
      </div>
      {/* <AgendaInputs></AgendaInputs> */}

      <div className="container-fluid table-responsive">
        <ModalAddTurn
          // onTurnoAdded={onTurnoAdded}
          stateAddTurn={newTurno}
          setStateAddTurn={setNewTurno}
          listClientsCompany={listClientsCompany}
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

          {/* SE DEBE CONFECCIONAR */}
          <ModalEditTurn />

          {/* SELECTOR DE MASCOTAS PARA EL HISTORIAL */}
          {!stateInfo && !newTurno && !newClient && !newDog ? (
            <div className="container-lg pb-4">
              <Select
                placeholder="Seleccione Mascota a Buscar"
                options={Listdogs}
                onChange={ChangeDog}
              />
            </div>
          ) : null}
          <div className="titGral">
            <h1 className="mt-1">Historial de Mascota</h1>
          </div>
        </>
      </div>

      {/* //////////////////////////HISTORIAL MASCOTA /////////////////////////////////////*/}

      {selectedDog ? (
        vtaxClient.status === 200 ? (
          <>
            <div className="container-lg table-responsive">
              {/* <td>{selectedDog.selectedDog.label}</td> */}

              {vtaxClient.data.vta ? (
                <>
                  <div className="titDetails">
                    <h5>Detalle Mascota</h5>
                  </div>
                  <div className="containerHistDog">
                    <div
                      className="grid-item "
                      key={vtaxClient.data.vta[0].Dog._id}
                    >
                      <p>
                        <FontAwesomeIcon icon={faBone} size="lg" />
                      </p>
                      <p>{vtaxClient.data.vta[0].Dog.nameDog}</p>
                    </div>

                    <div className="grid-item">
                      <p>
                        <FontAwesomeIcon icon={faScaleBalanced} size="lg" />
                      </p>
                      <p>{vtaxClient.data.vta[0].Dog.tamaño}</p>
                    </div>

                    {/* <div className="grid-item">
                      <p>
                        <FontAwesomeIcon icon={faShieldDog} size="lg" />
                      </p>
                      <p>{vtaxClient.data.vta[0].Dog.raza}</p>
                    </div> */}

                    <div className="grid-item">
                      <p>
                        <FontAwesomeIcon icon={faNoteSticky} size="lg" />
                      </p>
                      <p>{vtaxClient.data.vta[0].Dog.notaP}</p>
                    </div>
                  </div>
                </>
              ) : null}
            
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
            <div className="container-lg p-2 mb-2">
              <h5 className="alertHist">No existe historial de Mascota</h5>
            </div>
          </>
        )
      ) : null}
    </>
  );
}

export default Dashboard;
