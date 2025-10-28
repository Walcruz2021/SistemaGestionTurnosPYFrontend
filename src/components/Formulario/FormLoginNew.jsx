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
import { verificationCompaniesExist } from "../../reducer/actions/actionsCompany";
import { listenToAuthChanges } from "../../reducer/actions/actions";

import { addUser, searchUser } from "../../reducer/actions/actionsUser";
import ModalRestPassword from "../Modal/ModalRestPassword";
import "./FormLoginNew.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import logoNew from "../../IMAGENES/LogoNew.png";
import { BsWatch } from "react-icons/bs";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { RiExchangeDollarFill } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import supportLogin from "../../icons/supportLogin.png";
import { PiDog } from "react-icons/pi";

function FormLoginNew({ autUser }) {
  const loginUser = useSelector((state) => state.user.user.user);

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
  e.preventDefault();

  if (stateValue.email.trim() === "" || stateValue.password.trim() === "") {
    MySwal.fire({
      title: "Error Login",
      text: "Campos vacíos",
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(255, 140, 0)",
    });
    return;
  }

  try {
    // 🔑 Login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      stateValue.email,
      stateValue.password
    );

    const user = userCredential.user;
 

    // ⚠️ Verifico el correo
    if (!user.emailVerified) {
      await auth.signOut(); // lo sacamos
      MySwal.fire({
        title: "¡Correo electrónico no verificado!",
        text: "Por favor, verifica tu correo electrónico para continuar.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(255, 140, 0)",
      });
      return;
    }

    
    // ✅ Si está verificado, sigue el flujo normal
    MySwal.fire({
      title: "¡Usuario Logueado Correctamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(21, 151, 67)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(listenToAuthChanges());
        const resVerification = await verificationCompanies(user.email);

        if (resVerification.payload.status === 200) {
          navigate("/");
        } else if (resVerification.payload.status === 204) {
          navigate("/addCompany");
        }
      }
    });

  } catch (error) {
    console.log("Error:", error.code, error.message);

    if (error.code === "auth/invalid-credential") {
      MySwal.fire({
        title: "Error Login",
        text: "Usuario o Contraseña Incorrecta",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(255, 140, 0)",
      });
    } else if (error.code === "auth/invalid-email") {
      MySwal.fire({
        title: "Error Login",
        text: "Debe ingresar un Email válido",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(255, 140, 0)",
      });
    } else {
      MySwal.fire({
        title: "Error Login",
        text: "Ha ocurrido un error inesperado",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }
};



  const RedirectLink = () => {
    navigate("/register");
  };

  const RedirectLinkContact = () => {
    navigate("/supportForm");
  };
  return (
    <div className="container py-3 mt-2">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <div className="card-body">
              <div className="login-wrap">
                <div className="login-html">
                  <div className="text-center">
                    <img src={logoNew} style={{ width: "185px" }} alt="logo" />
                    <h4 className="mt-1 mb-3 pb-1">Gestion de Turnos PY</h4>
                  </div>

                  <p className="text-center">LOGIN AL SISTEMA</p>
                  <div className="login-form">
                    <form onSubmit={handleSumbit}>
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
                          placeholder="Ingrese su Email"
                          onChange={handleChange}
                          maxLength={30}
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
                          placeholder="Ingrese Contraseña"
                          maxLength={20}
                          onChange={handleChange}
                          required
                        />
                        <div className="pt-2">
                          {!stateValue.email || !stateValue.password ? (
                            <button
                              className="btn btn-outline-dark form-button"
                              type="submit"
                              disabled
                            >
                              Inicio de Sesión
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-dark form-button"
                              type="submit"
                            >
                              Inicio de Sesión
                            </button>
                          )}
                        </div>

                        <ModalRestPassword show={show} setShow={setShow} />
                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 pt-3 mt-3">
                          <p className="mb-0 px-2">¿No tiene una cuenta?</p>
                          <button
                            className="btn btn-outline-secondary btn-custom"
                            onClick={RedirectLink}
                          >
                            Registrarse
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 pt-5">
          <div className="text-center">
            <div className="card-body">
              <div className="bannerInf">
                <h2>Gestion de Turnos PY</h2>
                <p>Con Sistema de Gestión de Turnos de PymesYa, podrás:</p>
                <ol>
                  {" "}
                  <PiDog size={30} /> Administrar tus turnos
                </ol>

                <ol>
                  <BsPeople size={30} /> Administrar tus Clientes
                </ol>

                <ol>
                  <BsWatch size={30} /> Ahorrar Tiempo
                </ol>

                <ol>
                  <BsFileEarmarkBarGraph size={30} /> Detalle de tus Ingresos y
                  Gastos
                </ol>

                <ol>
                  <RiExchangeDollarFill size={30} /> Completamente Gratuito
                </ol>

                <button onClick={RedirectLinkContact} className="border-0">
                  <img
                    src={supportLogin}
                    alt="Contact Support"
                    width="100"
                    height="100"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLoginNew;
