import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faPenSquare,
  faTrash,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";
import { FaFileAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalAddVtas from "../Modal/ModalAddVtas";
import ModalAddFicha from "../Modal/ModalAddFicha";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTurno,
  getTurnos,
  updateTurno,
} from "../../reducer/actions/actionsTurnos";
import ModalEditTurn from "../Modal/ModalEditTurn";
import ModalEditTurnMedicine from "../Modal/ModalEditTurnMedicine";
import ModalDescription from "../Modal/ModalDescription";
import ModalBoostrap from "react-bootstrap/Modal";
import "../../../src/App.css";
//stateInfo tru or false
const TableTurns = ({ order, setInfo, stateInfo, setOrder }) => {
  const dispatch = useDispatch();
  const companySelectedMenu = useSelector((state) => state.companySelected);

  const listTurnos = useSelector((state) => state.allTurnos);

  const [stateCategory, setStateCategory] = useState("Cliente"); //no borrar es el que determina si se vera icono de ficha si es veterinaria

  const isMedicine = useSelector((state) => state.categoryMedicine);

  const personCategory = useSelector((state) => state.typePerson);
  const [newVentas, setNewVentas] = useState(false);
  const [booleanClose, setBooleanClose] = useState(false);
  const [booleanCloseMedicine, setBooleanCloseMedicine] = useState(false);
  const [openCargaFich, setOpenCargaFich] = useState(false);
  const [stateDataEdit, setStateDataEdit] = useState();
  const [stateNewFicha, setStateNewFicha] = useState();
  const [stateNewVta, setStateNewVta] = useState();
  const [dataDescription, setDataDescription] = useState({});

  useEffect(() => {
    if (companySelectedMenu) {
      if (companySelectedMenu.category) {
        setStateCategory(companySelectedMenu.category);
      }
    }
  }, [companySelectedMenu, dispatch]);

  const MySwal = withReactContent(Swal);
  function convertDay(date) {
    const day = new Date(date).getDay();
    const days = ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"];
    return days[day];
  }

  function handleDelete(e, props) {
    MySwal.fire({
      title: "¿Estas seguro?",
      text: "¡El turno será borrado de la base de datos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1ABD53",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTurno(props.idTurn)).then(() => {
          dispatch(getTurnos(companySelectedMenu._id));
        });
        MySwal.fire({
          title: "Turno borrado",
          text: "El Turno se borró correctamente.",
          icon: "success",
          confirmButtonColor: "#00A0D2",
        });
      }
    });
  }

  function handleEditTurn(e, turn) {
    setBooleanClose(!booleanClose); //display the modal ModalEdit
    setStateDataEdit(turn); //data of turn selected
  }

  function handleEditMedicine(e, turn) {
    setBooleanCloseMedicine(!booleanCloseMedicine); //display the modal ModalEdit
    setStateDataEdit(turn); //data of turn selected
  }

  function handleCargaFicha(e, turn) {
    setStateNewFicha(turn);
    setOpenCargaFich(!openCargaFich); //display the modal ModalEdit
  }

  function handleVentas(e, turn) {
    setStateNewVta(turn);
    setNewVentas(!newVentas);
  }

  function handleOrder(e) {
    setOrder(!order);
    //dispatch(orderTurnos(order));
    const listOrder = listTurnos;
    const arrayOrder =
      order === true
        ? listOrder.sort(function (a, b) {
            const aux1 = a.date.toLocaleLowerCase();
            const aux2 = b.date.toLocaleLowerCase();
            if (aux1 > aux2) {
              return 1;
            }
            if (aux2 > aux1) {
              return -1;
            } else return 0;
          })
        : // descendente
          listOrder.sort(function (a, b) {
            const aux1a = a.date.toLocaleLowerCase();
            const aux2b = b.date.toLocaleLowerCase();
            if (aux1a > aux2b) {
              return -1;
            }
            if (aux2b > aux1a) {
              return 1;
            } else return 0;
          });

    return {
      ...listTurnos,
      listTurnos: arrayOrder,
    };
  }

  function handleInfo(e, props) {
    e.preventDefault();
    setInfo(!stateInfo);
    setDataDescription({
      _id: props._id,
      name: props.name,
      phone: props.phone,
      notesTurn: props.notesTurn,
      email: props.email,
    });
  }

  function convertDateFormat(date) {
    let info = 0;
    if (date) {
      info = date.split("-").reverse().join("/");
    }
    return info;
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    console.log(updatedCheckedState);
    setCheckedState(updatedCheckedState);
  };

  return (
    <>
      <div className="container-lg table-responsive mb-4">
        <table className="table table-bordered table-hover table-white">
          <thead className="thead-light table-secondary">
            <tr>
              {isMedicine ? (
                <th className="instrument-serif-regular">Nombre Paciente</th>
              ) : (
                <th className="instrument-serif-regular">Nombre Mascota</th>
              )}

              <th className="instrument-serif-regular">
                Fecha{" "}
                <FontAwesomeIcon
                  onClick={(e) => handleOrder(e)}
                  color={order ? "#FF846A" : "#A2DFFF"}
                  icon={faSortAlphaDown}
                  size="lg"
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th className="instrument-serif-regular">Horario</th>
              <th className="instrument-serif-regular">Opciones</th>
              <th className="instrument-serif-regular">Aviso</th>
            </tr>
          </thead>
          <tbody>
            {listTurnos
              ? listTurnos.map((turn, index) => (
                  <tr key={turn._id}>
                    <td
                      onClick={
                        (e) => handleInfo(e, turn)
                        // console.log(turn.notesTurn,"-->notes")
                      }
                      style={{ cursor: "pointer" }}
                      title={`Informe ${personCategory}`}
                      className="instrument-serif-regular"
                    >
                      {isMedicine && turn.name ? (
                        turn.name
                      ) : !turn.name ? (
                        <span className="text-danger">
                          Paciente NO Asignado
                        </span>
                      ) : turn.nameDog ? (
                        turn.nameDog
                      ) : (
                        <span className="text-danger">Paciente NO Asignado</span>
                      )}
                    </td>

                    <td className="instrument-serif-regular">
                      {convertDateFormat(turn.date)} - {convertDay(turn.date)}
                    </td>
                    <td className="instrument-serif-regular">{turn.time}</td>

                    <td>
                      <div className="d-flex justify-content-between w-100">
                        {turn.nameDog ? (
                          <button
                            className="btn"
                            onClick={
                              (e) => handleVentas(e, turn)
                              // console.log(turn.notesTurn,"----------> notyes 2")
                            }
                          >
                            <FontAwesomeIcon
                              icon={faHandHoldingUsd}
                              size="lg"
                            />
                          </button>
                        ) : (
                          <button className="btn">
                            <FontAwesomeIcon
                              icon={faHandHoldingUsd}
                              size="lg"
                              color="red"
                            />
                          </button>
                        )}

                        {/* handleEditTurn permite editar en especifico */}

                        {isMedicine ? (
                          <button
                            className="btn"
                            onClick={(e) => handleEditMedicine(e, turn)}
                          >
                            <FontAwesomeIcon icon={faPenSquare} size="lg" />
                          </button>
                        ) : (
                          <button
                            className="btn"
                            onClick={(e) => handleEditTurn(e, turn)}
                          >
                            <FontAwesomeIcon icon={faPenSquare} size="lg" />
                          </button>
                        )}

                        <button
                          className="btn"
                          data-testid="btn-eliminar"
                          onClick={(e) =>
                            handleDelete(e, {
                              idTurn: turn._id,
                              index: index,
                            })
                          }
                          width="2rem"
                          height="2rem"
                          buttoncolor="rgba(255, 0, 0, 1)"
                        >
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>

                        {stateCategory &&
                        stateCategory === "peluAndVet" &&
                        turn.nameDog ? (
                          <button
                            className="btn"
                            onClick={(e) => handleCargaFicha(e, turn)}
                            aria-label="AddFicha"
                          >
                            <FaFileAlt size="22" />
                          </button>
                        ) : stateCategory === "peluAndVet" && !turn.nameDog ? (
                          <button className="btn" disabled aria-label="AddFicha">
                            <FaFileAlt size="22" color="red" />
                          </button>
                        ) : null}
                        
                      </div>
                    </td>

                    {turn.isNotifications ? (
                      <td>
                        <div
                          className="d-flex justify-content-center align-items-center mt-2"
                          style={{ height: "100%" }}
                        >
                          <input
                            type="checkbox"
                            checked
                            style={{ width: "22px", height: "22px" }}
                          />
                        </div>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))
              : null}
          </tbody>
        </table>

        <ModalEditTurn
          booleanClose={booleanClose}
          setBooleanClose={setBooleanClose}
          stateDataEdit={stateDataEdit}
          setStateDataEdit={setStateDataEdit}
          nameClient={stateDataEdit && stateDataEdit.name}
          nameDog={stateDataEdit && stateDataEdit.nameDog}
        />

        <ModalEditTurnMedicine
          booleanCloseMedicine={booleanCloseMedicine}
          setBooleanCloseMedicine={setBooleanCloseMedicine}
          stateDataEdit={stateDataEdit}
          setStateDataEdit={setStateDataEdit}
          nameClient={stateDataEdit && stateDataEdit.name}
        />

        <ModalAddFicha
          openState={openCargaFich}
          setOpenState={setOpenCargaFich}
          stateDataFicha={stateNewFicha}
        />

        <ModalAddVtas
          state={newVentas}
          setState={setNewVentas}
          stateNewVta={stateNewVta}
          setStateNewVta={setStateNewVta}
        />

        <ModalDescription
          nameClient={dataDescription.name}
          phone={dataDescription.phone}
          notesTurn={dataDescription.notesTurn}
          email={dataDescription.email}
          setStateModal={setInfo}
          stateModal={stateInfo}
        />
      </div>
    </>
  );
};

export default TableTurns;
