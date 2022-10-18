import React, { useState, useEffect } from "react";
import arrayRazas from "../../components/jsonMascotas.json";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  Label,
  Label2,
  Label3,
  InputContainer,
  LabelCheck,
  InputContainerCheck,
} from "../../cssSyleComp/StyleForm";
import {
  Input1,
  Input2,
  SelectorStyle,
  InputCheck,
  Check,
} from "../../cssSyleComp/LandingStyles";
import {
  Overlay,
  ModalContainer,
  CloseButton,
  TitleAndButton,
  ButtonModal,
} from "../../cssSyleComp/ModalStyles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import {
  addTurnos,
  updateClient,
  updateTurno,
  addClient,
  getTurnos,
  getClients,
  asignedVentas,
  get_clients_id,
  addDog,
  updateDog,
} from "../../reducer/actions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import "./Modal.css";

// recibira los valores de lo parametros desde donde se lo invoque
// en este archivo de Modal recibira unos de estos 17 parametros desde donde se lo invoque
// no es necesario que reciba los 17 parametros ya que este archivo engloba todos los parametros posibles
// teniendo en cuenta que en este proyecto existen varios tipos de modales y se mostrara el indicado
// de acuerdo a los valores de los parametros que lñe ingresen en el momento de invocarlo
export default function Modal({
  state,
  setStateModal,

  label1, // nombre
  label2, // nombreDog
  label3, // phone
  label4, // date
  label5, // notesTurn
  label6, // address
  label7, // valorServ
  label8, // time
  label9, // notesCli
  label10, // nombrePerro
  label11, // noteP
  label12, // tipoServ
  label13, // efectivo
  label14, // trasnferencia
  label15, // tarjeta
  label16, //raza
  label17, //tamaño

  modalContainerBox,
  id, // es el que determinara que modal s eva a activar (modal a o b)
  // correspondera a modal "a"
  name,
  nameDog, //viene de agendaTurno para agendar turno
  phone,
  date,
  notesTurn,
  notesCli,
  // correspondera a otro modal "b"
  address,
  time,
  showInSettings, // determinara que se llame a la funcion get que traera datos actualizados
  // (funciona como refreh de pantalla)una vez que se concreto la funcion anterior(eliminar,argregar,ediat,ect)
  valorServ,
  tipoServ,
  idElement, // id del componente al que se le hizo click para que se renderize el
  idClient,

  // NEW DOG
  nameP,
  notaP,
  idDog, //viene de agendaTurno para agendar turno, Servira correspondientemente para pasarlo como parametro para el HISTORIAL DOG

  efectivo,
  transferencia,
  tarjeta,
  año,
  mes,
  raza,
  tamaño,

  index,
  stateHist,
  setStateHist,

  stateListTurn,
  setListTurn,
  stateInfo,
  setInfo

}) {
  console.log(stateListTurn)
  const dispatch = useDispatch();

  const arrayClients = [];
  const categoriesClients = useSelector((state) => state.allClients);

  const [selectedCli, setSelectedCli] = useState(null);
  const [selectedRaza, setSelectedRaza] = useState(null);
  //console.log(selectedRaza)
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  //LOS QUITO NO SE VA A UTILIZAR
  // const [isCheckedE, setIsCheckedE] = useState("false");
  // const [isCheckedT, setIsCheckedT] = useState("false");
  // const [isCheckedTar, setIsCheckedTar] = useState("false");

  //ESTADOR QUE CONTROLA LOS CHECK SELECCIONADOS EN EL MODAL DE INGRESO DE VENTAS
  const [visibleSelect, setVisibleSelect] = useState(true);
  const [visibleCheckE, setVisibleCheckE] = useState(false);
  const [visibleCheckB, setVisibleCheckB] = useState(false);
  const [visibleCheckT, setVisibleCheckT] = useState(false);
  //* *****************LISTADO CLIENT EN SELECT ADDTURNO ********************
  if (Array.isArray(categoriesClients)) {
    categoriesClients.map((cliente) => {
      const option = {
        value: cliente._id,
        label: cliente.name,
        label2: cliente.phone,
        label3: cliente.perros,
      };
      return arrayClients.push(option);
    });
  }

  //* ************************FIN ADD TURNO************************* */

  const MySwal = withReactContent(Swal);

  const [stateInput, setStateInput] = useState({
    // MODAL A
    name: "" || name,
    nameDog: "" || nameDog, //viene de agendaTurno para agendar turno
    phone: "" || phone,
    date: "" || date,
    notesTurn: "" || notesTurn,
    notesCli: "" || notesCli,
    // MODAL B
    address: "" || address,
    valorServ: "" || valorServ,
    idElement: "" || idElement,
    idClient: "" || idClient,
    time: "" || time,
    tipoServ: "" || tipoServ,
    // NEW DOG
    nameP: "" || nameP,
    notaP: "" || notaP,
    idDog: "" || idDog, //viene de agendaTurno para agendar turno(servira luego para el historial Dog)

    efectivo: "" || efectivo,
    transferencia: "" || transferencia,
    tarjeta: "" || tarjeta,
    año: "" || año,
    mes: "" || mes,
    raza: "" || raza,
    tamaño: "" || tamaño,
    index: "" || index,
  });

  console.log(stateInput);

  useEffect(() => {
    setStateInput({
      // MODAL A
      name,
      nameDog,
      phone,
      date,
      notesTurn,
      notesCli,
      // MODALB
      address,
      // MODAL C
      valorServ,
      tipoServ,
      idElement,
      idClient,
      time,
      // NEW DOG
      nameP,
      notaP,
      idDog,
      raza,
      tamaño,
      index,

      // efectivo:efectivo,
      // trasnferencia:transferencia,
      // tarjeta:tarjeta
    });
  }, [
    name,
    nameDog,
    phone,
    date,
    notesTurn,
    notesCli,
    address,
    valorServ,
    idElement,
    time,
    tipoServ,
    nameP,
    notaP,
    idDog,
    idClient,
    efectivo,
    transferencia,
    tarjeta,
    año,
    mes,
    raza,
    tamaño,
    index,
  ]);

  function handleChange(e) {
    setStateInput({
      ...stateInput,
      [e.target.name]: e.target.value,
    });
  }

  //console.log(stateInput);
  //* ********************************NEW DOG********************************************

  const selectClient = [];

  if (Array.isArray(categoriesClients)) {
    categoriesClients.map((cli) => {
      const option = { value: cli._id, label: cli.name };
      selectClient.push(option);
      return selectClient;
    });
  }

  const ListRazas = ["caniche", "labrador", "callejero", "doberman"];
  const selectRazas = [];

  if (Array.isArray(ListRazas)) {
    ListRazas.map((raza) => {
      const option = { value: raza, label: raza };
      selectRazas.push(option);
      return selectRazas;
    });
  }

  const ListSize = ["pequeño", "mediano", "grande"];
  const sizeSelect = [];

  if (Array.isArray(ListSize)) {
    ListSize.map((tam) => {
      const option = { value: tam, label: tam };
      sizeSelect.push(option);
      return sizeSelect;
    });
  }

  // ----------- en este caso imprimieria esto-------------------

  // {value: '6284e483d618910a4cb259f3', label: 'walter', label2: 35434, label3: Array(3)}
  // label: "walter"
  // label2: 35434
  // label3: (3) [{…}, {…}, {…}]
  // value: "6284e483d618910a4cb259f3"
  // [[Prototype]]: Object

  // FUNCIONES QUE INGRESAN AL FORM
  // EN ESTE CASO POR OBLIGACION INGRESA EL ESTADO COMO PARAMETRO
  // esta funcion servira para que se pueda imprimir o guardar el valor seleccionado del SELECT
  function handleChangeCli(selectedCli) {
    setSelectedCli({ selectedCli });
    // console.log(selectedCli.label3);
  }

  function handleChangeRaza(e) {
    const seleccion = e.target.value;
    setStateInput({ ...stateInput, raza: seleccion });
  }

  function handleChangeSize(e) {
    const seleccionS = e.target.value;
    setStateInput({ ...stateInput, tamaño: seleccionS });
  }

  function handleChangeDog(selectedDog) {
    setSelectedDog({ selectedDog });
  }
  //* **********************************FIN NEW DOG***********************************************
  // ADD CLIENT
  function handleSubmit(e) {
    // e.preventDefault();

    // INGRESAR VENTA

    // Update client

    //UPDATE TURNO
    if (id === 8) {
      // UPDATE TURNO
    }

    //EDIT DOG

    if (id === 10) {
      e.preventDefault();
      const payload = {};
      for (const key in stateInput) {
        if (stateInput[key] !== undefined) {
          payload[key] = stateInput[key];
        }
      }

      //console.log(payload);
      //dispatch(updateDog(payload, stateInput.idDog));

      MySwal.fire({
        title: "¡Mascota actualizada!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(21, 151, 67)",
      }).then((result) => {
        if (result.isConfirmed) {
          setStateHist(false);
          dispatch(getClients());
          setStateModal(!state);
          setStateInput({
            nameDog: "",
            raza: "",
            tamaño: "",
            notaP: "",
          });
        }
      });
    }
  }

  function handleClose(e) {
    setStateModal(!state);
    //SE COMEMTA ESTO DEBIDO A QUE CUANDO SE CIERRA EL MODAL Y SE VUELVE A ABRIR EN EL MISMO OBJETO
    //SE PIERDE LA INFORMACION TANTO EN EDITAR COMO EN MOSTRAR INFORMACION Y ESO ES LO QUE NO SE DESEA

    // setStateInput({
    //   ...stateInput,
    //   nameDog: "",
    //   phone: "",
    //   date: "",
    //   notesTurn: "",
    //   address: "",
    //   valorServ: "",
    //   notesCli: ""
    // });
    if(stateHist){
      setStateHist(!stateHist)
    }
    setVisibleSelect(!visibleSelect);
  }

  function functionVal() {
    let subtotal;
    if (stateInput.valorServ) {
      subtotal = stateInput.valorServ;
    } else subtotal = 0;

    if (stateInput.efectivo) {
      subtotal = subtotal - stateInput.efectivo;
    }
    if (stateInput.transferencia) {
      subtotal = subtotal - stateInput.transferencia;
    }
    if (stateInput.tarjeta) {
      subtotal = subtotal - stateInput.tarjeta;
    }
    return subtotal;
  }
  // <h5>Total: {stateInput.valorServ||stateInput.efectivo||stateInput.transferencia||stateInput.tarjeta?stateInput.valorServ-stateInput.efectivo-stateInput.transferencia-stateInput.tarjeta:null}</h5>

  function functionCheck() {
    var check1 = document.getElementById("check1");

    if (check1.checked == true) {
      setVisibleCheckE(!visibleCheckE);
    } else {
      setVisibleCheckE(!visibleCheckE);
    }
  }

  function functionCheck2() {
    var check2 = document.getElementById("check2");

    if (check2.checked == true) {
      setVisibleCheckB(!visibleCheckB);
    } else {
      setVisibleCheckB(!visibleCheckB);
    }
  }

  function functionCheck3() {
    var check3 = document.getElementById("check3");

    if (check3.checked == true) {
      setVisibleCheckT(!visibleCheckT);
    } else {
      setVisibleCheckT(!visibleCheckT);
    }
  }

  return (
    <div>
      <Overlay display={state ? "flex" : "none"}>
        <ModalContainer modalContainerBox={modalContainerBox} minwidth="270px">
          {/* minwidth="300px DETERMINA EL ANCHO DEL MODAL */}
          <TitleAndButton>
            <CloseButton onClick={(e) => handleClose(e)}>
              <FontAwesomeIcon icon={faWindowClose} />
            </CloseButton>
          </TitleAndButton>

          {/* ADD CLIENT */}
          {id === 1 ? (
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
                  if (!/^[a-zA-ZÀ-ÿ\s]{4,20}$/.test(values.name)) {
                    errors.name =
                      "No permite caracteres especiales y numeros Max 20";
                  }

                  if (!/^\d{7,14}$/.test(values.phone)) {
                    errors.phone = "Ingresar celular min 7 dig max 14";
                  }

                  if (!/^[a-zA-Z0-ZÀ-ÿ\s]{4,30}$/.test(values.address)) {
                    errors.address =
                      "30 caracteres max.No permite caracteres especiales";
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
                  //console.log(values)
                  dispatch(
                    addClient({
                      name: values.name,
                      phone: values.phone,
                      address: values.address,
                      notesCli: values.notesCli,
                      status: true,
                    })
                  );
                  // const objetoEnviar = {
                  //   name: values.name,
                  //   phone: values.phone,
                  //   address: values.address,
                  //   notesCli: values.notesCli
                  // };
                  //console.log(objetoEnviar, "------>");
                  MySwal.fire({
                    title: "¡Cliente creado correctamente!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(21, 151, 67)",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(getClients());
                      resetForm();
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
                    <InputContainer>
                      <Label>{label1}</Label>
                      <Field className="input1" type="text" name="name" />
                    </InputContainer>

                    <ErrorMessage
                      className="error"
                      name="name"
                      component={() => (
                        <div className="error">{errors.name}</div>
                      )}
                    ></ErrorMessage>

                    <InputContainer>
                      <Label>{label3}</Label>
                      <Field className="input1" type="number" name="phone" />
                    </InputContainer>

                    <ErrorMessage
                      className="error"
                      name="phone"
                      component={() => (
                        <div className="error">{errors.phone}</div>
                      )}
                    ></ErrorMessage>

                    <InputContainer>
                      <Label>{label6}</Label>
                      <Field className="input1" type="text" name="address" />
                    </InputContainer>

                    <ErrorMessage
                      className="error"
                      name="address"
                      component={() => (
                        <div className="error">{errors.address}</div>
                      )}
                    ></ErrorMessage>

                    <InputContainer>
                      <Label>{label9}</Label>
                      <Field className="input1" type="text" name="notesCli" />
                    </InputContainer>

                    <ErrorMessage
                      className="error"
                      name="notesCli"
                      component={() => (
                        <div className="error">{errors.notesCli}</div>
                      )}
                    ></ErrorMessage>

                    <ButtonModal type="submit">Agregar Cliente</ButtonModal>
                  </Form>
                )}
              </Formik>
            </div>
          ) : null}

          {/* ADD TURNO */}

          {/* ADD VENTAS */}

          {id === 3 ? (
            //   <h5>SubTotal: {functionVal()}</h5>
            //   {/* <h5>Total: {stateInput.valorServ||stateInput.efectivo||stateInput.transferencia||stateInput.tarjeta?stateInput.valorServ-stateInput.efectivo-stateInput.transferencia-stateInput.tarjeta:null}</h5> */}
            // </form>
            <Formik
              initialValues={{
                efectivo: "",
                transferencia: "",
                tarjeta: "",
                tipoServ: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.efectivo) {
                  values.efectivo = 0;
                }

                if (!values.transferencia) {
                  values.transferencia = 0;
                }

                if (!values.tarjeta) {
                  values.tarjeta = 0;
                }

                //Letras y espacios, pueden llevar acentos.y Mayusuclas
                //Z0 es para numeros

                if (!/^[a-zA-Z0-9\_\-\s]{1,30}$/.test(values.tipoServ)) {
                  errors.tipoServ =
                    "No permite caracteres especiales y numeros. Max 15";
                }

                if (!/^\d{1,4}$/.test(values.efectivo)) {
                  errors.efectivo = "Ingresar Efectivo. Max 4 digitos";
                }

                if (!/^\d{1,4}$/.test(values.transferencia)) {
                  errors.transferencia =
                    "Ingresar Transferencia. Max 4 digitos";
                }

                if (!/^\d{1,4}$/.test(values.tarjeta)) {
                  errors.tarjeta = "Ingresar Tarjeta. Max 4 digitos";
                }

                return errors;
              }}
              onSubmit={(values, { resetForm }) => {
               
                const fecha = new Date(stateInput.date);
                // console.log(fecha,"sadsa")
                const año = fecha.getFullYear();
                const mes = fecha.getMonth() + 1;
                const valorServ=values.efectivo+values.tarjeta+values.transferencia
                // const venta={
                //   date: stateInput.date,
                //   idTurno: stateInput.idElement,
                //   name: stateInput.name,
                //   nameDog: stateInput.nameDog,
                //   idDog: stateInput.idDog,
                //   notesTurn: stateInput.notesTurn,
                //   tipoServ: values.tipoServ,
                //   valorServ: valorServ,
                //   transferencia: values.transferencia,
                //   tarjeta: values.tarjeta,
                //   efectivo: values.efectivo,
                //   año,
                //   mes,
                // }
                //console.log(venta)

                dispatch(
                  asignedVentas(
                    {
                      date: stateInput.date,
                      idTurno: stateInput.idElement,
                      name: stateInput.name,
                      nameDog: stateInput.nameDog,
                      idDog: stateInput.idDog,
                      notesTurn: stateInput.notesTurn,
                      tipoServ: values.tipoServ,
                      valorServ: valorServ,
                      transferencia: values.transferencia,
                      tarjeta: values.tarjeta,
                      efectivo: values.efectivo,
                      año,
                      mes,
                    },
                    idClient
                  )
                );
          
                MySwal.fire({
                  title: "¡Venta guardada correctamente!",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "rgb(21, 151, 67)",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setStateModal(!state);
                    stateListTurn.splice(stateInput.index, 1);
                    // setStateInput({
                    //   valorServ: "",
                    //   tipoServ: "",
                    //   index: "",
                    // });
                    resetForm()
                    setInfo(!stateInfo)
                  }
                  dispatch(getTurnos());

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
            
                  {/* EFECTIVO */}
                  <InputContainerCheck>
                    <input
                      type="checkbox"
                      className="inputCheck"
                      id="check1"
                      onClick={() => functionCheck()}
                    />
                    <label>{label13}</label>
                    {visibleCheckE ? (
                      <Field
                      className="inputIngresos"
                        type="number"
                        name="efectivo"
                        placeholder="Efectivo"
                      />
                    ) : null}
                  </InputContainerCheck>
                  <ErrorMessage
                    className="error"
                    name="efectivo"
                    component={() => (
                      <div className="error">{errors.efectivo}</div>
                    )}
                  ></ErrorMessage>
                  {/* TRANSFERENCIA */}
                  <InputContainerCheck>
                    {/* <LabelCheck>{label14}</LabelCheck> */}
                    <input
                      type="checkbox"
                      className="inputCheck"
                      id="check2"
                      onClick={() => functionCheck2()}
                    />
                    <label>Banco</label>
                    {visibleCheckB ? (
                      <Field
                        type="number"
                        className="inputIngresos"
                        name="transferencia"
                        placeholder="Transferencia"
                      />
                    ) : null}
                  </InputContainerCheck>

                  <ErrorMessage
                    className="error"
                    name="Banco"
                    component={() => (
                      <div className="error">{errors.transferencia}</div>
                    )}
                  ></ErrorMessage>

                  {/* TARJETA */}
                  <InputContainerCheck>
                    <div className="containerCheck">
                      {/* <LabelCheck>{label15}</LabelCheck> */}
                      <input
                        type="checkbox"
                        className="inputCheck"
                        id="check3"
                        onChange={(e) => functionCheck3(e)}
                      />
                      <label>Tarjeta</label>
                      {visibleCheckT ? (
                        <Field
                          type="number"
                          className="inputIngresos"
                          name="tarjeta"
                          placeholder="tarjeta"
                        />
                      ) : null}
                    </div>
                  </InputContainerCheck>
                  <ErrorMessage
                    className="error"
                    name="tarjeta"
                    component={() => (
                      <div className="error">{errors.tarjeta}</div>
                    )}
                  ></ErrorMessage>
                  <InputContainerCheck>
                    <Label>Tipo de Servicio</Label>
                    <Field
                      className="input1"
                      type="text"
                      name="tipoServ"
                      required
                    />
                  </InputContainerCheck>
                  <ErrorMessage
                    className="error"
                    name="tipoServ"
                    component={() => (
                      <div className="error">{errors.tipoServ}</div>
                    )}
                  ></ErrorMessage>

                  <ButtonModal type="submit">Ingresar Venta</ButtonModal>
                </Form>
              )}
            </Formik>
          ) : null}

          {/* INFORMACION ADICIONA CLIENTE */}
          {id === 4 ? (
            <form>
              <Label>Nombre del Cliente</Label>
              <Label2>{stateInput.name}</Label2>
              <Label>Celular Cliente</Label>
              <Label2>{stateInput.phone}</Label2>
              <Label>Notas Adicional</Label>
              <Label2>{stateInput.notesTurn}</Label2>
            </form>
          ) : null}

          {id === 9 ? (
            <form>
              <InputContainer>
                <Label>{label1}</Label>
                <Input1
                  type="text"
                  name="name"
                  value={stateInput.name}
                  onChange={(e) => handleChange(e)}
                />
              </InputContainer>

              <InputContainer>
                <Label>{label3}</Label>
                <Input1
                  type="text"
                  name="phone"
                  value={stateInput.phone}
                  onChange={(e) => handleChange(e)}
                />
              </InputContainer>

              <InputContainer>
                <Label>{label5}</Label>

                <Input1
                  type="text"
                  name="address"
                  required
                  value={stateInput.address}
                  onChange={(e) => handleChange(e)}
                />
              </InputContainer>

              <InputContainer>
                <Label>{label9}</Label>

                <Input1
                  type="text"
                  name="notesCli"
                  required
                  value={stateInput.notesCli}
                  onChange={(e) => handleChange(e)}
                />
              </InputContainer>
            </form>
          ) : null}

          {/* UPDATE DOG */}
          {id === 10 ? (
            <Formik
              initialValues={{
                nameDog: "",
                notaP: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.nameDog) {
                  values.nameDog = stateInput.nameDog;
                }

                //Letras y espacios, pueden llevar acentos.y Mayusuclas
                //Z0 es para numeros

                if (!/^[a-zA-ZÀ-ÿ\s]{3,10}$/.test(values.nameDog)) {
                  errors.nameDog =
                    "No permite caracteres especiales y numeros.Max 10";
                }

                if (!values.notaP) {
                  values.notaP = stateInput.notaP;
                }

                //Letras, numeros, guion y guion_bajo-espacios y Mayusculas
                if (!/^[a-zA-Z0-9\_\-\s]{4,30}$/.test(values.notaP)) {
                  errors.notaP =
                    "30 caracteres max y no permite caracteres especiales";
                }
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
                const payload = {
                  nameDog: values.nameDog,
                  notaP: values.notaP,
                  tamaño: stateInput.tamaño,
                  raza: stateInput.raza,
                };
                //console.log(payload)
                dispatch(updateDog(payload, stateInput.idDog));
                MySwal.fire({
                  title: "¡Mascota actualizada!",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                  confirmButtonColor: "rgb(21, 151, 67)",
                }).then((result) => {
                  if (result.isConfirmed) {
                    if (showInSettings) {
                      dispatch(getClients());
                    }
                    setStateModal(!state);
                    setStateHist(!stateHist);
                    setStateInput({
                      nameDog: "",
                      raza: "",
                      tamaño: "",
                      notaP: "",
                    });
                    resetForm();
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
                  <InputContainer>
                    <Label>{label10}</Label>
                    <Field
                      className="input1"
                      type="text"
                      name="nameDog"
                      placeholder={stateInput.nameDog}
                    />
                  </InputContainer>

                  <ErrorMessage
                    className="error"
                    name="nameDog"
                    component={() => (
                      <div className="error">{errors.nameDog}</div>
                    )}
                  ></ErrorMessage>

                  <InputContainer>
                    <Label>{label11}</Label>
                    <Field
                      className="input1"
                      type="text"
                      name="notaP"
                      placeholder={stateInput.notaP}
                    />
                  </InputContainer>

                  <ErrorMessage
                    className="error"
                    name="notaP"
                    component={() => (
                      <div className="error">{errors.notaP}</div>
                    )}
                  ></ErrorMessage>

                  {/* ESTE SELECT AGARRA EL VALOR DE LA MASCOTA Y SE POSICIONA DINAMICAMENTEEN EL VALOR DEL MISMO(SE AUTOSELECCIONA) */}
                  <Label>{label16}</Label>
                  <SelectorStyle id="raza" onClick={handleChangeRaza}>
                    {stateInput.raza === "doberman" ? (
                      <option selected value="doberman">
                        doberman
                      </option>
                    ) : (
                      <option value="doberman">doberman</option>
                    )}
                    {stateInput.raza === "labrador" ? (
                      <option selected value="labrador">
                        labrador
                      </option>
                    ) : (
                      <option value="labrador">labrador</option>
                    )}
                    {stateInput.raza === "caniche" ? (
                      <option selected value="caniche">
                        caniche
                      </option>
                    ) : (
                      <option value="caniche">caniche</option>
                    )}
                  </SelectorStyle>
                  <Label>{label17}</Label>
                  <SelectorStyle
                    id="tamaño"
                    //value={stateInput.tamaño}
                    onClick={handleChangeSize}
                  >
                    {stateInput.tamaño === "pequeño" ? (
                      <option selected value="pequeño">
                        pequeño
                      </option>
                    ) : (
                      <option value="pequeño">pequeño</option>
                    )}
                    {stateInput.tamaño === "mediano" ? (
                      <option selected value="mediano">
                        mediano
                      </option>
                    ) : (
                      <option value="mediano">mediano</option>
                    )}
                    {stateInput.tamaño === "grande" ? (
                      <option selected value="grande">
                        grande
                      </option>
                    ) : (
                      <option value="grande">grande</option>
                    )}
                  </SelectorStyle>
                  <ButtonModal type="submit">Modificar Mascota</ButtonModal>
                </Form>
              )}
            </Formik>
          ) : null}

          {/* <ButtonModal width="100%" onClick={(e) => handleSubmit(e)}>
            INGRESAR
          </ButtonModal> */}
        </ModalContainer>
      </Overlay>
    </div>
  );
}
