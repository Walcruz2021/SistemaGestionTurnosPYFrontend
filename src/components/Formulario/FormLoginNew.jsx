import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../api/configFirebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import gmail from "../../icons/gmailLogin.png";
import { addUser, verificationCompaniesExist,listenToAuthChanges} from "../../reducer/actions/actions";
import ModalRestPassword from "../Modal/ModalRestPassword";
import "./FormLoginNew.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import logoNew from "../../IMAGENES/LogoNew.png";

function FormLoginNew({ autUser }) {
  const loginUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

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
    const response = dispatch(verificationCompaniesExist(email));
    return response;
  };

  const handleSumbit = async (e) => {
    if (stateValue.email.trim() === "" || stateValue.password.trim() === "") {
      MySwal.fire({
        title: "Error Login",
        text: "Usuario o Contraseña Incorrecto",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(255, 140, 0)",
      });
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          stateValue.email,
          stateValue.password
        );
        if (auth.currentUser.emailVerified) {
          
          MySwal.fire({
            title: "¡Usuario Logueado Correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
          }).then(async (result) => {
            if (result.isConfirmed) {
              dispatch(listenToAuthChanges())
              const resVerification = await verificationCompanies(
                auth.currentUser.email
              );
              if (resVerification.payload.status === 200) {
                navigate("/");
              } else if (resVerification.payload.status === 204) {
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
          //resetForm();
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
        } else if (error.code === "auth/invalid-email") {
          MySwal.fire({
            title: "Error Login",
            text: "Debe Ingresar un Email",
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

  // const resetForm = () => {
  //   setStateValue({
  //     email: "",
  //     password: "",
  //   });
  // };

  const RedirectLink = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="login-wrap">
        <div className="login-html">
          <div className="text-center">
            <img src={logoNew} style={{ width: "185px" }} alt="logo" />
            <h4 className="mt-1 mb-3 pb-1">Gestion de Turnos PY</h4>
          </div>

          <p className="text-center">LOGIN AL SISTEMA</p>
          <div className="login-form">
            <div className="group">
              <label className="form-label pt-3 pb-1">
                <FaUser /> CORREO ELECTRONICO
              </label>
              <MDBInput
                className="form-input mb-2"
                id="form1"
                type="email"
                name="email"
                value={stateValue.email}
                onChange={handleChange}
                required
              />
              <label className="form-label pt-3 pb-1 .anton-sc-regular">
                <RiLockPasswordFill /> PASSWORD
              </label>
              <MDBInput
                className="form-input mb-2"
                id="form2"
                type="password"
                name="password"
                value={stateValue.password}
                onChange={handleChange}
                required
              />
              <div className="pt-2">
                {!stateValue.email || !stateValue.password ? (
                  <button
                    className="btn btn-outline-dark form-button"
                    type="submit"
                    onClick={handleSumbit}
                    disabled
                  >
                    Inicio de Sesión
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark form-button"
                    type="submit"
                    onClick={handleSumbit}
                  >
                    Inicio de Sesión
                  </button>
                )}
              </div>

              {/* this code is commented because it does not work correctly */}
              {/* <div className="pt-2"></div>
              <button
                className="btn btn-outline-dark form-button"
                onClick={loginGoogle}
              >
                <FaGoogle />
              </button> */}

              <ModalRestPassword show={show} setShow={setShow} />
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-1">
                <p className="mb-0 px-2">¿No tiene una cuenta?</p>
                <button
                  className="btn btn-outline-secondary btn-custom"
                  onClick={RedirectLink}
                >
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormLoginNew;