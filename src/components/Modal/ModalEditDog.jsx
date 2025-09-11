import React, { useState, useEffect } from "react";
import arrayRazas from "../../components/jsonMascotas.json";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.css";

import { getClients } from "../../reducer/actions/actionsClients";
import { updateDog } from "../../reducer/actions/actionsDog";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import "./Modal.css";

const ModalEditDog = ({
  idDog: initialIdDog,
  state,
  setStateModal,
  notaP: initialNotaP,
  nameDog: initialNameDog,
  raza: initialRaza,
  tamaño: initialTam,
  stateHist,
  setStateHist,
  showInSettings,
}) => {
  const [stateValue, setStateValue] = useState({
    idDog: "" || initialIdDog,
    nameDog: "" || initialNameDog,
    notaP: "" || initialNotaP,
    raza: "" || initialRaza,
    tamaño: "" || initialTam,
  });

  useEffect(() => {
    setStateValue({
      idDog: "" || initialIdDog,
      nameDog: "" || initialNameDog,
      notaP: "" || initialNotaP,
      raza: "" || initialRaza,
      tamaño: "" || initialTam,
    });
  }, [initialIdDog, initialNameDog, initialNotaP, initialRaza, initialTam]);
  const handleClose = () => {
    setStateModal(!state);
  };

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const companySelectedMenu = useSelector((state) => state.companySelected);

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
          payload[key] = stateValue[key].trim();
        }
      }
      dispatch(updateDog(payload, stateValue.idDog));
      MySwal.fire({
        title: "¡Mascota actualizada!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(21, 151, 67)",
      }).then((result) => {
        if (result.isConfirmed) {
          if (showInSettings) {
            dispatch(getClients(companySelectedMenu._id));
          }
          setStateModal(!state);
          setStateHist(!stateHist);
          setStateValue({
            nameDog: "",
            raza: "",
            tamaño: "",
            notaP: "",
          });
        }
      });
    }
  };

  return (
    <>
      <Modal show={state} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="instrument-serif-regular">
            Editar Mascota
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1 pb-1">
          <Form>
            <Form.Group className="mb-1" controlId="modalNamePet">
              <Form.Label className="text-xs instrument-serif-regular">
                (*) Nombre Mascota
              </Form.Label>
              <Form.Control
                className="instrument-serif-regular"
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

            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label className="instrument-serif-regular">
                Nota Mascota
              </Form.Label>
              <Form.Control
                className="instrument-serif-regular"
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

            {/* <Form.Group className="mt-2">
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
                  <option selected value="doberman">doberman</option>
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
            </Form.Group> */}

            <Form.Group className="mt-2">
              <Form.Label className="instrument-serif-regular">
                (*) Seleccione Tamaño
              </Form.Label>
              <select
                id="tamaño"
                className="form-select instrument-serif-regular"
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
          </Form>
           <div className="text-danger msgAlertInput mt-2  instrument-serif-regular">
              (*) Valores Obligatorios
            </div>
        </Modal.Body>
        <Modal.Footer className="mt-2 pt-1 pb-1 instrument-serif-regular">
          <Button variant="primary" type="submit" disabled={!stateValue.nameDog || !stateValue.tamaño} onClick={handleSumbit}>
            Modificar Mascota
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditDog;
