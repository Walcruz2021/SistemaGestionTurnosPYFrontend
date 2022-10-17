import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Label, InputContainer } from "../cssSyleComp/StyleForm";
import { Input1 } from "../cssSyleComp/LandingStyles";
import { Link } from "react-router-dom";
import { getClients, addDog } from "../reducer/actions";
import { useDispatch, useSelector } from "react-redux";
import "./CreateDog.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormCreateDog from "./Formulario/FormCreateDog";

function CreateDog() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);
  const clientes = useSelector((state) => state.allClients);
  console.log(clientes);

  const [stateInput, setStateInput] = useState({
    name: "",
    nameDog: "",
    idClient: "",
    notaP: "",
    raza: "",
    tamaño: "",
  });

  console.log(stateInput);

  //#################################################CARGA DE RAZAS#################################
  const ListRazas = ["caniche", "labrador", "callejero", "doberman"];
  const selectRazas = [];
  if (Array.isArray(ListRazas)) {
    ListRazas.map((raza) => {
      const option = { value: raza, label: raza };
      selectRazas.push(option);
      return selectRazas;
    });
  }

  //############################################CARGA DE TMAÑOS DE PERROS###########################
  const ListSize = ["pequeño", "mediano", "grande"];
  const sizeSelect = [];

  if (Array.isArray(ListSize)) {
    ListSize.map((tam) => {
      const option = { value: tam, label: tam };
      sizeSelect.push(option);
      return sizeSelect;
    });
  }

  //###########################################################CARGA CLIENTES####################################################################

  var arrayClients = [];
  if (Array.isArray(clientes)) {
    let arrayDogs = [];
    clientes.map((cliente, i) => {
      //se realiza un filtrado ya que treae todos los perros en general y no solos los de status true
      if (cliente.perros.length > 0) {
        arrayDogs = cliente.perros.filter((dog) => {
          if (dog.status === true) {
            return dog;
          }
        });
        var option = {
          idvalue: i,
          value: cliente._id,
          label: cliente.name,
        };
      } else {
        option = {
          idvalue: i,
          value: cliente._id,
          label: cliente.name,
        };
      }
      arrayClients.push(option);
    });
  }

  function handleChange(e) {
    setStateInput({
      ...stateInput,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeSize(selectedSize) {
    setStateInput({ ...stateInput, tamaño: selectedSize.value });
  }

  function handleChangeRaza(selectedRaza) {
    setStateInput({ ...stateInput, raza: selectedRaza.value });
  }

  function handleChangeCli(selected) {
    //(3) agarrara el cliente seleccionado y cambiara el estado en donde se guardara el iCliente,nombre,array de perrosm y telefono
    //(4) ademas guaradara en otro estado el id del array de clientes seleccionado (ej=si se eligio walter al ser el primero el idValue=0)

    console.log(selected);
    //ES EL CLIENTE SELECCIONADO
    //{idvalue: 0, value: '6284e483d618910a4cb259f3', label: 'Walter', label2: 35434342543, label3: Array(3)}
    //idvalue:0
    //label:"Walter"
    //label2:35434342543

    setStateInput({
      ...stateInput,
      idClient: selected.value,
      name: selected.label,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      addDog(
        {
          raza: stateInput.raza,
          tamaño: stateInput.tamaño,
          nameDog: stateInput.nameDog,
          notaP: stateInput.notaP,
          status: true,
        },
        stateInput.idClient
      )
    );

    MySwal.fire({
      title: "¡Mascota creado correctamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(21, 151, 67)",
    }).then((result) => {
      if (result.isConfirmed) {
        //if (showInSettings) {
        getClients();
        // get_clients_id(idClient);

        // dispatch()
        //}

        setStateInput({
          name: "",
          nameDog: "",
          idClient: "",
          notaP: "",
          raza: "",
          tamaño: "",
        });
      }
    });
  }

  return (

    <div className="container">

       <Link className="buttonHome" to="/">
          <button>Back Home</button>
        </Link>

      <h5>CREACION MASCOTA</h5>
      <FormCreateDog></FormCreateDog>
    </div>
  );
}

export default CreateDog;
