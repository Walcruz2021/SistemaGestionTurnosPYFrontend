import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { auth } from "../../api/configFirebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "@firebase/auth";
//import ButtonBarBoostrap from "../components/ButtonBar/ButtonBarBoostrap";
import { useEffect, useState } from "react";
//import { initializeApp } from "@firebase/app";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
//import ModalRestPassword from "../modals/ModalRestPassword";
import { addUser} from "../../reducer/actions";
import "../../css/cssGeneral.css";
import "./FormsLoginAndRegister.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

function FormRegister({ autUser }) {
  const MySwal = withReactContent(Swal);
  //const history = useHistory();
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    email: "",
    password: "",
    firstName:"",
    lastName:""
  });

console.log(stateValue)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSumbit = async (e) => {
    if (
      stateValue.email.trim() === "" || 
      stateValue.password.trim() === "" ||
      stateValue.firstName.trim() === "" ||
      stateValue.lastName.trim() === ""
    ) {
      alert("valores vacios");
    } else {
      // dispatch(
      //   addClient({
      //     name: stateValue.name,
      //     address: stateValue.address,
      //     notesClie: stateValue.notesCli,
      //     phone: stateValue.phone,
      //     status:true
      //   })
      // );

      try {
        await createUserWithEmailAndPassword(
          auth,
          stateValue.email,
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
          //phone:values.phone,
          // phone2:values.phone2,
          //country: "Argentina",
          //cityName: "Salta",
          //address: values.address,
          status: true,
          email: stateValue.email,
        };
        dispatch(addUser(newUser));
        MySwal.fire({
          title: "¡Usuario Creado. Se envió un Link de Verificación!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "rgb(21, 151, 67)",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href='/login'
          }
        });
      } catch (error) {
        console.error(error.code, error.message);
        if (error.code === "auth/weak-password") {
          //alertToastify();
          alert("password has few characters");
        } else if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El Email ya se encuentra Registrado",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }
    }
  };

  const RedirectLink=()=>{
    window.location.href='/login'
  }
  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>

      <MDBCol col="6" className="mb-5 bg-primary">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-2">
            <div className="text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: "185px" }}
                alt="logo"
              />
              <h4 className="mt-1 mb-3 pb-1">Gestion de Turnos PY</h4>
            </div>

            <p className="text-center">REGISTRO AL SISTEMA</p>
            
            <MDBInput
              className="small"
              wrapperClass="mb-2"
              label="Nombre"
              id="form1"
              type="text"
              name="firstName"
              value={stateValue.firstName}
              onChange={handleChange}
            />
            
            <MDBInput
              className="small"
              wrapperClass="mb-2"
              label="Apellido"
              id="form1"
              type="text"
              name="lastName"
              value={stateValue.lastName}
              onChange={handleChange}
            />

            <MDBInput
              className="small"
              wrapperClass="mb-2"
              label="Correo Electrónico"
              id="form1"
              type="email"
              name="email"
              value={stateValue.email}
              onChange={handleChange}
            />

            <MDBInput
              wrapperClass="mb-2"
              label="Password"
              id="form2"
              type="password"
              name="password"
              value={stateValue.password}
              onChange={handleChange}
            />

            <div className="text-center pt-1 mb-5 pb-1">
              <button
                variant="btn btn-primary"
                type="submit"
                onClick={handleSumbit}
              >
                Registrarse
              </button>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-1">
              <p className="mb-0">Ya tiene una cuenta?</p>
              <MDBBtn outline className="mx-2" color="danger" onClick={RedirectLink}>
                Inicio de Sesión
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

       
      </MDBRow>
    </MDBContainer>
  );
}

export default FormRegister;
