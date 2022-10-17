//https://www.youtube.com/watch?v=ZF8IL1ldfdo&ab_channel=SiCode
import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getClients,
  deleteClient,
  updateClient,
  deleteDog,
} from "../reducer/actions";
import "./ListClients.css";


import HistorialClient from "./HistorialClient";
import Modal from "./Modal/Modal";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CloseButton } from "../cssSyleComp/ModalStyles";
import { Label, InputContainer } from "../cssSyleComp/StyleForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

//FUNCION QUE UTILIZA EL INPUT PARA BUSCAR UN CLIENTE

function searchCli(busc) {
  //console.log(busc)
  return function (x) {
    return x.name.toLowerCase().includes(busc) | !busc;
  };
}

function ListClients() {
  const MySwal = withReactContent(Swal);
  var clients = useSelector((state) => state.allClients);
  //console.log(clients,"listado")

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
    index:"",
    status:""

  });
  //console.log(inputState);

  useEffect(() => {
    dispatch(getClients());
  },[]);

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
      status:""
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

    if(!stateHist){
      setStateHist(!stateHist)
    }
    setInputState({
      _id: props._id,
      name: props.name,
      phone: props.phone,
      address: props.address,
      notesCli: props.notesCli,
      arrayDogs: props.arrayDogs,
      arrayPedidos: props.arrayPedidos,
      index:props.index,
      status:props.status
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

  function handleDelete({idClient,index}) {
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
          if(stateHist){
            setStateHist(!stateHist)
          }

          //al eliminar el cliente se cambia statInfo de manera de que no se visualize los input de edicion
          if(stateInfo){
            setInfo(!stateInfo)
          }

          //setStateClients(stateClients[index].status=false)
        
      
          //console.log(stateClients[index],"cliente elminado")
          //al eliminar un cliente quedan los botones ediat y cancelar y ademas queda guardado en el estado el id del cliente eliminado
          //por tanto se puede hacer click en los botones ya quye estan haciendo referencia al id de un cliente (en este caso del eliminado)
          //por tanto se blanquea el id al eliminar dicho cliente
          setInputState({
            id:""
          })
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

  function handleChangeCli(selectedCli) {
    //console.log(selectedCli)
    setSearch(selectedCli.value);
  }
  
  const handleClose = () => {
    if (editClient) {
      setEditClient(!editClient);
    }
    console.log("se hizo click");
  };

  return (
    <div>
      <h1>List of Clients</h1>
      <div className="grid-container container">
        <button className="button1" onClick={() => setNewClient(!newClient)}>
          Añadir Cliente
        </button>
        {/* <button className="button2">Back Home</button> */}
        <Link to="/">
          <button className="button1">Back Home</button>
        </Link>
      </div>

      <div className="container-lg table-responsive">
        <div className="containerSearch">
          <input
            className="inputBuscar"
            type="text"
            name="search"
            placeholder="Buscar Cliente"
            //value={stateSearch.busqueda}
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

      <Modal
        id={1}
        state={newClient}
        setStateModal={setNewClient}
        title="Crear un Cliente"
        label1="Nombre Cliente"
        // label2="Name Dog"
        label3="Phone"
        label6="Address"
        label9="Note Client"
        modalContainerBox
        showInSettings
      />


      {/* <AgendaInputs></AgendaInputs> */}
      <br />
      {clients? (
        // HOVER para que semarque con el cursor
        // BODERED para que se marquen los bordes de las columnas
        <div className="container-lg table-responsive">
          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-dark">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                {/* <th>Notes</th> */}
                {/* <th>Option</th> */}
              </tr>
            </thead>
            <tbody>
              {clients
                ? clients.filter(searchCli(stateSearch)).map((cli,index) =>
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
                              index:index,
                              status:cli.status
                            })
                          }
                        >
                          {cli.name}
                        </td>
                        <td>{cli.phone}</td>
                        <td>{cli.address}</td>
                      </tr>
                    ) : null
                  )
                : null}
            </tbody>
          </table>
        </div>
      ) : null}

{stateHist?
 <div className="container-lg table-responsive">
 <h5 className="tituloH">Historial del Cliente: {inputState.name}</h5>
 <HistorialClient state={inputState} stateHist={stateHist} setStateHist={setStateHist} />
 <div className="containerButton">
          <button
            onClick={() => handleDelete({idClient:inputState._id,index:inputState.index})}
            className="buttonDel"
          >
            Eliminar Cliente
          </button>
          <button
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
            className="buttonEdi"
          >
            Editar Cliente
          </button>
        </div>
</div>
:null}
     


