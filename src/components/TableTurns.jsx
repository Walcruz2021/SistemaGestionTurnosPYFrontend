import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faPenSquare,
  faTrash,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalAddVtas from "../components/Modal/ModalAddVtas";
import { useSelector, useDispatch } from "react-redux";
import { deleteTurno, getTurnos,updateTurno } from "../reducer/actions/actions";
import ModalEditTurn from "../components/Modal/ModalEditTurn";

const TableTurns = ({
  setInputState,
  order,
  setInfo,
  stateInfo,
  setOrder,
}) => {
  const dispatch = useDispatch();
  const companySelectedMenu = useSelector((state) => state.companySelected);
  const listTurnos = useSelector((state) => state.allTurnos);
  
  const [newVentas, setNewVentas] = useState(false);
  const [stateEditTurn, setStateEditTurn] = useState(false);
  const [stateDataEdit, setStateDataEdit] = useState();


  useEffect(() => {
    if (companySelectedMenu) {
      dispatch(getTurnos(companySelectedMenu._id));
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
    setStateEditTurn(!stateEditTurn); //display the modal ModalEdit
    setStateDataEdit(turn); //data of turn selected
  }

  function handleVentas(e, props) {
    e.preventDefault();
    // console.log(props.idDog)
    // ESTOS DATOS SE TRAEN LLAMANDO A LA FUNCION getTurnos PARA QUE SE RENDERIZEN EN LA TABLA A MOSTRAR
    // ESTOS DATOS SOLO SE MUESTRAN UNA VEZ QUE SE REALIZAN CLICK EN EL ICONO DE ALGUNA FILA
    //     date: "15-01-1988"
    //     name: "omar"
    //     valorServ: undefined
    //     _id: "61f332036a0a2a71c9de7bc7"
    //  console.log(props.notesTurn,"si llega")
    setNewVentas(!newVentas);
    // console.log(props.idClient);
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
    setInputState({
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

    // MySwal.fire({
    //   title: "¿Estas seguro?",
    //   text: "¡El turno será borrado de la base de datos!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#1ABD53",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Sí",
    //   cancelButtonText: "Cancelar",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     dispatch(deleteTurno(props.idTurn)).then(() => {
    //       dispatch(getTurnos(companySelectedMenu._id));
    //     });
    //     MySwal.fire({
    //       title: "Turno borrado",
    //       text: "El Turno se borró correctamente.",
    //       icon: "success",
    //       confirmButtonColor: "#00A0D2",
    //     });
    //   }
    // });
  };

  return (
    <>
      <div className="container-lg table-responsive mb-4">
        <table className="table table-bordered table-hover table-white">
          <thead className="thead-light table-secondary">
            <tr>
              <th>Nombre Mascota</th>
              <th>
                Fecha{" "}
                <FontAwesomeIcon
                  onClick={(e) => handleOrder(e)}
                  color={order ? "#FF846A" : "#A2DFFF"}
                  icon={faSortAlphaDown}
                  size="lg"
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th>Horario</th>
              <th>Opciones</th>
              <th>Aviso</th>
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
                    >
                      {turn.nameDog}
                    </td>
                    <td>
                      {convertDateFormat(turn.date)} - {convertDay(turn.date)}
                    </td>
                    <td>{turn.time}</td>

                    <td>
                      <>
                        <button
                          className="btn"
                          onClick={
                            (e) => handleVentas(e)
                            // console.log(turn.notesTurn,"----------> notyes 2")
                          }
                        >
                          <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" />
                        </button>

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
                      </>
                    </td>
                    <ModalAddVtas
                      state={newVentas}
                      setState={setNewVentas}
                      date={turn.date} // al realizarse click en el icono ADHERIR VENTA se traen los datos y parte de
                      // estos se pasan como parametros para que se renderize este modal. Estos parametros (DATE Y NAME)
                      // se envian al archivo MODAL. Posteriormente se envian estos datos al action para que se pasen al backend
                      nameCli={turn.name}
                      nameDog={turn.nameDog}
                      idClient={turn.Client}
                      notesTurn={turn.notesTurn}
                      idDog={turn.idDog}
                      idTurno={turn._id}
                    />

                    {turn.isNotifications ? (
                      <td>
                        <input
                          type="checkbox"
                          checked
                        
                        />
                      </td>
                    ) : (
                      <td>
                     
                      </td>
                    )}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <ModalEditTurn
          stateEditTurn={stateEditTurn}
          setStateEditTurn={setStateEditTurn}
          stateDataEdit={stateDataEdit}
          setStateDataEdit={setStateDataEdit}
  
        />
      </div>
    </>
  );
};

export default TableTurns;
