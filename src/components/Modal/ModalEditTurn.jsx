import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {getTurnos, updateTurno} from "../../reducer/actions/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalEditTurn = ({ stateEditTurn, setStateEditTurn, turn,stateDataEdit,setStateDataEdit }) => {

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

  // useEffect(() => {
  //   if (stateDataEdit) {
  //     setStateValue({
  //       notesTurn: stateDataEdit.notesTurn,
  //       time: stateDataEdit.time,
  //       date: stateDataEdit.date
  //     });
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateDataEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = (e) => {
    if (
      !stateDataEdit.time.trim() === "" ||
      !stateDataEdit.date.trim() === "" 
    ) {
      alert("valores vacios");
    }
    dispatch(
      updateTurno(
        stateDataEdit,
        stateDataEdit._id,
      )
    );
    MySwal.fire({
      title: "¡Turno Editado Correctamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(21, 151, 67)",
    }).then((result) => {
      if (result.isConfirmed) {
        setStateDataEdit({
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
                <Form.Label lassName="text-xs">Nota de Turno</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  // placeholder="Pepe Argento"
                  name="notesTurn"
                  autoFocus
                  maxLength={30}
                  value={stateDataEdit?stateDataEdit.notesTurn:null}
                  onChange={handleChange}
                  required
                />
                {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
              </Form.Group>
              <Form.Group>
                <Form.Label>Horario</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  autoFocus
                  maxLength={40}
                  value={stateDataEdit?stateDataEdit.time:null}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  autoFocus
                  maxLength={100}
                  value={stateDataEdit?stateDataEdit.date:null}
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
