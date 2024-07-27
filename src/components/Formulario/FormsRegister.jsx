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
import { addUser } from "../../reducer/actions/actions";
import "../../css/cssGeneral.css";
import "./FormsLoginAndRegister.css";
import {
  MDBInput,
} from "mdb-react-ui-kit";
import { FaGoogle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logoNew from "../../IMAGENES/LogoNew.png"
import { FaUser } from "react-icons/fa";

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
        await createUserWithEmailAndPassword(auth, emailState, stateValue.password)
          .then(async (userCred) => {
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
          alert("password has few characters");
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
    setValidationName(newData.length > 4);
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
    <div className="login-wrap-reg">
      <div className="login-html">
        <div className="text-center">
          <img src={logoNew} style={{ width: "185px" }} alt="logo" />
          <h4 className="mt-1 mb-3 pb-1">Gestion de Turnos PY</h4>
        </div>

        <p className="text-center">REGISTRO AL SISTEMA</p>

        <label className="form-label">Nombre *</label>

        <MDBInput
          className="small"
          wrapperClass="mb-2"
          type="text"
          name="firstName"
          maxLength="30"
          onFocus={handleFocusName}
          onChange={handleChangeName}
        />
        {!validationName && isInputFocusedName && (
          <div className="text-danger msgAlertInput">Mayor a 4 letras</div>
        )}

        <label className="form-label">Apellido *</label>

        <MDBInput
          className="small"
          wrapperClass="mb-2"
          type="text"
          name="lastName"
          maxLength="30"
          onChange={handleChangeLastName}
          onFocus={handleFocusLastName}
        />
        {!validationLastName && isInputFocusedLastName && (
          <div className="text-danger msgAlertInput">Mayor a 4 letras</div>
        )}

       
        {/* <label className="form-label pt-2">
          <FaUser /> CORREO ELECTRONICO *
        </label> */}

        <MDBInput
          className="small"
          wrapperClass="mb-2"
          type="email"
          name="email"
          maxLength="50"
          onChange={handleChangeEmail}
        />
        {!validationEmail && (
          <div className="text-danger msgAlertInput">Debe ingresar Email</div>
        )}

        <label className="form-label pt-2">
          <RiLockPasswordFill /> PASSWORD *
        </label>

        <MDBInput
          wrapperClass="mb-2"
          type="password"
          name="password"
          maxLength="30"
          value={stateValue.password}
          onChange={handleChangePassword}
        />

        <label className="form-label pt-2">
          <RiLockPasswordFill /> REINGRESE PASSWORD *
        </label>

        <MDBInput
          wrapperClass="mb-2"
          type="password"
          name="passwordDuplicated"
          maxLength="30"
          onChange={handleChangePasswordDuplicated}
        />
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
              className="btn btn-outline-dark form-button mt-1"
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
         {/* this code is commented because it does not work correctly*/}
        {/* <div className="pt-2">
          <button
            className="btn btn-outline-dark form-button"
            onClick={loginGoogle}
          >
            <FaGoogle />
          </button>
        </div> */}

        <div className="d-flex flex-row align-items-center justify-content-center pb-2 mb-1 pt-2">
          <p className="mb-0 px-2">Ya tiene una cuenta?</p>
          <button
            outline
            className="btn btn-outline-secondary"
            onClick={RedirectLink}
          >
            Inicio de Sesión
          </button>
        </div>
        <div className="text-danger msgAlertInput">(*) Campos Obligatorios</div>
      </div>
    </div>
  );
}

export default FormRegister;