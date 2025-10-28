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
import  convertDateFormat  from "../../functions/convertDateFormat";

const ModalEditTurn = ({
  booleanClose,
  setBooleanClose,
  stateDataEdit,
  setStateDataEdit,
  nameClient,
  nameDog,
}) => {
  const isMedicine = useSelector((state) => state.company.categoryMedicine);
  const personCategory = useSelector((state) => state.company.typePerson);
  const listClientsAll = useSelector((state) => state.client.allClients);
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
      if (cliente.perros && cliente.perros.length > 0) {
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

  const companySelectedMenu = useSelector((state) => state.company.companySelected);
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

  const handleSubmit = (e) => {
    if (newData.date < getTodayDate()) {
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
                    inputId="cliente-select"
                    placeholder={`Seleccione ${personCategory}`}
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
                  <Form.Group className="mb-1" controlId="modalEditname">
                    <Form.Label className="instrument-serif-regular">
                      Cliente
                    </Form.Label>
                    <Form.Control
                      className="instrument-serif-regular"
                      type="text"
                      // placeholder="Pepe Argento"
                      value={nameClient}
                    />
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
                  </Form.Group>
                </>
              )}

              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                <Form.Label className="instrument-serif-regular">
                  Nota Turno
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  as="textarea"
                  rows={2}
                  type="text"
                  // placeholder="Pepe Argento"
                  name="notesTurn"
                  autoFocus
                  maxLength="120"
                  value={stateDataEdit ? stateDataEdit.notesTurn : ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formTurnTime">
                <Form.Label className="instrument-serif-regular">
                  Horario Turno
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  type="time"
                  name="time"
                  autoFocus
                  maxLength={40}
                  value={stateDataEdit ? stateDataEdit.time : ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-1" controlId="formTurnDate">
                <Form.Label className="instrument-serif-regular">
                  Fecha Turno
                </Form.Label>
                <Form.Control
                  className="instrument-serif-regular"
                  type="date"
                  name="date"
                  autoFocus
                  min={getTodayDate()}
                  maxLength={100}
                  value={stateDataEdit ? convertDateFormat(stateDataEdit.date) : ""}
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
                (*) Al activar notificaciones, el {personCategory} debe tener un
                email
              </p>
            </Form>
          </Modal.Body>
          <Modal.Footer className="mt-0 pt-1 pb-1 instrument-serif-regular">
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={!stateDataEdit?.date || !stateDataEdit?.time} // ✅ siempre depende de los dos campos
            >
              Editar Turno
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalEditTurn;
