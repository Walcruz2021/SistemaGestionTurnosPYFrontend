import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../api/configFirebase";

//import ButtonBarBoostrap from "../components/ButtonBar/ButtonBarBoostrap";
import { useEffect, useState } from "react";
//import { initializeApp } from "@firebase/app";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
//import ModalRestPassword from "../modals/ModalRestPassword";
import { addCompany } from "../../reducer/actions/actions";
import "../../css/cssGeneral.css";
import "./FormsLoginAndRegister.css";
import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import logoNew from "../../IMAGENES/LogoNew.png";
import Select from "react-select";
import { useForm, ValidationError } from "@formspree/react";

const FormSoporteContactLoginReg = () => {

  
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [stateValue, setStateValue] = useState({
    message: "",
    email:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [state, handleSubmit] = useForm("mdknyzby");

  if (state.succeeded) {
    MySwal.fire({
      title: "¡Te enviaremos un Mensaje!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(21, 151, 67)",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        //alert("add company")
      }
    });
  }

  const Redirect = () => {
    navigate("/login");
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <div className="text-center">
          <img src={logoNew} style={{ width: "185px" }} alt="logo" />
          <h4 className="mt-1 mb-3 pb-1">Gestion de Turnos PY</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="text-center">FORMULARIO DE CONTACTO</p>

          <label className="mb-2" htmlFor="email">
            Email Address *
          </label>
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <MDBInput
            className="small"
            wrapperClass="mb-2"
            id="email"
            type="email"
            name="email"
            maxLength="50"
            onChange={handleChange}
          />

          <label className="form-label">Ingrese su Comentario *</label>

          <MDBTextArea
            className="small"
            wrapperClass="mb-2"
            id="message"
            type="text"
            name="message"
            maxLength="200"
            rows={5} // Aumenta el número de filas para hacer el input más alto
            cols={50}
            onChange={handleChange}
          />
          <div className="text-danger msgAlertInput">
            * Valores Obligatorios
          </div>
          <div className="text-center pt-2 mb-2 pb-1">
            {stateValue.message ? (
              <button className="btn btn-primary w-100" type="submit">
                Submit
              </button>
            ) : (
              <button className="btn btn-primary w-100" type="submit" disabled>
                Submit
              </button>
            )}
          </div>
          <div className="text-center mb-5 pb-1">
            <button className="btn btn-dark w-100" onClick={Redirect}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSoporteContactLoginReg;
