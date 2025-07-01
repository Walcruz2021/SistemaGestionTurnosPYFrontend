import React, { useState, useEffect } from "react";
import arrayRazas from "../../components/jsonMascotas.json";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import { addDog} from "../../reducer/actions/actionsDog";
import { getClients } from "../../reducer/actions/actionsClients";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import "./Modal.css";

const ModalAddDog = ({ stateAddDog, setStateAddDog }) => {
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    idClient: "",
    nameDog: "",
    notaP: "",
    raza: "",
    tamaño: "",
  });

  const listClients = useSelector((state) => state.allClients);

  const companySelectedMenu = useSelector((state) => state.companySelected);

  useEffect(() => {
    if (!listClients) {
      if(companySelectedMenu){
        dispatch(getClients(companySelectedMenu._id));
      }
    }
  },[listClients,dispatch]);

  const handleClose = () => {
    setStateAddDog(!stateAddDog);
    setStateValue({
      idClient: "",
      nameDog: "",
      notaP: "",
      raza: "",
      tamaño: "",
    });
  };

  //* *****************LISTADO CLIENT EN SELECT addDog ********************

  var arrayClients = [];
  var arrayRazas = ["doberman", "labrador", "caniche", "callejero"];
  var selectRazaArray = [];
  var arrayTamaño = ["grande", "mediano", "pequeño"];
  var selectTamArray = [];

  if (Array.isArray(listClients)) {
    listClients.map((cliente, i) => {
      var option = {
        value: cliente._id,
        label: cliente.name,
      };
      arrayClients.push(option);
    });
  }

  if (Array.isArray(arrayRazas)) {
    arrayRazas.map((raza, i) => {
      var option = {
        value: raza,
        label: raza,
      };
      selectRazaArray.push(option);
    });
  }

  if (Array.isArray(arrayTamaño)) {
    arrayTamaño.map((tam, i) => {
      var option = {
        value: tam,
        label: tam,
      };
      selectTamArray.push(option);
    });
  }

  const MySwal = withReactContent(Swal);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleChangeRaza(e) {
    const seleccion = e.target.value;
    setStateValue({ ...stateValue, raza: seleccion });
  }

  function handleChangeSize(e) {
    const seleccionS = e.target.value;
    setStateValue({ ...stateValue, tamaño: seleccionS });
  }

  const handleSumbit = (e) => {
    if (
      stateValue.nameDog.trim() === "" ||
      // !stateValue.raza ||
      !stateValue.tamaño ||
      !stateValue.idClient
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faltan Datos por Completar",
      });
    } else {
      //alert("datos completos")
      const payload = {};
      for (const key in stateValue) {
        if (stateValue[key] !== undefined) {
          payload[key] =
            typeof stateValue[key] === "string"
              ? stateValue[key].trim()
              : stateValue[key];
        }
      }
      dispatch(addDog(payload, stateValue.idClient));

      MySwal.fire({
        title: "¡Mascota Agregada!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(21, 151, 67)",
      }).then((result) => {
        if (result.isConfirmed) {
          setStateValue({
            nameDog: "",
            notaP: "",
          });
          //changeClients()
          dispatch(getClients(companySelectedMenu._id));
          handleClose();
        }
      });
    }
  };

  function handleChangeCli(selected) {
    setStateValue({ ...stateValue, idClient: selected.value });
  }

  function handleChangeRaza(selected) {
    setStateValue({ ...stateValue, raza: selected.value });
  }

  function handleChangeSize(selected) {
    setStateValue({ ...stateValue, tamaño: selected.value });
  }
  return (
    <>
      <Modal show={stateAddDog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1 pb-1">
          <Form>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Group className="mt-2">
                <Form.Label>Seleccione Cliente</Form.Label>
                <Select
                  placeholder="Seleccione Client"
                  onChange={(e) => {
                    handleChangeCli(e);
                  }}
                  options={arrayClients}
                />
              </Form.Group>

              {/* <Form.Group className="mt-2">
              
                <Select
                  placeholder="Seleccione Raza"
                  onChange={(e) => {
                    handleChangeRaza(e);
                  }}
                  options={selectRazaArray}
                />
              </Form.Group> */}

              <Form.Group className="mt-2">
                {/* <Form.Label>Seleccione Tamaño</Form.Label> */}
                <Select
                  placeholder="Seleccione Tamaño"
                  onChange={(e) => {
                    handleChangeSize(e);
                  }}
                  options={selectTamArray}
                />
              </Form.Group>

              {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label lassName="text-xs">(*) Nombre Mascota</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de Mascota"
                name="nameDog"
                autoFocus
                maxLength={20}
                value={stateValue.nameDog}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Nota Mascota</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notaP"
                autoFocus
                maxLength={100}
                value={stateValue.notaP}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>

            <div className="text-danger msgAlertInput mt-2">
              (*) Valores Obligatorios
            </div>  

        </Modal.Body>
        <Modal.Footer className="mt-2 pt-1 pb-1">
          {!stateValue.idClient ||
          !stateValue.nameDog ||
          // !stateValue.raza ||
          !stateValue.tamaño ? (
            <Button
              variant="primary"
              type="submit"
              onClick={handleSumbit}
              disabled
            >
              Agregar Mascota
            </Button>
          ) : (
            <Button variant="primary" type="submit" onClick={handleSumbit}>
              Agregar Mascota
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddDog;
