import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {getTurnos, updateTurno} from "../../reducer/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalEditTurn = ({ stateEditTurn, setStateEditTurn, turn }) => {
  const companySelectedMenu=useSelector((state)=>state.companySelected) 
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);
  const handleClose = () => setStateEditTurn(!stateEditTurn);
  const [stateValue, setStateValue] = useState({
    time: "",
    date: "",
    notesTurn: "",
  });

  useEffect(() => {
    if (turn) {
      setStateValue({
        notesTurn: turn.notesTurn,
        time: turn.time,
        date: turn.date
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = (e) => {
    if (
      stateValue.time.trim() === "" ||
      stateValue.date.trim() === "" ||
      stateValue.notesTurn.trim() === ""
    ) {
      alert("valores vacios");
    }
    dispatch(
      updateTurno(
        stateValue,
        turn._id,
      )
    );
    MySwal.fire({
      title: "¡Turno Editado Correctamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(21, 151, 67)",
    }).then((result) => {
      if (result.isConfirmed) {
        setStateValue({
          time: "",
          date: "",
          notesTurn: "",
        });
        dispatch(getTurnos(companySelectedMenu._id));
        handleClose();
      }
    });
  };
  return (
    <>
      {/* ADD CLIENT */}
      <div>
        <Modal show={stateEditTurn} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Turno</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-1 pb-1">
            <Form>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label lassName="text-xs">Nota Turno</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  // placeholder="Pepe Argento"
                  name="notesTurn"
                  autoFocus
                  maxLength={30}
                  value={stateValue.notesTurn}
                  onChange={handleChange}
                  required
                />
                {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
              </Form.Group>
              <Form.Group>
                <Form.Label>Domicilio</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  autoFocus
                  maxLength={40}
                  value={stateValue.time}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Fecha Turno</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  autoFocus
                  maxLength={100}
                  value={stateValue.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="mt-0 pt-1 pb-1">
            {/* <Button variant="primary" type="submit" onClick={handleClose}>
                          Save Changes
                        </Button> */}
            <Button variant="primary" type="submit" onClick={handleSumbit}>
              Editar Turno
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalEditTurn;
