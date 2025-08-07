import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getClients, updateClient } from "../../reducer/actions/actionsClients";
import { updateTurno } from "../../reducer/actions/actionsTurnos";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { set } from "react-hook-form";

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

  const listClients = useSelector((state) => state.allClients);
  const personCategory = useSelector((state) => state.typePerson);
  const dispatch = useDispatch();
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);
  const handleClose = () => setState(!state);
  const [emailError, setEmailError] = useState("");
  const [validactionEmail, setValidactionEmail] = useState(false);
  
  const [stateValue, setStateValue] = useState({
    idClient: "" || initialIdClient,
    name: "" || initialName,
    phone: "" || initialPhone,
    address: "" || initialAddress,
    notesCli: "" || initialNotesCli,
    email: "" || initialEmail,
  });
  const [stateEmail, setStateEmail] = useState({
    email: "",
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
  }, [
    initialName,
    initialPhone,
    initialAddress,
    initialNotesCli,
    initialEmail,
  ]);

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
          email: validactionEmail&&stateEmail ? stateEmail.email : initialEmail,
        },
        stateValue.idClient
      )
    );
  

    MySwal.fire({
      title: `¡${personCategory} Modificado Correctamente!`,
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
            <Modal.Title>Editar {personCategory}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-1 pb-1">
            <Form>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text-xs instrument-serif-regular">Nombre y Apellido</Form.Label>
                <Form.Control
                className="instrument-serif-regular"
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
                <Form.Label className="instrument-serif-regular">Teléfono Contacto</Form.Label>
                <Form.Control
                className="instrument-serif-regular"
                  type="number"
                  placeholder="3876153799"
                  name="phone"
                  autoFocus
                  maxLength={15}
                  value={stateValue.phone}
                  onChange={(e) => {
                    // Solo permitir números y máximo 10 caracteres
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 15);
                    setStateValue((prevState) => ({
                      ...prevState,
                      phone: value,
                    }));
                  }}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="instrument-serif-regular">Domicilio</Form.Label>
                <Form.Control
                className="instrument-serif-regular"
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
                <Form.Label className="instrument-serif-regular">Nota {personCategory}</Form.Label>
                <Form.Control
                className="instrument-serif-regular"
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
                <Form.Label className="instrument-serif-regular">Email</Form.Label>
                <Form.Control
                className="instrument-serif-regular"
                  name="email"
                  autoFocus
                  maxLength={100}
                  value={stateValue.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setStateValue((prevState) => ({
                      ...prevState,
                      email: value,
                    }));
                    // Validar formato email
                    const emailRegex =
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                    if (value && !emailRegex.test(value)) {
                      setValidactionEmail(false);
                      setEmailError("Debe ingresar un email válido.");
                    } else {
                      setValidactionEmail(true);
                      setStateEmail((prevState) => ({
                        ...prevState,
                        email: value,
                      }));
                      setEmailError("");
                    }
                  }}
                />
                {emailError && (
                  <div className="text-danger small mt-1 instrument-serif-regular">{emailError}</div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="mt-0 pt-1 pb-1 instrument-serif-regular">
            {/* <Button variant="primary" type="submit" onClick={handleClose}>
                          Save Changes
                        </Button> */}
            <Button variant="primary" type="submit" onClick={handleSumbit}>
              Modificar {personCategory}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalEditClient;
