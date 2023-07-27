import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { loginUser} from "../../reducer/actions";
import React, { useState, useEffect } from "react";

import "./FormularioLogin.css";
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
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const [refrescar, setRefrescar] = useState(false);

  const [stateInput, setStateInput] = useState({
    email: "",
    password: "",
  });
  console.log(stateInput, "----> ESTADO IINPUT");

  return (
    <div className="containerFormLogin">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "ingresar email";
          }

          if (!values.password) {
            errors.password = "por favor ingresar password";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          
          dispatch(loginUser({email:values.email,password:values.password}))

          MySwal.fire({
            title: "¡Logueado Correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
          }).then((result) => {
            if (result.isConfirmed) {
              
              setStateInput({
                email: "",
                password: ""
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
              <Label>Email</Label>
              <Field className="input1" type="email" name="email" />
            </InputContainer>

            <ErrorMessage
              className="error"
              name="email"
              component={() => <div className="error">{errors.email}</div>}
            ></ErrorMessage>

            <InputContainer>
              <Label3>Password</Label3>
              <Field className="input2" type="password" name="password" />
            </InputContainer>

            <ErrorMessage
              className="error"
              name="password"
              component={() => <div className="error">{errors.password}</div>}
            ></ErrorMessage>

            { values.email && values.password? (
              <ButtonTurno type="submit">Login</ButtonTurno>
            ) : (
              <ButtonTurno2 disabled>Login</ButtonTurno2>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forms1;
