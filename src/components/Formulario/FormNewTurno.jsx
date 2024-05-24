import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { getTurnos, addTurnos } from "../../reducer/actions";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Formulario.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Label,
  //Label2,a eliminar
  Label3,
  InputContainer,
  //LabelCheck, a eliminar
  //InputContainerCheck,a eliminar
} from "../../cssSyleComp/StyleForm";
import {
  //Input1,
  //Input2,
  //SelectorStyle, todos a eliminar
  //InputCheck,
  //Check,
  ButtonTurno2,
  ButtonTurno,
} from "../../cssSyleComp/LandingStyles";

const Forms1 = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.allClients);
  //console.log(clientes);

  //LISTADO DE TURNOS
  const turnos = useSelector((state) => state.allTurnos);
  const idCompany = "66465ac8c1212f4dc0088087";
  //comprobar pero no tiene sentido voolver a pedir los clientes
  //despues de apretar el boton de agregar turno
  //   useEffect(() => {
  //   dispatch(getClients());
  // }, [dispatch]);

  //* *****************LISTADO CLIENT EN SELECT ADDTURNO ********************

  var arrayClients = [];
  if (Array.isArray(clientes)) {
    let arrayDogs = [];
    clientes.map((cliente, i) => {
      //se realiza un filtrado ya que treae todos los perros en general y no solos los de status true
      if (cliente.perros.length > 0) {
        arrayDogs = cliente.perros.filter((dog) => {
          if (dog.status === true) {
            return dog;
          }
        });
        var option = {
          idvalue: i,
          value: cliente._id,
          label: cliente.name,
          label2: cliente.phone,
          label3: arrayDogs,
        };
      } else {
        option = {
          idvalue: i,
          value: cliente._id,
          label: cliente.name,
          label2: cliente.phone,
          label3: [],
        };
      }
      arrayClients.push(option);
    });
  }

  //console.log(arrayClients,"----->")

  //STATE DE VALORES QUE SE ELIGEN EN EL SELECT
  const [selectedCliDogs, setSelectedCliDogs] = useState({
    idClient: "",
    name: "",
    arrayDogs: [],
    phone: "",
  });

  const [refrescar, setRefrescar] = useState(false);

  //console.log(refrescar)
  //   useEffect(() => {
  //   dispatch(getClients());
  // }, [dispatch]);

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


  //console.log(stateInput)

  function handleChangeDog(selected) {
    setStateInput({
      ...stateInput,
      nameDog: selected.label,
      idDog: selected.value,
    });
  }
  //console.log(stateDogSelected);

  function handleChangeCli(selected) {
    //(3) agarrara el cliente seleccionado y cambiara el estado en donde se guardara el iCliente,nombre,array de perrosm y telefono
    //(4) ademas guaradara en otro estado el id del array de clientes seleccionado (ej=si se eligio walter al ser el primero el idValue=0)

    console.log(selected);
    //ES EL CLIENTE SELECCIONADO
    //{idvalue: 0, value: '6284e483d618910a4cb259f3', label: 'Walter', label2: 35434342543, label3: Array(3)}
    //idvalue:0
    //label:"Walter"
    //label2:35434342543
    //label3:(3) [{…}, {…}, {…}]
    //value:"6284e483d618910a4cb259f3"

    setStateInput({
      ...stateInput,
      idClient: selected.value,
      name: selected.label,
      arrayDogs: selected.label3,
      phone: selected.label2,
      nameDog: "",
      idDog: "",
    });

    // setStateInput({...stateInput,
    //   nameDog: "",
    //   idDog: "",
    // });
  }

  //------------------------------FUNCION QUE SE ENCARGA DE CARGAR MASCOTAS A UN ARRAY PARA SU POSTERIOR SELECT-------------------------

  function selectDog(arrayDog) {
    //console.log(arrayDog, "mascota del ultimo cliente");
    const optionSelectPerro = [];

    if (arrayDog && arrayDog.length > 0) {
      //console.log(arrayDog)
      arrayDog.map((np) => {
        const option = { label: np.nameDog, value: np._id };
        optionSelectPerro.push(option);
      });

      return optionSelectPerro;
    }
  }

  //optionList ES EL LISTADO DE MASCOTAS (id y name)
  //(5)se guarda en una vble= la invocacion a la funcion selectDog y se le pasa como parametro el array de perros segun cliente seleccionado
  const optionsList = selectDog(stateInput.arrayDogs);

  //console.log(optionsList);
  //value:'628ae836d66d1f4760a023a6' es el id de la mascota
  // 0: {label: 'jimena', value: '628ae836d66d1f4760a023a6'}
  // 1: {label: 'dalila 3', value: '628ae8c5d66d1f4760a023be'}

  const company = "66465ac8c1212f4dc0088087";

  return (
    <div>
      <Select
        className="classSelect"
        placeholder="Seleccione Client"
        onChange={(e) => {
          handleChangeCli(e);
        }}
        options={arrayClients}
      />

      <Select
        className="classSelect"
        placeholder="Seleccione Mascota"
        onChange={(e) => {
          handleChangeDog(e);
        }}
        options={optionsList}
      />
      <Formik
        initialValues={{
          notesTurn: "",
          date: "",
          time: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!/^[a-zA-Z0-ZÀ-ÿ\s]{1,50}$/.test(values.notesTurn)) {
            errors.notesTurn =
              "no se permite ingresar mas de 50 caracteres y caracteres especiales";
          }

          if (!values.time) {
            errors.time = "por favor ingresar horario de turno";
          }
          //else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = "correo invalido";
          // }

          if (!values.date) {
            errors.date = "por favor ingresar fecha de turno";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(
            addTurnos({
              name: stateInput.name,
              nameDog: stateInput.nameDog,
              idDog: stateInput.idDog,
              date: values.date,
              notesTurn: values.notesTurn,
              idClient: stateInput.idClient,
              time: values.time,
              phone: stateInput.phone,
              Company: company,
            })
          );

          MySwal.fire({
            title: "¡Turno creado correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(getTurnos(idCompany));
              //dispatch(get_clients_id(stateInput.idClient));
              setStateInput({
                name: "",
                nameDog: "",
                idDog: "",
                date: "",
                notesTurn: "",
                idClient: "",
                time: "",
                phone: "",
              });
              //window.location.reload() RESFRESCA LA PAGINA
              window.location.reload();
              //setRefrescar(!refrescar);
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
              <Label>Nota Turno</Label>
              <Field className="input1" type="text" name="notesTurn" />
            </InputContainer>

            <ErrorMessage
              className="error"
              name="notesTurn"
              component={() => <div className="error">{errors.notesTurn}</div>}
            ></ErrorMessage>

            <InputContainer>
              <Label3>Fecha</Label3>
              <Field className="input2" type="date" name="date" />
            </InputContainer>

            <ErrorMessage
              className="error"
              name="date"
              component={() => <div className="error">{errors.date}</div>}
            ></ErrorMessage>

            <InputContainer>
              <Label3>Tiempo</Label3>
              <Field
                className="input2"
                type="time"
                name="time"
                min="08:00"
                max="22:00"
                step="600"
              />
            </InputContainer>

            <ErrorMessage
              className="error"
              name="time"
              component={() => <div className="error">{errors.time}</div>}
            ></ErrorMessage>

            <div></div>

            {stateInput.name && stateInput.nameDog ? (
              <ButtonTurno type="submit">Agregar Turno</ButtonTurno>
            ) : (
              <ButtonTurno2 disabled>Agregar Turno</ButtonTurno2>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forms1;
