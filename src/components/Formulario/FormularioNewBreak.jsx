import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { getTurnos, addBreak } from "../../reducer/actions";
import React, { useState, useEffect } from "react";

import "./Formulario.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Label,
  Label2,
  Label3,
  InputContainer,
} from "../../cssSyleComp/StyleForm";
import { ButtonTurno2, ButtonTurno } from "../../cssSyleComp/LandingStyles";

const Forms1 = () => {
  const idAdmin = "64890fd655ed5315f8686640";
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const [refrescar, setRefrescar] = useState(false);

  const [stateInput, setStateInput] = useState({
    notesBreak: "",
    date: "",
    ourEntry: "",
    timeBreak: "",
  });
  console.log(stateInput, "----> ESTADO IINPUT");

  return (
    <div>
      <Formik
        initialValues={{
          notesBreak: "",
          date: "",
          ourEntry: "",
          timeBreak: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!/^[a-zA-Z0-ZÀ-ÿ\s]{1,50}$/.test(values.notesBreak)) {
            errors.notesBreak =
              "no se permite ingresar mas de 50 caracteres y caracteres especiales";
          }

          if (!values.date) {
            errors.date = "por favor ingresar fecha de break";
          }

          if (!values.ourEntry) {
            errors.ourEntry = "por favor ingresar horario de break";
          }

          if (!values.timeBreak) {
            errors.timeBreak = "por favor ingresar cantidad de horas de break";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(
            addBreak({
              notesBreak: values.notesBreak,
              date: values.date,
              ourEntry: values.ourEntry,
              timeBreak: values.timeBreak,
              idAdmin: idAdmin,
            })
          );

          MySwal.fire({
            title: "¡Descanso creado correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(getTurnos());
              //dispatch(get_clients_id(stateInput.idClient));
              setStateInput({
                notesBreak: "",
                date: "",
                ourEntry: "",
                timeBreak: "",
              });
              //window.location.reload() RESFRESCA LA PAGINA
              window.location.reload();
              setRefrescar(!refrescar);
              resetForm();
            }
          });
        }}
      >
        {({
          errors,
          handleSubmit,
          values
          /* and other goodies */
        }) => (
          
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Label>Nota Descanso</Label>
              <Field className="input1" type="text" name="notesBreak" />
            </InputContainer>

            <ErrorMessage
              className="error"
              name="notesBreak"
              component={() => <div className="error">{errors.notesBreak}</div>}
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
                name="ourEntry"
                min="08:00"
                max="22:00"
                step="600"
              />
            </InputContainer>

            <ErrorMessage
              className="error"
              name="ourEntry"
              component={() => <div className="error">{errors.ourEntry}</div>}
            ></ErrorMessage>

            <InputContainer>
              <Label3>Fin de descanso</Label3>
              <Field
                className="input2"
                type="number"
                name="timeBreak"
                step="9"
              />
            </InputContainer>

            <ErrorMessage
              className="error"
              name="timeBreak"
              component={() => <div className="error">{errors.timeBreak}</div>}
            ></ErrorMessage>

            { values.timeBreak && values.date && values.ourEntry? (
              <ButtonTurno type="submit">Agregar Descanso</ButtonTurno>
            ) : (
              <ButtonTurno2 disabled>Agregar Descanso</ButtonTurno2>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forms1;
