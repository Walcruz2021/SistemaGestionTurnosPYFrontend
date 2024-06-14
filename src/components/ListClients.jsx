//https://www.youtube.com/watch?v=ZF8IL1ldfdo&ab_channel=SiCode
import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getClients,
  deleteClient,
} from "../reducer/actions";
import "./ListClients.css";
import HistorialClient from "./HistorialClient";
import ModalAddClient from "./Modal/ModalAddClient";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../api/axios";
import "../css/cssGeneral.css";
import back from "../../src/icons/back.png";
import addClient from "../../src/icons/addClient.png";
import deleteClientIcon from "../../src/icons/deleteClient.png";
import editClientIcon from "../../src/icons/editClient.png";
import ModalEditClient from "./Modal/ModalEditClient";
const REGISTER_URL = "/createUserRolUserClient";

//FUNCION QUE UTILIZA EL INPUT PARA BUSCAR UN CLIENTE

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
  //console.log(stateSearch)

  //MANEJO DE ESTADO CON USEEFFECT DE CLIENTES TRAIDOS DEL BACK
  // const [stateClients, setStateClients] = useState([]);
  // console.log(stateClients)
  // useEffect(() => {
  //   setStateClients(clients);
  // });

  const dispatch = useDispatch();

  //ESTADOS QUE PERMITEN LA VISUALIZACIONES DE COMPONENTES
  //cuando editCliente este activado se mostrara el formulario a completar
  const [editClient, setEditClient] = useState(false);
  //stateInfo es el que se acciona cada vez que se selecciona un cliente
  const [stateInfo, setInfo] = useState(false);
  const [stateHist, setStateHist] = useState(false);

  //console.log(stateInfo,"stateInfo")
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
  });
  //console.log(inputState);

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

  //console.log(arrayClients);

  //esto se efectua cada vez que se aprieta un cliente
  function handleInfo(e, props) {
    e.preventDefault();
    //console.log(props,"carcateristica cliente")

    //en caso que setInfo este en true se pasa a false
    //esto ocurrira siempre que se apriete un cliente
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
    });
  }

  //se efectua cuando se aprieta el boton EDITAR CLIENTE
  function handleEdit(e) {
    if (e.name) {
      //de estos valores dependera de que el fomrulario se muestre
      //ambos tienen que estar en true para que se visualize
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
        text: "Debe elegir el cliente a Editar!",
      });
  }

  const [newClient, setNewClient] = useState(false);

  function handleDelete({ idClient, index }) {
    //console.log(idClient)
    if (idClient) {
      MySwal.fire({
        title: "¿Estas seguro?",
        text: "¡El Cliente será borrado de la base de datos!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1ABD53",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteClient(idClient));
          //clients[index].status=false
          clients.splice(index, 1);
          //console.log(index)

          //al eliminar el lciente se sambia el stateHist de manea de que no se visualize las mascotas pertenecientes al cliente eliminado
          //el cual previamente se habia seleccionado
          if (stateHist) {
            setStateHist(!stateHist);
          }

          //al eliminar el cliente se cambia statInfo de manera de que no se visualize los input de edicion
          if (stateInfo) {
            setInfo(!stateInfo);
          }

          //setStateClients(stateClients[index].status=false)

          //console.log(stateClients[index],"cliente elminado")
          //al eliminar un cliente quedan los botones ediat y cancelar y ademas queda guardado en el estado el id del cliente eliminado
          //por tanto se puede hacer click en los botones ya quye estan haciendo referencia al id de un cliente (en este caso del eliminado)
          //por tanto se blanquea el id al eliminar dicho cliente
          setInputState({
            id: "",
          });
          //dispatch(getClients());

          MySwal.fire({
            title: "Cliente Eliminado",
            text: "El cliente se borró correctamente.",
            icon: "success",
            confirmButtonColor: "#00A0D2",
          });
        }
      });
    } else
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe elegir el cliente a eliminar!",
      });
  }

  // function handleChangeCli(selectedCli) {
  //   //console.log(selectedCli)
  //   setSearch(selectedCli.value);
  // }

  // const handleClose = () => {
  //   if (editClient) {
  //     setEditClient(!editClient);
  //   }
  //   console.log("se hizo click");
  // };

  // const createHashRouter = (value) => {
  //   //se utiliza la expresión regular /\s/g dentro del método replace() para buscar y reemplazar todos los espacios
  //   //en blanco de la cadena. El modificador g indica que se deben reemplazar todas las coincidencias y no solo la
  //   //primera encontrada.
  //   const userSinEsp = value.userName.replace(/\s/g, "");
  //   MySwal.fire({
  //     title: "¿Estas seguro?",
  //     text: `USER: ${userSinEsp}   PASSWORD: ${value.password}`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#1ABD53",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Sí",
  //     cancelButtonText: "Cancelar",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       //si no le pondo el try catch no funciona el preguntar por erro.status ya que try catch captura cualquier error
  //       //que ocurra durante la peticion
  //       try {
  //         const response = await axios.post(
  //           REGISTER_URL,
  //           JSON.stringify({
  //             userName: userSinEsp,
  //             password: value.password.toString(),
  //             idClient: value.idClient,
  //             role: "userClient",
  //           }),
  //           {
  //             headers: { "Content-Type": "application/json" }, //establece el encabezado Content-Type como application/json-indica que el cuerpo de la solicitud contiene datos en formato JSON
  //             withCredentials: true, //se establece en true para permitir el envío de cookies o credenciales en la solicitud.
  //           }
  //         );
  //         console.log(response, "--->");
  //         if (response.status === 200) {
  //           MySwal.fire({
  //             title: "Solicitud con Exito",
  //             text: "User y Password creados",
  //             icon: "success",
  //             confirmButtonColor: "#00A0D2",
  //           });
  //           dispatch(getClients(companySelectedMenu._id));
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         if (error.response.status === 400) {
  //           MySwal.fire({
  //             icon: "error",
  //             title: "Oops...",
  //             text: "El usuario ya existe",
  //           });
  //         }
  //       }
  //     }
  //   });
  // };

  return (
    <div>
      <div className="titGral">
        <h1>Listado de Clientes</h1>
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
                <Link to="/dashboard">
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
            className="inputBuscar"
            type="text"
            name="search"
            placeholder="Busque un Cliente. Ingrese sólo valores en minúsculas"
            value={stateSearch}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <Select placeholder="Seleccione Client" 
           onChange={(e) => {
            handleChangeCli(e);
          }}
          options={arrayClients} /> */}
          {/* <button className="butBuscar" onClick={()=>FilterElements()}>  <FontAwesomeIcon icon={faSearch} size="1.5x" /> Buscar Cliente</button> */}
          {/* aqui se invoca el modal el cual de acuerdo al id enviado se renderizar el formato indicado */}
          {/* de acuerdo al id que le envie se renderiza cierto tipo de modal */}
        </div>
      </div>

      <ModalAddClient state={newClient} setState={setNewClient}  />

      {/* <AgendaInputs></AgendaInputs> */}
      <br />
      {clients ? (
        // HOVER para que semarque con el cursor
        // BODERED para que se marquen los bordes de las columnas
        <div className="container-lg table-responsive">
          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-dark">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Notes</th>
                {/* <th>Crear User</th> */}
                {/* <th>Option</th> */}
              </tr>
            </thead>
            <tbody>
              {clients
                ? clients.filter(searchCli(stateSearch)).map((cli, index) =>
                    cli.status === true ? (
                      <tr key={cli._id}>
                        <td
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
                            })
                          }
                        >
                          {cli.name}
                        </td>
                        <td>{cli.phone}</td>
                        <td>{cli.address}</td>
                        <td>{cli.notesCli}</td>
                        {/* <td className="marginIcon">
                          {cli.userLogin === false ? (
                            <FontAwesomeIcon
                              icon={faUser}
                              onClick={() =>
                                createHashRouter({
                                  userName: cli.name,
                                  password: cli.phone,
                                  idClient: cli._id,
                                })
                              }
                            />
                          ) : null}
                        </td> */}
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
          <h5 className="tituloH">Historial del Cliente: {inputState.name}</h5>
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
      />
    </div>
  );
}

export default ListClients;
