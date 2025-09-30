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
import { TbVaccine } from "react-icons/tb";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { MdOutlineBalance } from "react-icons/md";

const ModalAddFicha = ({ openState, setOpenState, stateDataFicha }) => {
  const companySelectedMenu = useSelector((state) => state.companySelected);

  const dispatch = useDispatch();

  const [stateCategory, setStateCategory] = useState("Cliente");

  const [newDataFicha, setNewDataFicha] = useState({
    receta: "",
    vacunas: "",
    tratamiento: "",
    peso: "",
  });

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
    if (openState) {
      setNewDataFicha(stateDataFicha);
    }
  }, [openState]);

  const MySwal = withReactContent(Swal);

  const handleClose = () => {
    setOpenState(!openState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewDataFicha((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = () => {
    const fecha = new Date(stateDataFicha.date);
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;

    // if (!newData.time.trim() === "" || !newData.date.trim() === "") {
    //   alert("valores vacios");
    // }
    const updatedFicha = { ...newDataFicha, statusFile: true };
    setNewDataFicha(updatedFicha);
    dispatch(updateTurno(updatedFicha, stateDataFicha._id));
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
      <Modal show={openState} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="instrument-serif-regular">
            Adherir Ficha
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1 pb-1">
          <Form>
            <Form.Group className="mb-1" controlId="modalReceta">
              <div className=" mb-1 mt-1">
                <CgNotes size={28} />
                <Form.Label className="instrument-serif-regular">
                  Receta Otorgada
                </Form.Label>
              </div>

              <Form.Control
                className="instrument-serif-regular"
                as="textarea"
                rows={2}
                name="receta"
                autoFocus
                maxLength={100}
                value={newDataFicha ? newDataFicha.receta : ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="modalVacunas">
              <div className="mb-1 mt-1">
                <TbVaccine size={28} />{" "}
                <Form.Label className="instrument-serif-regular">
                  Vacunas Aplicadas
                </Form.Label>
              </div>
              <Form.Control
                className="instrument-serif-regular"
                as="textarea"
                rows={2}
                name="vacunas"
                autoFocus
                maxLength={100}
                value={newDataFicha ? newDataFicha.vacunas : null}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="modalTratamiento">
              <div className="mb-1 mt-1">
                <AiOutlineMedicineBox size={28} />{" "}
                <Form.Label className="instrument-serif-regular">
                  Tratamiento
                </Form.Label>
              </div>
              <Form.Control
                className="instrument-serif-regular"
                as="textarea"
                rows={2}
                name="tratamiento"
                autoFocus
                maxLength={100}
                value={newDataFicha ? newDataFicha.tratamiento : null}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <div className="mb-1 mt-1">
                <MdOutlineBalance size={28} />{" "}
                <Form.Label className="instrument-serif-regular">
                  Peso
                </Form.Label>
              </div>
              <Form.Control
                className="instrument-serif-regular"
                name="peso"
                type="text"
                autoFocus
                maxLength={3}
                value={newDataFicha ? newDataFicha.peso : ""}
                onChange={(e) => {
                  // Solo permitir números y máximo 3 caracteres
                  const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setNewDataFicha((prevState) => ({
                    ...prevState,
                    peso: value,
                  }));
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mt-0 pt-1 pb-1">
          <Button
            variant="primary"
            type="submit"
            onClick={handleSumbit}
            className="instrument-serif-regular"
          >
            Agregar Ficha
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddFicha;
