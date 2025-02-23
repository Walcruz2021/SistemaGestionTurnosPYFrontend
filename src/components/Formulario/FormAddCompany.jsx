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
import { addCompany } from "../../reducer/actions/actionsCompany";
import "../../css/cssGeneral.css";
import "./FormAddCompany.css";
import { MDBInput } from "mdb-react-ui-kit";
import logoNew from "../../IMAGENES/LogoNew.png";

const FormAddCompany = () => {
  const MySwal = withReactContent(Swal);
  const loginUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  //const history = useHistory();
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    nameCompany: "",
    address: "",
    cuit: "",
  });

  const [selectedOption,setSelectedOption]=useState("")


  //logIn with email of gmail

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleChangeRadioB=(event)=>{
  setSelectedOption(event.target.value);
}

  const handleSumbit = async (e) => {
    if (
      stateValue.address.trim() === "" ||
      stateValue.nameCompany.trim() === "" ||
      stateValue.cuit.trim() === ""
    ) {
      MySwal.fire({
        title: "Error Login",
        text: "Se deben Completar Todos los Datos",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(255, 140, 0)",
      });
    } else {
      try {
        dispatch(
          addCompany({
            nameCompany: stateValue.nameCompany,
            address: stateValue.address,
            cuit: stateValue.cuit,
            province: "Salta",
            country: "Argentina",
            emailUser: loginUser.email,
            category:selectedOption
          })
        );
        MySwal.fire({
          title: "¡Empresa Creada!",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "rgb(21, 151, 67)",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
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
    <div className="login-wrapAddComp">
      <div className="login-html">
        <div className="text-center">
          <img src={logoNew} style={{ width: "185px" }} alt="logo" />
          <h4 className="mt-1 mb-3 pb-1">Gestion de Turnos PY</h4>
        </div>

        <p className="text-center">ADHERIR UNA EMPRESA</p>

        <label className="form-label">Nombre de la Empresa *</label>

        <MDBInput
          className="small"
          wrapperClass="mb-2"
          id="form1"
          type="text"
          name="nameCompany"
          value={stateValue.nameCompany}
          onChange={handleChange}
          maxLength="25"
        />

        <label className="form-label">Domicilio *</label>

        <MDBInput
          className="small"
          wrapperClass="mb-2"
          id="form1"
          type="text"
          name="address"
          value={stateValue.address}
          onChange={handleChange}
          maxLength="30"
        />

        <label className="form-label">Cuit *</label>

        <MDBInput
          className="small"
          wrapperClass="mb-2"
          id="form1"
          type="Number"
          name="cuit"
          value={stateValue.cuit}
          onChange={handleChange}
          maxLength="8"
        />

        <div className="d-flex justify-content-between w-100">
          <label className="p-2">
            <input className="m-2" type="radio" value="pelu" checked={selectedOption==="pelu"} onChange={handleChangeRadioB}  />
            Peluqueria
          </label>

          <label className="p-2">
            <input className="m-2" type="radio" value="peluAndVet" checked={selectedOption==="peluAndVet"} onChange={handleChangeRadioB} />
            Veterinaria y Peluqueria
          </label>
        </div>

        <div className="text-danger msgAlertInput">* Valores Obligatorios</div>
        <div className="text-center pt-2 mb-5 pb-1">
          {!stateValue.nameCompany ||
          !stateValue.address ||
          !stateValue.cuit ||
          !selectedOption
          ? (
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSumbit}
              disabled
            >
              Adherir Empresa
            </button>
          ) : (
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSumbit}
            >
              Adherir Empresa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormAddCompany;
