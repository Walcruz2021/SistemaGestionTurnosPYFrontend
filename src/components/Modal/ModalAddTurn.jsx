import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getTurnos, addTurnos } from "../../reducer/actions/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";

const ModalAddTurn = ({ stateAddTurn, setStateAddTurn, turn }) => {
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const [optionsListSelect, setOptionsListSelect] = useState([]);
  const listClientsAll = useSelector((state) => state.allClients);
  const [stateCategory, setStateCategory] = useState("Cliente");
  const handleClose = () => setStateAddTurn(!stateAddTurn);
  const [stateInput, setStateInput] = useState({
    date: "",
    time: "",
    notesTurn: "",
    nameDog: "",
    idDog: "",
    idClient: "",
    name: "",
    arrayDogs: [],
    phone: "",
  });

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setStateInput((prevState) => ({
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

  useEffect(() => {
    if (
      companySelectedMenu.category &&
      companySelectedMenu.category === "medicina"
    ) {
      setStateCategory("Paciente");
    }
  }, [companySelectedMenu]);

  function handleChangeDog(selected) {
    setStateInput({
      ...stateInput,
      nameDog: selected.label,
      idDog: selected.value,
    });
  }

  function handleChangeCli(selected) {
    setStateInput({
      ...stateInput,
      idClient: selected.value,
      name: selected.label,
      arrayDogs: selected.label3,
      phone: selected.label2,
      nameDog: "",
      idDog: "",
    });
  }

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

  const optionsList = selectDog(stateInput.arrayDogs);

  const handleSubmit = () => {
    if (
      stateInput.name.trim() === "" ||
      stateCategory==="Cliente"?
      stateInput.nameDog.trim() === "" :null ||
      stateInput.date.trim() === "" ||
      stateInput.time.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faltan Datos por Completar",
      });
    } else if (stateInput.date < getTodayDate()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fecha Incorrecta",
      });
    } else {
      dispatch(
        addTurnos({
          name: stateInput.name,
          nameDog: stateInput.nameDog,
          idDog: stateInput.idDog,
          date: stateInput.date,
          notesTurn: stateInput.notesTurn,
          idClient: stateInput.idClient,
          time: stateInput.time,
          phone: stateInput.phone,
          Company: companySelectedMenu._id,
        })
      );
      MySwal.fire({
        title: "¡Turno creado correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "rgb(21, 151, 67)",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(getTurnos(companySelectedMenu._id));
          setStateAddTurn(!stateAddTurn);
          //onTurnoAdded();
          // Update optionsListSelect after adding a turn
          //updateOptionsList(listClientsCompany.clientes);
          setStateInput({
            name: "",
            nameDog: "",
            idDog: "",
            date: "",
            notesTurn: "",
            idClient: "",
            time: "",
            phone: "",
          });
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {/* ADD CLIENT */}
      <div>
        <Modal show={stateAddTurn} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Turno</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-1 pb-1">
            <Form>
              <Select
                className="classSelect"
                placeholder={`Seleccione ${stateCategory}`}
                onChange={(selected) => {
                  handleChangeCli(selected);
                }}
                options={optionsListSelect}
              />

              {stateCategory === "Cliente" ? (
                <Select
                  className="classSelect"
                  placeholder="Seleccione Mascota"
                  onChange={(e) => {
                    handleChangeDog(e);
                  }}
                  options={optionsList}
                />
              ) : null}

              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Fecha Turno</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  autoFocus
                  value={stateInput.date}
                  onChange={handleChange}
                  required
                  min={getTodayDate()}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Horario Turno</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  autoFocus
                  value={stateInput.time}
                  onChange={handleChange}
                  required
                  min="07:00"
                  max="22:00"
                />
              </Form.Group>

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
                  maxLength={150}
                  value={stateInput.notesTurn}
                  onChange={handleChange}
                  required
                />
                {/* <Form.Text className="textoError" muted>
                  Puedes ingresar hasta 15 caracteres.
                </Form.Text> */}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="mt-0 pt-1 pb-1">
            {!stateInput.date ||
            !stateInput.time ||
            stateCategory ==="Cliente"?
            !stateInput.nameDog :null ||
            !stateInput.idClient ? (
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                disabled
              >
                Agregar Turno
              </Button>
            ) : (
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Agregar Turno
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalAddTurn;
