import React from "react";
import { useDispatch,useSelector} from "react-redux";
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
import { useEffect, useState} from "react";
//import { initializeApp } from "@firebase/app";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
//import ModalRestPassword from "../modals/ModalRestPassword";
import { addCompany } from "../../reducer/actions";
import "../../css/cssGeneral.css";
import "./FormsLoginAndRegister.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const FormAddCompany = () => {
  const MySwal = withReactContent(Swal);
  const loginUser=useSelector((state)=>state.user)
  //const history = useHistory();
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    nameCompany: "",
    address: "",
    cuit: ""
  });

  console.log(stateValue);
  //logIn with email of gmail

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = async (e) => {
    if (
      stateValue.address.trim() === "" ||
      stateValue.nameCompany.trim() === "" ||
      stateValue.cuit.trim() === ""
    ) {
      alert("valores vacios");
    } else {
    
      try {

        dispatch(
            addCompany({
              nameCompany: stateValue.nameCompany,
              address: stateValue.address,
              cuit: stateValue.cuit,
              province:"Salta",
              country:"Argentina",
              emailUser:loginUser.email
            })
          );
        MySwal.fire({
          title: "¡Empresa Creada!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "rgb(21, 151, 67)",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard";
            //alert("add company")
          }
        });
      } catch (error) {
        console.error(error.code, error.message);
    
      }
    }
  };

//   const RedirectLink = () => {
//     window.location.href = "/login";
//   };
  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
 
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

            <p className="text-center">ADHERIR UNA EMPRESA</p>

            <MDBInput
              className="small"
              wrapperClass="mb-2"
              label="Nombre de Empresa"
              id="form1"
              type="text"
              name="nameCompany"
              value={stateValue.nameCompany}
              onChange={handleChange}
            />

            <MDBInput
              className="small"
              wrapperClass="mb-2"
              label="Domicilio"
              id="form1"
              type="text"
              name="address"
              value={stateValue.address}
              onChange={handleChange}
            />

            <MDBInput
              className="small"
              wrapperClass="mb-2"
              label="Cuit"
              id="form1"
              type="Number"
              name="cuit"
              value={stateValue.cuit}
              onChange={handleChange}
            />


            <div className="text-center pt-1 mb-5 pb-1">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSumbit}
              >
                Adherir Empresa
              </button>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormAddCompany;
