import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { auth } from "../../api/configFirebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "@firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import gmail from "../../icons/gmailLogin.png";
import { addUser, verificationCompaniesExist } from "../../reducer/actions";
import ModalRestPassword from "../Modal/ModalRestPassword";
import "./FormLoginNew2.css";

function FormLoginNew2({ autUser }) {
  const loginUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  //const history = useHistory();
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
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
    dispatch(addUser(newUserService));
    try {
      onAuthStateChanged(auth, async (user) => {
        console.log(user);
      });
    } catch (error) {
      console.log(error.message, error.code);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShow = () => {
    setShow(!show);
  };
  const verificationCompanies = async (email) => {
    const response = await dispatch(verificationCompaniesExist(email));

    return response;
  };

  const handleSumbit = async (e) => {
    if (stateValue.email.trim() === "" || stateValue.password.trim() === "") {
      alert("valores vacios");
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          stateValue.email,
          stateValue.password
        );
        if (auth.currentUser.emailVerified) {
          // Usuario logueado correctamente y correo electrónico verificado
          MySwal.fire({
            title: "¡Usuario Logueado Correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
          }).then(async (result) => {
            if (result.isConfirmed) {
              const resVerification = await verificationCompanies(
                auth.currentUser.email
              );

              if (resVerification.payload.status === 200) {
                //window.location.href = "/dashboard";
                navigate("/dashboard");
              } else if (resVerification.payload.status === 204) {
                //alert("ingreso a addCompany")
                //window.location.href = "/addCompany";
                navigate("/addCompany");
              }
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
    }
  };

  const RedirectLink = () => {
    window.location.href = "/register";
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
        <label for="tab-1" className="tab">
          Sign In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label for="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label for="user" className="label">
                Correo Electronico
              </label>
              <MDBInput
                className="group label input"
                wrapperClass="mb-2"
                id="form1"
                type="email"
                name="email"
                value={stateValue.email}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Password
              </label>

              <MDBInput
                className="input"
                wrapperClass="mb-2"
                id="form2"
                type="password"
                name="password"
                value={stateValue.password}
                onChange={handleChange}
              />
            </div>
            <div className="group">
              <input id="check" type="checkbox" className="check" checked />
              <label for="check">
                <span className="icon"></span> Keep me Signed in
              </label>
            </div>
            <div className="group">
              <button className="button" type="submit" onClick={handleSumbit}>
                Inicio de Sesión
              </button>{" "}
              <button className="button" onClick={loginGoogle}>
                <img src={gmail} />
              </button>
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <a href="#forgot">Forgot Password?</a>
            </div>
          </div>

          {/* <div className="sign-up-htm">
            <div className="group">
              <label for="user" className="label">
                Username
              </label>
              <input id="user" type="text" className="input" />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Repeat Password
              </label>
              <input
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label for="pass" className="label">
                Email Address
              </label>
              <input id="pass" type="text" className="input" />
            </div>
            <div className="group">
              <input type="submit" className="button" value="Sign Up" />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <label for="tab-1">Already Member?></label>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default FormLoginNew2;
