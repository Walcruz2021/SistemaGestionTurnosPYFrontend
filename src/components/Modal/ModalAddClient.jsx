import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getClients, addClient } from "../../reducer/actions/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalAddClient = ({ state = newClient, setState = setNewClient }) => {
  const companySelectdMenu = useSelector((state) => state.companySelected);

  const [companySelectedState, setCompanySelectedState] = useState();

  useEffect(() => {
    if (companySelectdMenu) {
      setCompanySelectedState(companySelectdMenu);
    }
  });

  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);
  const handleClose = () => setState(!state);
  const [stateValue, setStateValue] = useState({
    name: "",
    phone: "",
    address: "",
    notesCli: "",
  });

  const handleChange = (e) => {
    const { name, address, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
      [address]: value,
    }));
  };

  const handleSumbit = (e) => {
    if (
      stateValue.name.trim() === "" ||
      stateValue.phone.trim() === "" ||
      stateValue.notesCli.trim() === "" ||
      stateValue.address.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faltan Datos por Completar",
      });
    } else {
      dispatch(
        addClient({
          name: stateValue.name,
          address: stateValue.address,
          notesCli: stateValue.notesCli,
          phone: stateValue.phone,
          status: true,
          Company: companySelectedState._id,
        })
      );
      MySwal.fire({
        title: "¡Cliente creado correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(21, 151, 67)",
      }).then((result) => {
        if (result.isConfirmed) {
          setStateValue({
            name: "",
            address: "",
            notesCli: "",
            phone: "",
          });
          dispatch(getClients(companySelectedState._id));
          handleClose();
        }
      });
    }
  };
  return (
    <>
      {/* ADD CLIENT */}
      <div>
        <Modal show={state} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adherir Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-1 pb-1">
            <Form>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label lassName="text-xs">Nombre y Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pepe Argento"
                  name="name"
                  autoFocus
                  maxLength={25}
                  value={stateValue.name}
                  onChange={handleChange}
                  required
                />
                {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Teléfono Contacto</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="3876153799"
                  name="phone"
                  autoFocus
                  maxLength={15}
                  value={stateValue.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Domicilio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dean Funes 1235"
                  name="address"
                  autoFocus
                  maxLength={40}
                  value={stateValue.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nota Cliente</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notesCli"
                  autoFocus
                  maxLength={150}
                  value={stateValue.notesCli}
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
            {!stateValue.name ||
            !stateValue.phone ||
            !stateValue.address ||
            !stateValue.notesCli ? (
              <Button variant="primary" type="submit" onClick={handleSumbit} disabled>
                Agregar Cliente
              </Button>
            ) : (
              <Button variant="primary" type="submit" onClick={handleSumbit}>
                Agregar Cliente
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalAddClient;
