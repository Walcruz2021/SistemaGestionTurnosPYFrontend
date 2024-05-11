import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { auth } from "../../api/configFirebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "@firebase/auth";
//import ButtonBarBoostrap from "../components/ButtonBar/ButtonBarBoostrap";
import { useEffect, useState } from "react";
//import { initializeApp } from "@firebase/app";
//import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
//import ModalRestPassword from "../modals/ModalRestPassword";
//import { addUserService } from "../reducer/actions";
import "../../css/cssGeneral.css";
import "./FormsLoginAndRegister.css";

function FormsLogin({ autUser }) {
  const MySwal = withReactContent(Swal);
  //const history = useHistory();
  const dispatch = useDispatch();

  //logIn with email of gmail
  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(auth, provider);
    const emailUserNew = credentials.user.email;
    const fullNameUserNew = credentials.user.displayName;
    const newUserService = {
      fullName: fullNameUserNew,
      status: true,
      email: emailUserNew,
    };
    //dispatch(addUserService(newUserService));
    try {
      onAuthStateChanged(auth, async (user) => {
        console.log(user);
      });
    } catch (error) {
      console.log(error.message, error.code);
    }
  };

  return (
    <div className="containerLogin">
      <div className="titGral">
        <h2>FORMULARIO DE INICIO DE SESION</h2>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const error = {};

          if (!values.email) {
            error.email = "Por favor ingresa un correo";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            error.email = "Correo inválido";
          }

          if (!values.password) {
            error.password = "Por favor ingresa una contraseña";
          }
          // Letras, números, guion y guion_bajo-Mayúsculas SIN espacios
          else if (
            !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_\-.,!@#$%^&*()+=<>?/\\[\]{}|~`]{6,15}$/.test(
              values.password
            )
          ) {
            error.password =
              "Debe tener entre 6 y 15 caracteres. Sin espacios.";
          }
          return error;
        }}
        onSubmit={async (values, { resetForm }) => {
       
          try {
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            if (auth.currentUser.emailVerified) {
              // Usuario logueado correctamente y correo electrónico verificado
              
              MySwal.fire({
                title: "¡Usuario Logueado Correctamente!",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href='/'
                }
              });
            } else {
              
              MySwal.fire({
                title: "¡Correo electrónico no verificado!",
                text: "Por favor, verifica tu correo electrónico para continuar.",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(255, 140, 0)",
              });
              resetForm();
            }
          } catch (error) {
            if (error.code === "auth/invalid-credential") {
              MySwal.fire({
                title: "Error Login",
                text: "Usuario o Contraseña Incorrecto",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(255, 140, 0)",
              });
            } else {
              console.log(error.message);
            }
          }
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
            <div className="mt-1">
              <label className="form-label textGral">Email</label>
              <Field
                className="form-control"
                type="email"
                name="email"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className="error mt-2">{errors.email}</div>
                )}
              ></ErrorMessage>
            </div>

            <div className="mt-1">
              <label htmlFor="password" className="form-label textGral">
                Contraseña
              </label>
              <Field
                type="password"
                name="password"
                className="form-control mt-2 textGral"
              />

              <ErrorMessage
                name="password"
                component={() => (
                  <div className="error mt-2">{errors.password}</div>
                )}
              ></ErrorMessage>
            </div>

            {/* <ModalRestPassword /> */}

            <div className="mt-4">
              {values.email &&
              values.password &&
              !errors.password &&
              !errors.email ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-control btn btn-lg btn-secondary"
                  style={{ fontSize: "20px" }}
                >
                  Inicio de Sesión
                </button>
              ) : (
                <button
                  disabled
                  className="form-control btn btn-lg btn-secondary"
                  style={{ fontSize: "20px" }}
                >
                  Inicio de Sesión
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-1">
        <button
          onClick={loginGoogle}
          className="form-control btn btn-lg btn-secondary"
          style={{ fontSize: "20px" }}
        >
          Login Gmail
        </button>
      </div>
    </div>
  );
}

export default FormsLogin;
