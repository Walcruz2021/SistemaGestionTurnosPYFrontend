import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTurno,
  getTurnos,
  updateTurno,
} from "../../reducer/actions/actionsTurnos";
import { asignedVentas } from "../../reducer/actions/actionsVentas";

const ModalAddFicha = ({
  state,
  setState,
  stateNewFicha,
  setStateNewFicha,
}) => {
  const companySelectedMenu = useSelector((state) => state.companySelected);

  const dispatch = useDispatch();

  const [stateCategory, setStateCategory] = useState("Cliente");

  const [newDataFicha, setNewDataFicha] = useState();

  useEffect(() => {
    if (
      companySelectedMenu &&
      companySelectedMenu.category &&
      companySelectedMenu.category === "medicina"
    ) {
      setStateCategory("Paciente");
    }
  }, [companySelectedMenu, dispatch]);

  useEffect(() => {
    if (stateNewFicha) {
      setNewDataFicha(stateNewFicha);
    }
  }, [stateNewFicha]);

  const MySwal = withReactContent(Swal);

  const handleClose = () => {
    setState(!state);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStateNewFicha((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = () => {
    const fecha = new Date(stateNewFicha.date);
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;

    // if (!newData.time.trim() === "" || !newData.date.trim() === "") {
    //   alert("valores vacios");
    // }
    dispatch(updateTurno(newDataFicha, stateNewFicha._id));
    MySwal.fire({
      title: "Ficha Guardada Correctamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(21, 151, 67)",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(getTurnos(companySelectedMenu._id));
        handleClose();
      }
    });
  };

  return (
    <>
      <Modal show={state} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adherir Ficha</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1 pb-1">
          <Form>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Receta Otorgada</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="receta"
                autoFocus
                maxLength={100}
                value={stateNewFicha ? stateNewFicha.receta : null}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Vacunas Aplicadas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="vacunas"
                autoFocus
                maxLength={100}
                value={stateNewFicha ? stateNewFicha.vacunas : null}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Tratamiento</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="tratamiento"
                autoFocus
                maxLength={100}
                value={stateNewFicha ? stateNewFicha.tratamiento : null}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Peso</Form.Label>
              <Form.Control
                name="peso"
                type="text"
                autoFocus
                maxLength={100}
                value={stateNewFicha ? stateNewFicha.peso : null}
                onChange={(e) => {
                  // Solo permitir números y máximo 10 caracteres
                  const value = e.target.value.replace(/\D/g, "").slice(0,3);
                  setStateNewFicha((prevState) => ({
                    ...prevState,
                    peso: value,
                  }));
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mt-0 pt-1 pb-1">
          <Button variant="primary" type="submit" onClick={handleSumbit}>
            Agregar Ficha
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddFicha;
