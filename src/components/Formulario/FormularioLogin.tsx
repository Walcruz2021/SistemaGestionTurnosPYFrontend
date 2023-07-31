import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { AuthResponse, AuthResponseError } from "../../types/types";
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
import { Navigate  } from "react-router-dom";
import hots from "../ruteBack/vbledeploy"
const Forms1 = () => {
  const MySwal = withReactContent(Swal);
  const auth = useAuth();
  async function funtionUserLogin (email:String,password:String) {
    try {
      const response = await fetch(`${hots.development}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        //se utiliza JSON.stringify() para convertir ese objeto en una cadena JSON, lo que resultaría en algo similar a:
        //{"email": "usuario@example.com", "password": "contraseña_segura"}
        //convierte un objeto JavaScript en una cadena JSON para poder enviarlo o almacenarlo en un formato que pueda ser interpretado 
        //adecuadamente por otros sistemas o servicios que esperen datos en formato JSON.
        body: JSON.stringify({ email, password }),

      });
      if (response.ok) {
        //as AuthResponse: Esta parte es una notación de tipo de TypeScript. Está indicando que el resultado de response.json() se debe tratar 
        //como un objeto del tipo AuthResponse. En otras palabras, se está aplicando un "casting" o conversión explícita del tipo para 
        //asegurarse de que el objeto retornado tenga la estructura y propiedades de AuthResponse.
        const json = (await response.json()) as AuthResponse;
    
        if (json.body.accessToken && json.body.refreshToken) {
    
          MySwal.fire({
            title: "¡Datos Correctos!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
          }).then((result) => {
            if (result.isConfirmed) {
              auth.saveUser(json);
            }
          });

        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Datos Erroneos!',
          // footer: '<a href="">Why do I have this issue?</a>' aqui se dejaria la direccion en donde se puede recuperar la contraseña
        })
        const json = (await response.json()) as AuthResponseError;
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

interface ErrorsType{
email?:String,
password?:String
}
  return (
    <div className="containerFormLogin">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors: ErrorsType = {};
          if (!values.email) {
            errors.email = "ingresar email";
          }

          if (!values.password) {
            errors.password = "por favor ingresar password";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          funtionUserLogin(values.email,values.password)
        }}
      >
        {({
          errors,
          handleSubmit,
          values,
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

            {values.email && values.password ? (
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
//https://www.youtube.com/watch?v=q4ywr3eZmk0