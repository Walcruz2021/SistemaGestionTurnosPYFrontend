import { useDispatch, useSelector } from "react-redux";
import { getTurnos, addTurnos } from "../../reducer/actions/actions";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./Formulario.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";

const Forms1 = ({ listClientsCompany, onTurnoAdded }) => {
  // const clients = useSelector((state) => state.clients);
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

  const companySelectedMenu = useSelector((state) => state.companySelected);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [optionsListSelect, setOptionsListSelect] = useState([]);

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
      };
    });
    setOptionsListSelect(options);
  };

  useEffect(() => {
    if (
      listClientsCompany &&
      typeof listClientsCompany === "object" &&
      "clientes" in listClientsCompany
    ) {
      updateOptionsList(listClientsCompany.clientes);
    }
  }, [listClientsCompany]);

  // useEffect(() => {
  //   if (clients) {
  //     updateOptionsList(clients);
  //   }
  // }, [clients]);

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
      stateInput.nameDog.trim() === "" ||
      stateInput.date.trim() === "" ||
      stateInput.notesTurn.trim() === "" ||
      stateInput.time.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faltan Datos por Completar",
      });
    } else if (stateInput.date < getTodayDate()) {
      alert("fecha incorrecta");
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
          onTurnoAdded();
          // Update optionsListSelect after adding a turn
          updateOptionsList(listClientsCompany.clientes);
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
    <div>
      <MDBContainer className="gradient-form">
        <MDBRow>
          <MDBCol col="6">
            <div className="d-flex flex-column ms-2">
              <Select
                className="classSelect"
                placeholder="Seleccione Client"
                onChange={(selected) => {
                  handleChangeCli(selected);
                }}
                options={optionsListSelect}
              />

              <Form.Select aria-label="Default select example">
              <option value="">Insert option</option>
                {optionsListSelect
                  ? optionsListSelect.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  : null}
              </Form.Select>

              <Select
                className="classSelect"
                placeholder="Seleccione Mascota"
                onChange={(e) => {
                  handleChangeDog(e);
                }}
                options={optionsList}
              />

              <MDBInput
                className="small"
                wrapperClass="mb-2"
                label="Fecha de Turno"
                id="form1"
                type="date"
                name="date"
                value={stateInput.date}
                onChange={handleChange}
                labelClass="mt-1 text-secondary"
                min={getTodayDate()}
              />

              <MDBInput
                className="small"
                wrapperClass="mb-2"
                label="Hora Turno"
                id="form1"
                type="time"
                name="time"
                value={stateInput.time}
                onChange={handleChange}
                labelClass="mt-1 text-secondary"
                min="07:00"
                max="22:00"
              />
              <MDBInput
                className="small"
                wrapperClass="mb-2"
                label="Nota Turno"
                id="form1"
                type="textarea"
                name="notesTurn"
                value={stateInput.notesTurn}
                onChange={handleChange}
                labelClass="mt-1 text-secondary"
                maxLength={100}
                rows={3}
              />
              <div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Agregar Turno
                </button>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Forms1;
