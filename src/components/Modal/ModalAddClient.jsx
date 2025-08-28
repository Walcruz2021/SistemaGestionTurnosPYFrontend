import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getClients, addClient } from "../../reducer/actions/actionsClients";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalAddClient = ({ state = newClient, setState = setNewClient }) => {
  const companySelectdMenu = useSelector((state) => state.companySelected);

  const [companySelectedState, setCompanySelectedState] = useState();

  const personCategory = useSelector((state) => state.typePerson);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);
  const handleClose = () => setState(!state);
  const [stateValue, setStateValue] = useState({
    name: "",
    phone: "",
    address: "",
    notesCli: "",
    email: "",
  });

  useEffect(() => {
    if (companySelectdMenu) {
      setCompanySelectedState(companySelectdMenu);
    }
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
          email: stateValue.email,
        })
      );
      MySwal.fire({
        title: `¡${personCategory} creado correctamente!`,
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
            email: "",
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
            <Modal.Title className="instrument-serif-regular">
              Adherir {personCategory}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-1 pb-1">
            <Form>
              <Form.Group className="mb-1" controlId="labelNameApellido">
                <Form.Label className="instrument-serif-regular">
                  (*) Nombre y Apellido
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
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

              <Form.Group className="mb-1" controlId="labelPhonePet">
                <Form.Label className="instrument-serif-regular">
                  (*) Teléfono Contacto
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  type="text"
                  inputMode="numeric" //en celulares abre el teclado numérico.
                  pattern="[0-9]*"
                  placeholder="3876153799"
                  name="phone"
                  autoFocus
                  maxLength={15}
                  value={stateValue.phone}
                  onChange={(e) => {
                    // Solo permitir números y máximo 15 caracteres
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

              <Form.Group className="mb-1" controlId="labelAddress">
                <Form.Label className="instrument-serif-regular">
                  (*) Domicilio
                </Form.Label>
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

              <Form.Group className="mb-1" controlId="labelNote">
                <Form.Label className="instrument-serif-regular">
                  (*) Nota {personCategory}
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  as="textarea"
                  rows={3}
                  name="notesCli"
                  autoFocus
                  maxLength={120}
                  value={stateValue.notesCli}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-1"
                controlId="labelEmail"
              >
                <Form.Label className="instrument-serif-regular">
                  Email {personCategory} {}
                  <span
                    className="text-danger form-text"
                    style={{ fontSize: "0.7em" }}
                  >
                    (Campo No Obligatorio)
                  </span>
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  rows={3}
                  name="email"
                  type="email"
                  autoFocus
                  maxLength={40}
                  value={stateValue.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
            <div className="text-danger msgAlertInput mt-2  instrument-serif-regular">
              (*) Valores Obligatorios
            </div>
          </Modal.Body>

          <Modal.Footer className="mt-0 pt-1 pb-1 instrument-serif-regular">
            {/* <Button variant="primary" type="submit" onClick={handleClose}>
                          Save Changes
                        </Button> */}
            {!stateValue.name ||
            !stateValue.phone ||
            !stateValue.address ||
            !stateValue.notesCli ? (
              <Button
                variant="primary"
                type="submit"
                onClick={handleSumbit}
                disabled
              >
                Agregar {personCategory}
              </Button>
            ) : (
              <Button variant="primary" type="submit" onClick={handleSumbit}>
                Agregar {personCategory}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalAddClient;
