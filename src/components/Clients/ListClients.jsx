//https://www.youtube.com/watch?v=ZF8IL1ldfdo&ab_channel=SiCode

import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getClients, deleteClient } from "../../reducer/actions/actionsClients";
import "./ListClients.css";
import HistorialClient from "../History/HistorialClient";
import ModalAddClient from "../Modal/ModalAddClient";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//import axios from "../api/axios";
import "../../css/cssGeneral.css";
import back from "../../icons/back.png";
import addClient from "../../icons/addClient.png";
import deleteClientIcon from "../../icons/deleteClient.png";
import editClientIcon from "../../icons/editClient.png";
import ModalEditClient from "../Modal/ModalEditClient";
const REGISTER_URL = "/createUserRolUserClient";
import RankingClients from "../Clients/RankingClients"

//FUNCION QUE UTILIZA EL INPUT PARA BUSCAR UN CLIENTE

/**
 * This function searches for a client: Its used in filtered search ListClients
 * @param {String} busc Client's Name as state
 * @returns
 */

function searchCli(busc) {
  //console.log(busc)
  return function (x) {
    return x.name.toLowerCase().includes(busc) | !busc;
    //return x.name.includes(busc) | !busc;
  };
}

function ListClients() {
  const MySwal = withReactContent(Swal);
  var clients = useSelector((state) => state.allClients);
  //console.log(clients,"listado")
  const companySelectedMenu = useSelector((state) => state.companySelected);

  const [stateSearch, setSearch] = useState("");

  const dispatch = useDispatch();
  const personCategory = useSelector((state) => state.typePerson);
  const [editClient, setEditClient] = useState(false);
  //stateInfo es el que se acciona cada vez que se selecciona un cliente
  const [stateInfo, setInfo] = useState(false);
  const [stateHist, setStateHist] = useState(false);
  const [inputState, setInputState] = useState({
    id: "",
    name: "",
    // nameDog: "",
    phone: "",
    address: "",
    notesCli: "",
    arrayDogs: [],
    arrayPedidos: [],
    visible: true,
    index: "",
    status: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getClients(companySelectedMenu._id));
  }, []);

  useEffect(() => {
    setInputState({
      id: "",
      name: "",
      // nameDog: "",
      phone: "",
      address: "",
      notesCli: "",
      arrayDogs: [],
      arrayPedidos: [],
      visible: true,
      status: "",
      email: "",
    });
  }, []);

  var arrayClients = [];

  if (Array.isArray(clients)) {
    clients.map((cli) => {
      const option = {
        value: cli.name,
        label: cli.name,
      };
      arrayClients.push(option);
    });
  }

  /**
   * This function is executed every time a client is clicked
   */
  //esto se efectua cada vez que se aprieta un cliente
  function handleInfo(e, props) {
    e.preventDefault();
    //console.log(props,"carcateristica cliente")

    if (stateInfo) {
      setInfo(!stateInfo);
    }
    if (!stateHist) {
      setStateHist(!stateHist);
    }
    setInputState({
      _id: props._id,
      name: props.name,
      phone: props.phone,
      address: props.address,
      notesCli: props.notesCli,
      arrayDogs: props.arrayDogs,
      arrayPedidos: props.arrayPedidos,
      index: props.index,
      status: props.status,
      email: props.email,
    });
  }

  function handleEdit(e) {
    if (e.name) {
      if (!editClient) {
        setEditClient(!editClient);
      }
      if (!stateInfo) {
        setInfo(!stateInfo);
      }
    } else
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `Debe elegir el ${personCategory} a Editar!`,
      });
  }

  const [newClient, setNewClient] = useState(false);

  async function handleDelete({ idClient, index }) {
    if (!idClient) {
      return MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `Debe elegir el ${personCategory} a eliminar!`,
      });
    }

    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: `¡El ${personCategory} será borrado de la base de datos!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1ABD53",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

  
      const response = await dispatch(deleteClient(idClient));


      if (response?.status === 200) {
        clients.splice(index, 1);

        if (stateHist) setStateHist(!stateHist);
        if (stateInfo) setInfo(!stateInfo);

        setInputState({ id: "" });

        await MySwal.fire({
          title: `${personCategory} Eliminado`,
          text: `El ${personCategory} se borró correctamente.`,
          icon: "success",
          confirmButtonColor: "#00A0D2",
        });
      } else if (response?.status === 204) {
        await MySwal.fire({
          icon: "info",
          title: "No se puede eliminar",
          text: "No se pude eliminar. Hay turnos pendientes.",
          confirmButtonColor: "#00A0D2",
        });
      } else {
        throw new Error(`Error desconocido al eliminar el ${personCategory}.`);
      }
    
  }

  return (
    <div>
      <div className="titGral">
        <h1>{personCategory}:Listado</h1>
      </div>

      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
            <div className="text-center">
              <div className="card-body">
                <button
                  className="btn"
                  onClick={() => setNewClient(!newClient)}
                >
                  <img src={addClient} />
                </button>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 d-flex justify-content-center">
            <div className="text-center">
              <div className="card-body mt-3">
                <Link to="/">
                  <button className="btn btn-link">
                    <img src={back} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-lg table-responsive">
        <div className="containerSearch">
          <input
            className="inputBuscar instrument-serif-regular"
            type="text"
            name="search"
            placeholder={`Busque un ${personCategory}. Ingrese sólo valores en minúsculas`}
            value={stateSearch}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ModalAddClient state={newClient} setState={setNewClient} />
      <br />
      {clients ? (
        // HOVER para que semarque con el cursor
        // BODERED para que se marquen los bordes de las columnas
        <div className="container-lg table-responsive">
          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-dark">
              <tr>
                <th className="instrument-serif-regular">Nombre {personCategory}</th>
                <th className="instrument-serif-regular">Contacto</th>
                <th className="instrument-serif-regular">Domicilio</th>
                <th className="instrument-serif-regular">Notas</th>
              </tr>
            </thead>
            <tbody>
              {clients
                ? clients.filter(searchCli(stateSearch)).map((cli, index) =>
                    cli.status === true ? (
                      <tr key={cli._id}>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={(e) =>
                            handleInfo(e, {
                              _id: cli._id,
                              notesCli: cli.notesCli,
                              arrayDogs: cli.perros,
                              name: cli.name,
                              phone: cli.phone,
                              address: cli.address,
                              notesCli: cli.notesCli,
                              arrayPedidos: cli.pedidos,
                              index: index,
                              status: cli.status,
                              email: cli.email,
                            })
                          }
                          className="instrument-serif-regular"
                        >
                          {cli.name}
                        </td>
                        <td className="instrument-serif-regular">{cli.phone}</td>
                        <td className="instrument-serif-regular">{cli.address}</td>
                        <td className="instrument-serif-regular">{cli.notesCli}</td>
                      </tr>
                    ) : null
                  )
                : null}
            </tbody>
          </table>
        </div>
      ) : null}

      {stateHist ? (
        <div className="container-lg table-responsive">
          <h5 className="tituloH instrument-serif-regular">Historial del {personCategory}: {inputState.name}</h5>
          <HistorialClient
            state={inputState}
            stateHist={stateHist}
            setStateHist={setStateHist}
          />

          <div className="container py-3">
            <div className="row justify-content-center">
              <div className="col-12 col-md-4 d-flex justify-content-center mb-1">
                <div className="card text-content">
                  <div className="card-body">
                    <button
                      className="btn btn-link"
                      onClick={() =>
                        handleDelete({
                          idClient: inputState._id,
                          index: inputState.index,
                        })
                      }
                    >
                      <img src={deleteClientIcon} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 d-flex justify-content-center mb-1">
                <div className="card text-content">
                  <div className="card-body">
                    <button
                      className="btn btn-link"
                      onClick={() =>
                        handleEdit({
                          _id: inputState._id,
                          name: inputState.name,
                          // nameDog: el.nameDog,
                          phone: inputState.phone,
                          address: inputState.address,
                          notesCli: inputState.notesCli,
                          email: inputState.email,
                        })
                      }
                    >
                      <img src={editClientIcon} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* FORMULARIO PARA EDICION  */}
      <ModalEditClient
        idClient={inputState._id}
        state={editClient}
        setState={setEditClient}
        name={inputState.name}
        phone={inputState.phone}
        address={inputState.address}
        notesCli={inputState.notesCli}
        email={inputState.email}
      />

      <RankingClients/>
    </div>
  );
}

export default ListClients;
