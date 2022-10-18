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
  updateTurno,
  getTurnos,
  deleteTurno,
  orderTurnos,
  getClients,
  get_clients_id,
  addTurnos,
} from "../reducer/actions";
import Swal from "sweetalert2";
import Modal from "./Modal/Modal";
import Formulario from "./Formulario/FormNewTurno";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Select from "react-select";

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { ButtonModal, CloseButton } from "../cssSyleComp/ModalStyles";

import "./Dashboard.css";
function AgendaTurnPrueba({ turnos }) {
  const listadoTurnos = turnos;
  //console.log(listadoTurnos, "viejo");

  const [stateListTurn, setListTurn] = useState([]);
  //console.log(stateListTurn)
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
  //console.log(changeTurn, "estado turno");
  const [stateInfo, setInfo] = useState(false);
  const [newVentas, setNewVentas] = useState(false);
  const [editTurn, setEditTurn] = useState(false);
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


  useEffect(()=>{
    setListTurn(turnos)
  },[])

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

  const change = () => {
    setNewDog(!newDog);
  };

  const [stateInput, setStateInput] = useState({
    date: "",
    time: "",
    notesTurn: "",
    nameDog: "",
    idDog: "",
    idClient: "",
    name: "",
    arrayDogs: [],
    phone: "",
  });

  const ChangeDog = (value) => {
    setSelectedDog(value.value);
    SearchDog(value.value);
  };

  const cliBusc = useSelector((state) => state.clientBusc);

  if (cliBusc.buscado) {
    const arrayIdClient = cliBusc.buscado.pedidos;
    // setCli(...cli,arrayIdClient)
    // console.log(arrayIdClient, "array de id de pedidos");
  }

  function SearchDog(idDog) {
    //console.log(idDog);
    dispatch(searchHistorialDog(idDog));
  }
  function handleChangeDog(selected) {
    setStateInput({
      ...stateInput,
      nameDog: selected.label,
      idDog: selected.value,
    });
  }
  function handleOrder(e) {
    setOrder(!order);
    //dispatch(orderTurnos(order));
    const listOrder = stateListTurn;
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
        dispatch(deleteTurno(props.idTurn));
        setChangeTurn(!changeTurn);
        stateListTurn.splice(props.index, 1);
        setTurno(!stateTurno);
        console.log(stateListTurn, "actualizado");
        console.log(props.index, "--->");
        // console.log(props.idTurn,"--->")
        // setTimeout(() => {
        //   dispatch(getTurnos());
        // }, 300);
        MySwal.fire({
          title: "Turno borrado",
          text: "El Turno se borró correctamente.",
          icon: "success",
          confirmButtonColor: "#00A0D2",
        });
      }
    });
  }

  //EDITAR TURNO
  function handleClick(e, props) {
    e.preventDefault();
    setInputState({
      _id: props._id, //id de turno
      name: props.name,
      nameDog: props.nameDog,
      phone: props.phone,
      date: props.date,
      notesTurn: props.notesTurn,
      idClient: props.idClient,
      time: props.time,
      index: props.index,
      idDog:props.idDog
    });
    setEditTurn(!editTurn);
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

  function handleInfo(e, props) {
    e.preventDefault();
    setInfo(!stateInfo);
    setInputState({
      _id: props._id,
      name: props.name,
      phone: props.phone,
      notesTurn: props.notesTurn,
    });
  }

  function handleVentas(e, props) {
    e.preventDefault();
    // console.log(props.idDog)
    // ESTOS DATOS SE TRAEN LLAMANDO A LA FUNCION getTurnos PARA QUE SE RENDERIZEN EN LA TABLA A MOSTRAR
    // ESTOS DATOS SOLO SE MUESTRAN UNA VEZ QUE SE REALIZAN CLICK EN EL ICONO DE ALGUNA FILA
    //     date: "15-01-1988"
    //     name: "omar"
    //     valorServ: undefined
    //     _id: "61f332036a0a2a71c9de7bc7"
    //  console.log(props.notesTurn,"si llega")
    setInputState({
      _id: props._id,
      date: props.date,
      valorServ: props.valorServ,
      name: props.name,
      nameDog: props.nameDog,
      idDog: props.idDog,
      tipoServ: props.tipoServ,
      notesTurn: props.notesTurn,
      idClient: props.idClient,
      index:props.index
    });

    setNewVentas(!newVentas);
    // console.log(props.idClient);
  }

  const handleClose = () => {
    setEditTurn(!editTurn);
   // console.log("se hizo click");
  };

  return (
    <>
      <div>
        <div className="grid-container container">
          <button className="button2" onClick={() => setNewClient(!newClient)}>
            Crear Cliente
          </button>

          <Link to="/listClient">
            <button className="button4">Listado Cliente</button>
          </Link>

          <Link to="/listVentas">
            <button className="button5">Listado de Ventas</button>
          </Link>

          <Link to="/createDog">
            <button className="button3" id="dog" onClick={() => change()}>
              Crear Perro
            </button>
          </Link>

          {/* aqui se invoca el modal el cual de acuerdo al id enviado se renderizar el formato indicado */}
          {/* de acuerdo al id que le envie se renderiza cierto tipo de modal */}

          {/* MODAL QUE PERMITE CREAR UN CLIENTE */}
        </div>

        <Modal
          id={1}
          state={newClient}
          setStateModal={setNewClient}
          title="Crear un Cliente"
          label1="Nombre Cliente"
          // label2="Name Dog"
          label3="Celular"
          label6="Direccion"
          label9="Nota Cliente"
          modalContainerBox
          showInSettings
          name={inputState.name}
          phone={inputState.phone}
          address={inputState.address}
          notesCli={inputState.notesCli}
        />

        {/* MODAL QUE PERMITE INGRESAR VALORES A VENTA */}
        <Modal
          id={3}
          state={newVentas}
          setStateModal={setNewVentas}
          title="Adherir a Ventas"
          label7="Precio de Servicio"
          label12="Nota de Servicio"
          label13="Efectivo"
          label14="Transferencia"
          label15="Tarjeta"
          modalContainerBox
          showInSettings
          date={inputState.date} // al realizarse click en el icono ADHERIR VENTA se traen los datos y parte de
          // estos se pasan como parametros para que se renderize este modal. Estos parametros (DATE Y NAME)
          // se envian al archivo MODAL. Posteriormente se envian estos datos al action para que se pasen al backend
          name={inputState.name}
          nameDog={inputState.nameDog}
          idElement={inputState._id}
          idClient={inputState.idClient}
          notesTurn={inputState.notesTurn}
          idDog={inputState.idDog}
          index={inputState.index}
          //listadoTurnos={listadoTurnos}
          stateListTurn={stateListTurn}
          setListTurn={setListTurn}
          stateInfo={stateInfo}
          setInfo={setInfo}
        />

        {/* MODAL QUE PERMITE MOSTRAR INFORMACION ADICIONAL */}
        <Modal
          idElement={inputState._id}
          id={4}
          state={stateInfo}
          setStateModal={setInfo}
          title="Informacion"
          label1="Nombre de Cliente"
          label3="Phone"
          label5="Note Turn"
          name={inputState.name}
          phone={inputState.phone}
          notesTurn={inputState.notesTurn}
          modalContainerBox
          showInSettings
        />

        {/* MODAL PERMITE EDITAR UN TURNO */}
      </div>
      {/* <AgendaInputs></AgendaInputs> */}

      <div className="container">
        <h5>AGREGAR TURNO</h5>
        {!stateInfo &&
        !newTurno &&
        !newClient &&
        !newVentas &&
        !editTurn &&
        !newDog ? (
          <Formulario />
        ) : null}
        {/*  */}
        <br></br>

        {/* /////////////////////////////TABLA TURNOS ////////////////////////////////////////////// */}

        <h5>Tabla de Turnos</h5>

      </div>

      <div className="container-lg table-responsive">
        <table className="table table-bordered table-hover table-white">
          <thead className="thead-light table-secondary">
            <tr>
              <th>NameDog</th>
              <th>
                Date{" "}
                <FontAwesomeIcon
                  onClick={(e) => handleOrder(e)}
                  color={order ? "#FF846A" : "#A2DFFF"}
                  icon={faSortAlphaDown}
                  size="lg"
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th>Time</th>
              <th>Options</th>
              {/* <th>Info</th> */}
            </tr>
          </thead>
          <tbody>
            {stateListTurn.map((turn, index) => (
              <tr key={turn._id}>
                <td
                  onClick={
                    (e) =>
                      handleInfo(e, {
                        _id: turn._id,
                        name: turn.name,
                        phone: turn.phone,
                        notesTurn: turn.notesTurn,
                      })
                    // console.log(turn.notesTurn,"-->notes")
                  }
                >
                  {turn.nameDog}
                </td>
                <td>
                  {convertDateFormat(turn.date)} - {convertDay(turn.date)}
                </td>
                <td>{turn.time}</td>

                <td>
                  <Options justify="space-between">
                    <button
                      onClick={
                        (e) =>
                          handleVentas(e, {
                            _id: turn._id,
                            date: turn.date,
                            valorServ: turn.valorServ,
                            name: turn.name,
                            nameDog: turn.nameDog,
                            idDog: turn.idDog,
                            tipoServ: turn.tipoServ,
                            notesTurn: turn.notesTurn,
                            idClient: turn.idClient,
                            index: index,
                          })
                        // console.log(turn.notesTurn,"----------> notyes 2")
                      }
                    >
                      <FontAwesomeIcon icon={faHandHoldingUsd} size="1.5x" />
                    </button>

                    {/* handleClick permite editar en especifico */}
                    <button
                      onClick={(e) =>
                        handleClick(e, {
                          _id: turn._id,
                          name: turn.name,
                          nameDog: turn.nameDog,
                          phone: turn.phone,
                          notesTurn: turn.notesTurn,
                          date: turn.date,
                          time: turn.time,
                          index: index,
                          idClient:turn.idClient,
                          idDog:turn.idDog
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faPenSquare} size="1.5x" />
                    </button>

                    <button
                      class="buttonBo"
                      onClick={(e) =>
                        handleDelete(e, {
                          idTurn: turn._id,
                          index: index,
                        })
                      }
                      width="2rem"
                      height="2rem"
                      buttonColor="rgba(255, 0, 0, 1)"
                    >
                      <FontAwesomeIcon icon={faTrash} size="1.5x" />
                    </button>
                  </Options>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* //////////////////////////HISTORIAL MASCOTA /////////////////////////////////////*/}
      {editTurn ? (
        <>
          <div className="containerFormEdit">
            <Formik
              initialValues={{
                date: "",
                time: "",
                notesTurn: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.date) {
                  values.date = inputState.date;
                }

                if (!values.time) {
                  values.time = inputState.time;
                }

                if (!values.notesTurn) {
                  values.notesTurn = inputState.notesTurn;
                }

                //Letras y espacios, pueden llevar acentos.y Mayusuclas
                //Z0 es para numeros
                if (!values.date) {
                  errors.date = "Debe ingresar Fecha";
                }

                if (!values.time) {
                  errors.time = "Debe ingresar Horario";
                }


                //Letras, numeros, guion y guion_bajo-espacios y Mayusculas
                if (!/^[a-zA-Z0-9\_\-\s]{4,30}$/.test(values.notesTurn)) {
                  errors.notesTurn =
                    "30 caracteres max y no permite caracteres especiales";
                }

                //else if (
                //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                // ) {
                //   errors.email = "correo invalido";
                // }
                return errors;
              }}
              onSubmit={(values, { resetForm }) => {
                //console.log(values)

                // const payload = {};
                // for (const key in stateInput) {
                //   if (stateInput[key] !== undefined) {
                //     payload[key] = stateInput[key];
                //   }
                // }

                MySwal.fire({
                  title: "¡Turno actualizado!",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "rgb(21, 151, 67)",
                }).then((result) => {
                  if (result.isConfirmed) {
                    //dispatch(updateTurno(values, inputState._id)); //_id del turno
                    console.log(stateListTurn, "nuevo");

                    // setListTurn({
                    // date: values.date,
                    // notesTurn: values.notesTurn,
                    // time: values.time
                    // })

                    stateListTurn[inputState.index] = {
                      _id:inputState._id,
                      name: inputState.name,
                      nameDog: inputState.nameDog,
                      phone: inputState.phone,
                      date: values.date,
                      notesTurn: values.notesTurn,
                      idClient: inputState.idClient,
                      time: values.time,
                      idDog: inputState.idDog,
                    };
                    setEditTurn(!editTurn);
                    //resetForm()
                    //window.location.reload();
                    // listadoTurnos[inputState.index].,
                    // listadoTurnos[inputState.index].notesTurn=values.notesTurn,

                    //dispatch(getTurnos());
                    //console.log(inputState.index)
                    // console.log(values)
                    // console.log(inputState._id)//id del cliente
                  }
                });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form onSubmit={handleSubmit}>
                  <CloseButton onClick={(e) => handleClose(e)}>
                    <FontAwesomeIcon icon={faWindowClose} />
                  </CloseButton>

                  <InputContainer>
                    <Label>Fecha</Label>
                    <Field
                      className="input1"
                      type="date"
                      name="date"
                      placeholder={inputState.date}
                    />
                  </InputContainer>

                  <ErrorMessage
                    className="error"
                    name="date"
                    component={() => <div className="error">{errors.date}</div>}
                  ></ErrorMessage>

                  <InputContainer>
                    <Label>Horario</Label>
                    <Field
                      className="input1"
                      type="time"
                      name="time"
                      min="08:00"
                      max="22:00"
                      step="600"
                      placeholder={inputState.time}
                    />
                  </InputContainer>

                  <ErrorMessage
                    className="error"
                    name="time"
                    component={() => <div className="error">{errors.time}</div>}
                  ></ErrorMessage>

                  <InputContainer>
                    <Label>Nota Turno</Label>
                    <Field
                      className="input1"
                      placeholder={inputState.notesTurn}
                      type="text"
                      name="notesTurn"
                    />
                  </InputContainer>

                  <ErrorMessage
                    className="error"
                    name="notesTurn"
                    component={() => (
                      <div className="error">{errors.notesTurn}</div>
                    )}
                  ></ErrorMessage>
                  <ButtonModal type="submit">
                    Modificar Turno {inputState.nameDog}
                  </ButtonModal>
                </Form>
              )}
            </Formik>
          </div>
        </>
      ) : null}

      <br></br>
      {/* SELECTOR DE MASCOTAS PARA EL HISTORIAL */}
      {!stateInfo && !newTurno && !newClient && !newVentas && !newDog ? (
        <div className="container-lg P-2">
          <Select options={Listdogs} onChange={ChangeDog} />
        </div>
      ) : null}

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

                    <div className="grid-item">
                      <p>
                        <FontAwesomeIcon icon={faShieldDog} size="lg" />
                      </p>
                      <p>{vtaxClient.data.vta[0].Dog.raza}</p>
                    </div>

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

            <div className="container-lg table-responsive">
              {/* <td>{selectedDog.selectedDog.label}</td> */}

              <table className="table table-bordered table-hover table-dark">
                <thead class="thead-light table-secondary">
                  <tr>
                    <th>Value Serv</th>
                    <th>
                      Date{" "}
                      <FontAwesomeIcon
                        onClick={(e) => handleOrderHistDog(e)}
                        color={order ? "#FF846A" : "#A2DFFF"}
                        icon={faSortAlphaDown}
                        size="lg"
                        style={{ cursor: "pointer" }}
                      />
                    </th>
                    <th>Note Turne</th>
                    <th>Type Serv</th>
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
            <div className="container-lg P-2">
              <h5 className="alertHist">No existe historial de Mascota</h5>
            </div>
          </>
        )
      ) : null}
    </>
  );
}

export default AgendaTurnPrueba;
