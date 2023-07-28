import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { loginUser } from "../../reducer/actions";
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


const Forms1 = () => {
 

  const auth = useAuth();
 
  
  async function funtionUserLogin (email:String,password:String) {
    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
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