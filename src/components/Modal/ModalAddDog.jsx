import React, { useState, useEffect } from "react";
import arrayRazas from "../../components/jsonMascotas.json";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";
import { addDog, getClients} from "../../reducer/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import "./Modal.css";

const ModalAddDog = ({ stateAddDog, setStateAddDog,changeClients}) => {
  const [stateValue, setStateValue] = useState({
    idClient: "",
    nameDog: "",
    notaP: "",
    raza: "",
    tamaño: "",
    status: true,
  });

  const listClients = useSelector((state) => state.allClients);
  const companySelectedMenu = useSelector((state) => state.companySelected);

  useEffect(()=>{
    if(companySelectedMenu){
      dispatch(getClients(companySelectedMenu._id))
    }
  },[companySelectedMenu])

  const handleClose = () => {
    setStateAddDog(!stateAddDog);
  };

  //* *****************LISTADO CLIENT EN SELECT addDog ********************

  var arrayClients = [];
  if (Array.isArray(listClients)) {
    listClients.map((cliente, i) => {
      var option = {
        value: cliente._id,
        label: cliente.name,
      };
      arrayClients.push(option);
    });
  }

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

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
    if (stateValue.nameDog.trim() === "" || stateValue.notaP.trim() === "") {
      alert("valores vacios");
    } else {
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
            raza: "",
            tamaño: "",
            notaP: "",
          });
          changeClients()
          handleClose();
        }
      });
    }
  };

  function handleChangeCli(selected) {
    setStateValue({ ...stateValue, idClient: selected.value });
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
              <Form.Group className="mt-2">
                <Form.Label>Seleccione Tamaño</Form.Label>
                <select
                  id="tamaño"
                  className="form-select"
                  //value={stateInput.tamaño}
                  onClick={handleChangeSize}
                >
                  {stateValue.tamaño === "pequeño" ? (
                    <option selected value="pequeño">
                      pequeño
                    </option>
                  ) : (
                    <option value="pequeño">pequeño</option>
                  )}
                  {stateValue.tamaño === "mediano" ? (
                    <option selected value="mediano">
                      mediano
                    </option>
                  ) : (
                    <option value="mediano">mediano</option>
                  )}
                  {stateValue.tamaño === "grande" ? (
                    <option selected value="grande">
                      grande
                    </option>
                  ) : (
                    <option value="grande">grande</option>
                  )}
                </select>
              </Form.Group>

              {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Seleccione Raza</Form.Label>
              <select
                className="form-select"
                id="raza"
                aria-label="Default select example"
                onClick={handleChangeRaza}
              >
                {stateValue.raza === "doberman" ? (
                  <option selected value="doberman">
                    doberman
                  </option>
                ) : (
                  <option selected value="doberman">
                    doberman
                  </option>
                )}
                {stateValue.raza === "labrador" ? (
                  <option selected value="labrador">
                    labrador
                  </option>
                ) : (
                  <option value="labrador">labrador</option>
                )}

                {stateValue.raza === "caniche" ? (
                  <option selected value="caniche">
                    caniche
                  </option>
                ) : (
                  <option value="caniche">caniche</option>
                )}
              </select>
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label lassName="text-xs">Nombre Mascota</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de Mascota"
                name="nameDog"
                autoFocus
                maxLength={30}
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
        </Modal.Body>
        <Modal.Footer className="mt-2 pt-1 pb-1">
          <Button variant="primary" type="submit" onClick={handleSumbit}>
            Agregar Mascota
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddDog;
