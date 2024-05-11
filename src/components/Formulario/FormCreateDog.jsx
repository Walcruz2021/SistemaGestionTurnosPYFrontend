import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { addDog, getClients } from "../../reducer/actions";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
//import { useHistory } from "react-router-dom"
import {} from "react-router-dom";
import Select from "react-select";
import "./FormCreateDog.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Label, InputContainer } from "../../cssSyleComp/StyleForm";
import { ButtonTurno2, ButtonTurno } from "../../cssSyleComp/LandingStyles";

const Forms1 = () => {
  //let history = useHistory()
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.allClients);
  //console.log(clientes);
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  //* *****************LISTADO CLIENT EN SELECT addDog ********************

  var arrayClients = [];
  if (Array.isArray(clientes)) {
    clientes.map((cliente, i) => {
      var option = {
        value: cliente._id,
        label: cliente.name,
      };
      arrayClients.push(option);
    });
  }

  //#################################################CARGA DE RAZAS#################################
  const ListRazas = ["caniche", "labrador", "callejero", "doberman"];
  const selectRazas = [];
  if (Array.isArray(ListRazas)) {
    ListRazas.map((raza) => {
      const option = { value: raza, label: raza };
      selectRazas.push(option);
      return selectRazas;
    });
  }

  //############################################CARGA DE TMAÑOS DE PERROS###########################
  const ListSize = ["pequeño", "mediano", "grande"];
  const sizeSelect = [];

  if (Array.isArray(ListSize)) {
    ListSize.map((tam) => {
      const option = { value: tam, label: tam };
      sizeSelect.push(option);
      return sizeSelect;
    });
  }

  //console.log(arrayClients,"----->")

  //STATE DE VALORES QUE SE ELIGEN EN EL SELECT

  const [stateInput, setStateInput] = useState({
    idClient: "",
    raza: "",
    tamaño: "",
  });

  console.log(stateInput);

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
    setStateInput({ ...stateInput, idClient: selected.value });
  }

  function handleChangeRaza(selected) {
    setStateInput({ ...stateInput, raza: selected.value });
  }

  function handleChangeTam(selected) {
    setStateInput({ ...stateInput, tamaño: selected.value });
  }

  return (
    <div>
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
          placeholder="Seleccione Raza"
          onChange={(e) => {
            handleChangeRaza(e);
          }}
          options={selectRazas}
        />

        <Select
          className="classSelect"
          placeholder="Seleccione Tamaño"
          onChange={(e) => {
            handleChangeTam(e);
          }}
          options={sizeSelect}
        />

        <Formik
          initialValues={{
            nameDog: "",
            notaP: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.nameDog) {
              errors.nameDog = "por favor ingresar nombre de Mascota";
            }

            //Letras y espacios, pueden llevar acentos.y Mayusuclas
            //Z0 es para numeros
            if (!/^[a-zA-ZÀ-ÿ\s]{1,15}$/.test(values.nameDog)) {
              errors.nameDog =
                "no se permite ingresar mas de 15 caracteres y caracteres especiales";
            }

            if (!values.notaP) {
              errors.notaP = "por favor ingresar nota de Mascota";
            }

            if (!/^[a-zA-Z0-ZÀ-ÿ\s]{1,50}$/.test(values.notaP)) {
              errors.notaP =
                "no se permite ingresar mas de 50 caracteres y caracteres especiales";
            }

            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            dispatch(
              addDog(
                {
                  raza: stateInput.raza,
                  tamaño: stateInput.tamaño,
                  nameDog: values.nameDog,
                  notaP: values.notaP,
                  status: true,
                },
                stateInput.idClient
              )
            );

            console.log(values);
            MySwal.fire({
              title: "¡Mascota creada correctamente!",
              icon: "success",
              confirmButtonText: "Aceptar",
              confirmButtonColor: "rgb(21, 151, 67)",
            }).then((result) => {
              if (result.isConfirmed) {
                //window.location.reload() RESFRESCA LA PAGINA
                //window.location.reload();
                dispatch(getClients());
                resetForm();
                //history.push("/home")
                //<Redirect to='/home'/>
                //<Route path="*" element={<Navigate to ="/" />}/>
                const element = <Navigate to="/home" />;
                return element;
              }
            });
          }}
        >
          {({
            errors,
            handleSubmit,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Label>Nombre de Mascota</Label>
              <Field className="input1" type="text" name="nameDog" />

              <ErrorMessage
                className="error"
                name="nameDog"
                component={() => <div className="error">{errors.nameDog}</div>}
              ></ErrorMessage>

              <Label>Nota Dog</Label>
              <Field className="input1" type="text" name="notaP" />

              <ErrorMessage
                className="error"
                name="notaP"
                component={() => <div className="error">{errors.notaP}</div>}
              ></ErrorMessage>

              {stateInput.idClient && stateInput.raza && stateInput.tamaño ? (
                <ButtonTurno type="submit">Agregar Mascota</ButtonTurno>
              ) : (
                <ButtonTurno2 disabled>Agregar Mascota</ButtonTurno2>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Forms1;