{/* FORMULARIO PARA EDICION  */}
        <div className="containerForm">
          {editClient && stateInfo ? (
            //<SettingClient/>
            <div>
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  address: "",
                  notesCli: "",
                }}
                validate={(values) => {
                  const errors = {};

                  //Letras y espacios, pueden llevar acentos.y Mayusuclas
                  //Z0 es para numeros
                  if (!values.name) {
                    values.name = inputState.name;
                  }

                  if (!/^[a-zA-ZÀ-ÿ\s]{1,20}$/.test(values.name)) {
                    errors.name =
                      "No permite caracteres especiales y numeros.Max 15";
                  }

                  if (!values.phone) {
                    values.phone = inputState.phone;
                  }

                  if (!/^\d{7,14}$/.test(values.phone)) {
                    errors.phone = "Ingresar celular min 7 dig max 14";
                  }

                  if (!values.address) {
                    values.address = inputState.address;
                  }

                  if (!/^[a-zA-Z0-ZÀ-ÿ\s]{4,30}$/.test(inputState.address)) {
                    errors.address =
                      "30 caracteres max.No permite caracteres especiales";
                  }

                  if (!values.notesCli) {
                    values.notesCli = inputState.notesCli;
                  }

                  //Letras, numeros, guion y guion_bajo-espacios y Mayusculas
                  if (!/^[a-zA-Z0-9\_\-\s]{4,30}$/.test(values.notesCli)) {
                    errors.notesCli =
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
                  console.log(values);

                  //console.log(inputState._id)
                  dispatch(
                    updateClient(
                      {
                        name: values.name,
                        phone: values.phone,
                        address: values.address,
                        notesCli: values.notesCli,
                      },
                      inputState._id
                    )
                  );
                  setInfo(!stateInfo);
                  MySwal.fire({
                    title: "¡Cliente Actualizado!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(21, 151, 67)",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(getClients());

                      //si no comento esto al modificar un cliemte tira error de historial de cliente
                      // setInputState({
                      //   name: values.name,
                      //   phone: values.phone,
                      //   address: values.address,
                      //   notesCli: values.notesCli,
                      // });
                      resetForm();
                      //se cambia el estado de stateHisto al modificar un cliente de manera de que no se visualize 
                      //los datos anteriores previos al modificar el cliente, de lo contrario habia que hacer click en cualquier otro
                      //lado para porder ver los cambios actuales
                      setStateHist(!stateHist)
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
                      <Label>Nombre Cliente</Label>
                      <Field
                        className="input1"
                        placeholder={inputState.name}
                        type="text"
                        name="name"
                      />
                    </InputContainer>

                    <ErrorMessage
                      className="error"
                      name="name"
                      component={() => (
                        <div className="error">{errors.name}</div>
                      )}
                    ></ErrorMessage>

                    <InputContainer>
                      <Label>Celular</Label>
                      <Field
                        className="input1"
                        placeholder={inputState.phone}
                        type="number"
                        name="phone"
                      />
                    </InputContainer>

                    <ErrorMessage
                      className="error"
                      name="phone"
                      component={() => (
                        <div className="error">{errors.phone}</div>
                      )}
                    ></ErrorMessage>

                    <InputContainer>
                      <Label>Direccion</Label>
                      <Field
                        className="input1"
                        placeholder={inputState.address}
                        type="text"
                        name="address"
                      />
                    </InputContainer>

                    <ErrorMessage
                      className="error"
                      name="address"
                      component={() => (
                        <div className="error">{errors.address}</div>
                      )}
                    ></ErrorMessage>

                    <InputContainer>
                      <Label>Nota Cliente</Label>
                      <Field
                        className="input1"
                        placeholder={inputState.notesCli}
                        type="text"
                        name="notesCli"
                      />
                    </InputContainer>

                    <ErrorMessage
                      className="error"
                      name="notesCli"
                      component={() => (
                        <div className="error">{errors.notesCli}</div>
                      )}
                    ></ErrorMessage>

                    <button className="buttonEditClient" type="submit">Modificar Cliente</button>
                  </Form>
                )}
              </Formik>
            </div>
          ) : null}
        </div>
  
    </div>
  );
}

export default ListClients;
