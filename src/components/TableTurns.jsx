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
import ModalAddVtas from "../components/Modal/ModalAddVtas";
import ModalAddFicha from "../components/Modal/ModalAddFicha";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTurno,
  getTurnos,
  updateTurno,
} from "../reducer/actions/actionsTurnos";
import ModalEditTurn from "../components/Modal/ModalEditTurn";
import ModalDescription from "./Modal/ModalDescription";
import ModalBoostrap from "react-bootstrap/Modal";
import "../../src/App.css";
//stateInfo tru or false
const TableTurns = ({ order, setInfo, stateInfo, setOrder }) => {
  const dispatch = useDispatch();
  const companySelectedMenu = useSelector((state) => state.companySelected);

  const listTurnos = useSelector((state) => state.allTurnos);

  const [stateCategory, setStateCategory] = useState("Cliente");

  const [newVentas, setNewVentas] = useState(false);
  const [booleanClose, setBooleanClose] = useState(false);
  const [stateCargaFich, setStateCargaFich] = useState(false);
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

    //with const days = ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"];
    //return days[day] I avoid having thaht insert next code
    // if (day === 0) {
    //   return "Lun";
    // } else if (day === 1) {
    //   return "Mar";
    // } else if (day === 2) {
    //   return "Mi";
    // } else if (day === 3) {
    //   return "Jue";
    // } else if (day === 4) {
    //   return "Vie";
    // } else if (day === 5) {
    //   return "Sab";
    // } else return "Dom";
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

  function handleCargaFicha(e, turn) {
    setStateNewFicha(turn);
    setStateCargaFich(!stateCargaFich); //display the modal ModalEdit
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
              <th className="instrument-serif-regular">Nombre Mascota</th>

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
                      title="Informe Cliente"
                      className="instrument-serif-regular"
                    >
                      {turn.nameDog ? (
                        turn.nameDog
                      ) : (
                        <span className="text-danger">Cliente NO Asignado</span>
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
                        <button
                          className="btn"
                          onClick={(e) => handleEditTurn(e, turn)}
                        >
                          <FontAwesomeIcon icon={faPenSquare} size="lg" />
                        </button>

                        <button
                          className="btn"
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
                          >
                            <FaFileAlt size="22" />
                          </button>
                        ) : !turn.nameDog ? (
                          <button
                            className="btn"
                           
                          >
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

        <ModalAddFicha
          state={stateCargaFich}
          setState={setStateCargaFich}
          stateNewFicha={stateNewFicha}
          setStateNewFicha={setStateNewFicha}
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
