import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector, useDispatch } from "react-redux";
import {asignedVentas} from "../../reducer/actions"

const ModalAddVtas = ({
  state,
  setState,
  idClient,
  notesTurn,
  idDog,
  nameCli,
  nameDog,
  date,
  idTurno
}) => {

  const dispatch = useDispatch();
  const [visibleCheckE, setVisibleCheckE] = useState(false);
  const [visibleCheckT, setVisibleCheckT] = useState(false);
  const [visibleCheckB, setVisibleCheckB] = useState(false);

  const handleCheckChange = (type) => {
    if (type === "Efectivo") {
      setVisibleCheckE(!visibleCheckE);
    } else if (type === "Transferencia") {
      setVisibleCheckB(!visibleCheckB);
    } else if (type === "Tarjeta") {
      setVisibleCheckT(!visibleCheckT);
    }
  };

  const MySwal = withReactContent(Swal);
  const [stateValue, setStateValue] = useState({
    transferencia: "",
    tarjeta: "",
    efectivo: "",
    tipoServ: ""
  });

  const handleClose = () => {
    setState(!state);
    if (visibleCheckE) {
      setVisibleCheckE(!visibleCheckE);
    }
    if (visibleCheckT) {
      setVisibleCheckT(!visibleCheckT);
    }
    if (visibleCheckB) {
      setVisibleCheckB(!visibleCheckB);
    }
    setStateValue({
      transferencia: "",
      tarjeta: "",
      efectivo: "",
      tipoServ: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = () => {
    const fecha = new Date(date);
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const valorServ =
      stateValue.efectivo + stateValue.tarjeta + stateValue.transferencia;
    const dataVta = {
      date,
      idTurno: idTurno,
      nameCli: nameCli,
      nameDog: nameDog,
      idDog: idDog,
      notesTurn: notesTurn,
      tipoServ: stateValue.tipoServ,
      valorServ: valorServ,
      transferencia: stateValue.transferencia,
      tarjeta: stateValue.tarjeta,
      efectivo: stateValue.efectivo,
      año,
      mes,
    };
    dispatch(asignedVentas(dataVta, idClient));
    MySwal.fire({
      title: "¡Venta guardada correctamente!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(21, 151, 67)",
    }).then((result) => {
      if (result.isConfirmed) {
      setState(!state)
      }
    });
  };
  return (
    <>
      <Modal show={state} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adherir Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-1 pb-1">
          <Form>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label>Tipo de Servicio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="tipoServ"
                autoFocus
                maxLength={100}
                required
                value={stateValue.tipoServ}
                onChange={handleChange}
              />
            </Form.Group>
            <div>
              <Form.Check
                type="checkbox"
                id="check-efectivo"
                label="Efectivo"
                onChange={() => handleCheckChange("Efectivo")}
                className="mt-2"
              />
              {visibleCheckE && (
                <>
                  <Form.Control
                    type="number"
                    placeholder="Efectivo"
                    name="efectivo"
                    maxLength={30}
                    required
                    className="mt-2"
                    value={stateValue.efectivo}
                    onChange={handleChange}
                  />
                </>
              )}

              <Form.Check
                type="checkbox"
                id="check-transferencia"
                label="Transferencia"
                onChange={() => handleCheckChange("Transferencia")}
                className="mt-2"
              />
              {visibleCheckB && (
                <>
                  <Form.Control
                    type="number"
                    placeholder="Transferencia"
                    name="transferencia"
                    maxLength={30}
                    required
                    className="mt-2"
                    value={stateValue.transferencia}
                    onChange={handleChange}
                  />
                </>
              )}

              <Form.Check
                type="checkbox"
                id="check-tarjeta"
                label="Tarjeta"
                onChange={() => handleCheckChange("Tarjeta")}
                className="mt-2"
              />
              {visibleCheckT && (
                <>
                  <Form.Control
                    type="number"
                    placeholder="Tarjeta"
                    name="tarjeta"
                    maxLength={30}
                    required
                    className="mt-2 mb-2"
                    value={stateValue.tarjeta}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mt-0 pt-1 pb-1">
          <Button variant="primary" type="submit" onClick={handleSumbit}>
            Agregar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
// const ModalAddVtas=()=>{
//   return(
//     <>
//     <h1>zzzzzzzz</h1>
//     </>
//   )

// }

export default ModalAddVtas;
