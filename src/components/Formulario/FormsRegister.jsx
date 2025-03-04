import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../api/configFirebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addUser } from "../../reducer/actions/actionsUser";
import "../../css/cssGeneral.css";
// import "./FormsLoginAndRegister.css";
import { MDBInput } from "mdb-react-ui-kit";
import { FaGoogle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logoNew from "../../IMAGENES/LogoNew.png";
import { FaUser } from "react-icons/fa";
import { PiDog } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { BsWatch } from "react-icons/bs";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { RiExchangeDollarFill } from "react-icons/ri";
import { MdOutlineMailLock } from "react-icons/md";
import "./FormsRegister.css";
import supportLogin from "../../icons/supportLogin.png";

function FormRegister({ autUser }) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    passwordDuplicated: "",
  });

  const [emailState, setEmailState] = useState("");
  const [validationEmail, setValidationEmail] = useState(false);
  const [validationPassw, setValidationPassw] = useState(false);
  const [validationName, setValidationName] = useState(true);
  const [validationLastName, setValidationLastName] = useState(false);
  const [isInputFocusedName, setIsInputFocusedName] = useState(false);
  const [isInputFocusedLastName, setIsInputFocusedLastName] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const loginGoogle = async () => {
    if (isPopupOpen) return;
    setIsPopupOpen(true);
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      const emailUserNew = credentials.user.email;
      const fullNameUserNew = credentials.user.displayName;
      const newUserService = {
        fullName: fullNameUserNew,
        status: true,
        email: emailUserNew,
      };
      dispatch(addUser(newUserService));
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          navigate("/");
        }
      });
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsPopupOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setStateValue({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      passwordDuplicated: "",
    });
    setEmailState("");
    setValidationEmail(false);
    setValidationPassw(false);
    setValidationName(true);
    setValidationLastName(false);
    setIsInputFocusedName(false);
    setIsInputFocusedLastName(false);
  };

  const handleSumbit = async (e) => {
    if (
      stateValue.password.trim() === "" ||
      stateValue.passwordDuplicated.trim() === "" ||
      stateValue.firstName.trim() === "" ||
      stateValue.lastName.trim() === ""
    ) {
      MySwal.fire({
        title: "Error Datos",
        text: "Faltan Datos Por Completar",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(255, 140, 0)",
      });
    } else {
      try {
        await createUserWithEmailAndPassword(
          auth,
          emailState,
          stateValue.password
        ).then(async (userCred) => {
          const user = userCred.user;
          await sendEmailVerification(user);
          await updateProfile(user, {
            displayName: `${stateValue.firstName} ${stateValue.lastName}`,
          });
        });

        const newUser = {
          fullName: `${stateValue.firstName} ${stateValue.lastName}`,
          status: true,
          email: emailState,
        };
        dispatch(addUser(newUser));
        MySwal.fire({
          title: "¡Usuario Creado. Se envió un Link de Verificación!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "rgb(21, 151, 67)",
        }).then((result) => {
          if (result.isConfirmed) {
            //resetForm(); // Reiniciar el formulario aquí
            navigate("/login");
          }
        });
      } catch (error) {
        console.error(error.code, error.message);
        if (error.code === "auth/weak-password") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Las contraseñas deben tener mas de 6 dígitos",
          });
        } else if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El Email ya se encuentra Registrado",
          });
        }
      }
    }
  };

  const RedirectLink = () => {
    //alert("se activo esto")
    navigate("/login");
  };

  const handleChangeEmail = (event) => {
    const newEmail = event.target.value;
    setEmailState(newEmail);

    if (newEmail) {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      setValidationEmail(emailPattern.test(newEmail));
    }
  };

  const handleChangeName = (event) => {
    const newData = event.target.value;
    setStateValue((prevState) => ({
      ...prevState,
      firstName: newData,
    }));
    setValidationName(newData.length > 3);
  };

  const handleChangeLastName = (event) => {
    const newData = event.target.value;
    setStateValue((prevState) => ({
      ...prevState,
      lastName: newData,
    }));
    setValidationLastName(newData.length > 4);
  };

  const handleChangePassword = (event) => {
    const newPassword = event.target.value;
    setStateValue((prevState) => ({
      ...prevState,
      password: newPassword,
    }));
    validatePasswords(newPassword, stateValue.passwordDuplicated);
  };

  const handleChangePasswordDuplicated = (event) => {
    const newPasswordDuplicated = event.target.value;
    setStateValue((prevState) => ({
      ...prevState,
      passwordDuplicated: newPasswordDuplicated,
    }));
    validatePasswords(stateValue.password, newPasswordDuplicated);
  };

  const validatePasswords = (password1, password2) => {
    setValidationPassw(password1 === password2);
  };

  const handleFocusName = () => {
    setIsInputFocusedName(true);
  };

  const handleFocusLastName = () => {
    setIsInputFocusedLastName(true);
  };

  return (
    <div className="container py-3 mt-2">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <div className="card-body">
              <div className="login-wrapR">
                <div className="login-html">
                  <img src={logoNew} style={{ width: "185px" }} alt="logo" />
                  <h4 className="mt-1 mb-3 pb-1">Gestion de Turnos PY</h4>

                  <p className="text-center">REGISTRO AL SISTEMA</p>

                  <div className="d-flex align-items-center label-input-container">
                    <label className="form-label">Nombre</label>

                    <MDBInput
                      className="small"
                      wrapperClass="mb-2 ms-3 w-100"
                      type="text"
                      name="firstName"
                      maxLength="30"
                      onFocus={handleFocusName}
                      onChange={handleChangeName}
                    />
                  </div>

                  {!validationName && isInputFocusedName && (
                    <div className="text-danger msgAlertInput">
                      Mayor a 3 letras
                    </div>
                  )}

                  <div className="d-flex align-items-center label-input-container">
                    <label className="form-label">Apellido</label>

                    <MDBInput
                      className="small"
                      wrapperClass="mb-2 ms-3 w-100 mt-1"
                      type="text"
                      name="lastName"
                      maxLength="30"
                      onChange={handleChangeLastName}
                      onFocus={handleFocusLastName}
                    />
                  </div>
                  {!validationLastName && isInputFocusedLastName && (
                    <div className="text-danger msgAlertInput">
                      Mayor a 4 letras
                    </div>
                  )}

                  <div className="d-flex align-items-center label-input-container">
                    <label className="form-label">
                      <MdOutlineMailLock size="1.7rem" />
                    </label>

                    <MDBInput
                      className="small"
                      wrapperClass="mb-2 ms-3 w-100 mt-1"
                      type="email"
                      name="email"
                      maxLength="50"
                      onChange={handleChangeEmail}
                    />
                  </div>
                  {!validationEmail && (
                    <div className="text-danger msgAlertInput">
                      Debe ingresar Email
                    </div>
                  )}

                  <div className="d-flex align-items-center label-input-container">
                    <label className="form-label">
                      <RiLockPasswordFill size="1.7rem" />
                    </label>

                    <MDBInput
                      wrapperClass="mb-2 ms-3 w-100 mt-1"
                      type="password"
                      name="password"
                      maxLength="30"
                      value={stateValue.password}
                      onChange={handleChangePassword}
                      placeHolder="Ingrese Password"
                    />
                  </div>

                  <div className="d-flex align-items-center label-input-container">
                    <label className="form-label">
                      <RiLockPasswordFill size="1.7rem" />
                    </label>

                    <MDBInput
                      wrapperClass="mb-2 ms-3 w-100 mt-1"
                      type="password"
                      name="passwordDuplicated"
                      maxLength="30"
                      onChange={handleChangePasswordDuplicated}
                      placeHolder="Ingrese Nuevamente Password"
                    />
                  </div>
                  {!validationPassw && (
                    <div className="text-danger msgAlertInput">
                      Las Contraseñas deben ser iguales
                    </div>
                  )}

                  <div>
                    {!stateValue.firstName.trim("") ||
                    !stateValue.lastName.trim("") ||
                    !validationLastName ||
                    !validationEmail ||
                    !validationPassw ||
                    !validationName ? (
                      <button
                        className="btn btn-outline-dark form-button mt-2"
                        type="submit"
                        onClick={handleSumbit}
                        disabled
                      >
                        Registrarse
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-dark form-button"
                        type="submit"
                        onClick={handleSumbit}
                      >
                        Registrarse
                      </button>
                    )}
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-center pb-2 mb-1 pt-3">
                    <p className="mb-0 px-2">Ya tiene una cuenta?</p>
                    <button
                      outline
                      className="btn btn-outline-secondary"
                      onClick={RedirectLink}
                    >
                      Inicio de Sesión
                    </button>
                  </div>
                  {/* <div className="text-danger msgAlertInput">
                    (*) Campos Obligatorios
                  </div> */}
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

                <img src={supportLogin} width="100" height="100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormRegister;
