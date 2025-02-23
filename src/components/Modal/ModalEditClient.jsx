import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getClients, updateClient } from "../../reducer/actions/actionsClients";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalEditClient = ({
  state,
  setState,
  idClient: initialIdClient,
  name: initialName,
  phone: initialPhone,
  address: initialAddress,
  notesCli: initialNotesCli,
  email: initialEmail,
}) => {
  const dispatch = useDispatch();
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);
  const handleClose = () => setState(!state);
  const [stateValue, setStateValue] = useState({
    idClient: "" || initialIdClient,
    name: "" || initialName,
    phone: "" || initialPhone,
    address: "" || initialAddress,
    notesCli: "" || initialNotesCli,
    email:"" || initialEmail
  });

  useEffect(() => {
    setStateValue({
      idClient: "" || initialIdClient,
      name: "" || initialName,
      phone: "" || initialPhone,
      address: "" || initialAddress,
      notesCli: "" || initialNotesCli,
      email: "" || initialEmail,
    });
  }, [initialName, initialPhone, initialAddress, initialNotesCli,initialEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = (e) => {
    if (
      stateValue.name.trim() === "" ||
      stateValue.notesCli.trim() === "" ||
      stateValue.address.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faltan Datos por Completar",
      });
    }
    dispatch(
      updateClient(
        {
          name: stateValue.name,
          phone: stateValue.phone,
          address: stateValue.address,
          notesCli: stateValue.notesCli,
          email:stateValue.email
        },
        stateValue.idClient
      )
    );
    MySwal.fire({
      title: "¡Cliente Modificado Correctamente!",
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
        dispatch(getClients(companySelectedMenu._id));
        handleClose();
      }
    });
  };
  return (
    <>
      <div>
        <Modal show={state} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Cliente</Modal.Title>
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
                  maxLength={30}
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
                  maxLength={100}
                  value={stateValue.notesCli}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  autoFocus
                  maxLength={100}
                  value={stateValue.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="mt-0 pt-1 pb-1">
            {/* <Button variant="primary" type="submit" onClick={handleClose}>
                          Save Changes
                        </Button> */}
            <Button variant="primary" type="submit" onClick={handleSumbit}>
              Modificar Cliente
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalEditClient;
