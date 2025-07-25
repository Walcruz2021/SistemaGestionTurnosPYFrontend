import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getTurnos, updateTurno } from "../../reducer/actions/actionsTurnos";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { FormGroup } from "react-bootstrap";

const ModalEditTurn = ({
  booleanClose,
  setBooleanClose,
  stateDataEdit,
  setStateDataEdit,
  nameClient,
  nameDog,
}) => {
  const listClientsAll = useSelector((state) => state.allClients);
  const [optionsListSelect, setOptionsListSelect] = useState([]);
  const [stateCheck, setStateCheck] = useState({
    isNotifications: null, // Estado inicial
  });

  const [newData, setNewData] = useState();

  useEffect(() => {
    if (stateDataEdit) {
      setStateCheck({
        isNotifications: stateDataEdit.isNotifications, // Usa el valor inicial de `stateDataEdit`
      });
    }
  }, [stateDataEdit]);

  useEffect(() => {
    if (stateDataEdit) {
      setNewData(stateDataEdit);
    }
  }, [stateDataEdit]);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setNewData((prevState) => ({
      ...prevState,
      date: getTodayDate(),
    }));
  }, []);

  const updateOptionsList = (clients) => {
    const options = clients.map((cliente) => {
      let arrayDogs = [];
      if (cliente.perros.length > 0) {
        arrayDogs = cliente.perros.filter((dog) => dog.status === true);
      }
      return {
        value: cliente._id,
        label: cliente.name,
        label2: cliente.phone,
        label3: arrayDogs,
        label4: cliente.email,
      };
    });
    setOptionsListSelect(options);
  };

  useEffect(() => {
    if (listClientsAll) {
      updateOptionsList(listClientsAll);
    }
  }, [listClientsAll]);

  const companySelectedMenu = useSelector((state) => state.companySelected);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [show, setShow] = useState(false);

  const handleClose = () => setBooleanClose(!booleanClose);
  const [stateValue, setStateValue] = useState({
    nameDog: "",
    idDog: "",
    Client: "",
    arrayDogs: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateDataEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSumbit = (e) => {
    if (!newData.time.trim() === "" || !newData.date.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Campos Vacios",
      });
    } else if (newData.date < getTodayDate()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fecha Incorrecta",
      });
    } else {
      dispatch(updateTurno(newData, stateDataEdit._id));
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
    }
  };

  function selectDog(arrayDog) {
    const optionSelectPerro = [];
    if (arrayDog && arrayDog.length > 0) {
      arrayDog.map((np) => {
        const option = { label: np.nameDog, value: np._id };
        optionSelectPerro.push(option);
      });
    }
    return optionSelectPerro;
  }

  const optionsList =
    stateDataEdit && stateDataEdit.arrayDogs
      ? selectDog(stateDataEdit.arrayDogs)
      : [];

  function handleChangeCli(selected) {
    setStateDataEdit({
      ...stateDataEdit,
      Client: selected.value,
      name: selected.label,
      arrayDogs: selected.label3,
      phone: selected.label2,
      email: selected.label4,
      nameDog: "",
      idDog: "",
    });
  }

  function handleChangeDog(selected) {
  
    setStateDataEdit({
      ...stateDataEdit,
      nameDog: selected.label,
      idDog: selected.value,
    });
  }

  return (
    <>
      {/* ADD CLIENT */}
      <div>
        <Modal show={booleanClose} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="instrument-serif-regular">
              Editar Turno
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-1 pb-1">
            <Form>
              {!nameClient || !nameDog ? (
                <>
                  <Select
                    className="classSelect instrument-serif-regular"
                    placeholder="Seleccione Cliente"
                    onChange={(selected) => {
                      handleChangeCli(selected);
                    }}
                    options={optionsListSelect}
                  />

                  <Select
                    className="classSelect instrument-serif-regular"
                    placeholder="Seleccione Mascota"
                    onChange={(e) => {
                      handleChangeDog(e);
                    }}
                    options={optionsList}
                  />
                </>
              ) : (
                <>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      lassName="text-xs"
                      className="instrument-serif-regular"
                    >
                      Cliente
                    </Form.Label>
                    <Form.Control
                      className="instrument-serif-regular"
                      type="text"
                      // placeholder="Pepe Argento"
                      value={nameClient}
                    />
                    {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
                  </Form.Group>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      lassName="text-xs"
                      className="instrument-serif-regular"
                    >
                      Mascota
                    </Form.Label>
                    <Form.Control
                      className="instrument-serif-regular"
                      type="text"
                      // placeholder="Pepe Argento"
                      value={nameDog}
                    />
                    {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
                  </Form.Group>
                </>
              )}

              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label
                  lassName="text-xs"
                  className="instrument-serif-regular"
                >
                  Nota de Turno
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  as="textarea"
                  rows={2}
                  type="text"
                  // placeholder="Pepe Argento"
                  name="notesTurn"
                  autoFocus
                  maxLength={120}
                  value={stateDataEdit ? stateDataEdit.notesTurn : null}
                  onChange={handleChange}
                  required
                />
                {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
              </Form.Group>

              <Form.Group>
                <Form.Label className="instrument-serif-regular">
                  Horario
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  type="time"
                  name="time"
                  autoFocus
                  maxLength={40}
                  value={stateDataEdit ? stateDataEdit.time : null}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="instrument-serif-regular">
                  Fecha
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  type="date"
                  name="date"
                  autoFocus
                  min={getTodayDate()}
                  maxLength={100}
                  value={stateDataEdit ? stateDataEdit.date : null}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <FormGroup>
                <Form.Label className="p-2 instrument-serif-regular">
                  Activacion de Notificaciones
                </Form.Label>
                {stateDataEdit && (
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={stateCheck.isNotifications ?? false}
                    onChange={(e) => {
                      setStateCheck({
                        ...stateCheck,
                        isNotifications: e.target.checked,
                      }),
                        setNewData({
                          ...newData,
                          isNotifications: !stateCheck.isNotifications,
                        });
                    }}
                  />
                )}
              </FormGroup>
              <p
                className="text-danger instrument-serif-regular"
                style={{ fontSize: "12px" }}
              >
                (*) Al activar notificaciones, el cliente debe tener un email
              </p>
            </Form>
          </Modal.Body>
          <Modal.Footer className="mt-0 pt-1 pb-1 instrument-serif-regular">
            {/* <Button variant="primary" type="submit" onClick={handleClose}>
                          Save Changes
                        </Button> */}
            {}
            {newData&& newData.Client && newData.idDog ? (
              <Button variant="primary" type="submit" onClick={handleSumbit}>
                Editar Turno
              </Button>
            ) : <Button variant="primary" type="submit" onClick={handleSumbit} disabled>
                Editar Turno
              </Button>}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalEditTurn;
