import React from "react";
import "./HistorialClient.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getClients,
  deleteClient,
  updateClient,
} from "../../reducer/actions/actions";

import { deleteDog } from "../../reducer/actions/actionsDog";
import convertNum from "../../functions/convertNum";
import Swal from "sweetalert2";
import ModalEditDog from "../Modal/ModalEditDog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faAngleRight,
  faDollarSign,
  faIdCard,
  faMoneyBillTransfer,
  faChartLine,
  faTrashArrowUp,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from "react";
import { renderMatches } from "react-router-dom";

export default function HistorialClient({ state, stateHist, setStateHist }) {
  var arrayDog = [];
  const isMedicine = useSelector((state) => state.company.categoryMedicine);
  const [stateDog, setDog] = useState(state.arrayDogs);

  useEffect(() => {
    if (state) {
      setDog(state.arrayDogs);
    }
  }, [state]);

  const [stateEditDog, setEditDog] = useState(false);
  const [inputStateDog, setStateDog] = useState({
    idDog: "",
    notaP: "",
    nameDog: "",
    raza: "",
    tamaño: "",
  });

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  let sumaTarjeta = 0;
  let sumaBanco = 0;
  let sumaEfectivo = 0;
  let cantPedidos = 0;

  if (state.arrayPedidos.length > 0) {
    cantPedidos = state.arrayPedidos.length;
    for (let i = 0; i < state.arrayPedidos.length > 0; i++) {
      if (sumaTarjeta + state.arrayPedidos[i].tarjeta) {
        sumaTarjeta = sumaTarjeta + state.arrayPedidos[i].tarjeta;
      }
      if (state.arrayPedidos[i].transferencia) {
        sumaBanco = sumaBanco + state.arrayPedidos[i].transferencia;
      }
      if (state.arrayPedidos[i].efectivo) {
        sumaEfectivo = sumaEfectivo + state.arrayPedidos[i].efectivo;
      }
    }
  }

  function pruebaConsole(props) {
    // setStateModal({
    //   prop.status:false
    // })
  }

  const DogDelete = async (idDog, index) => {
    MySwal.fire({
      title: "¿Estas seguro?",
      text: "¡El Perro será borrado del cliente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1ABD53",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(deleteDog(idDog));
     
        if (response?.status === 200) {
          const array = stateDog.splice(index, 1);
          setDog({
            array,
          });

          MySwal.fire({
            title: "Perro Eliminado",
            text: "El Perro fue eliminado",
            icon: "success",
            confirmButtonColor: "#00A0D2",
          });
        } else if (response?.status === 204) {
 
          await MySwal.fire({
            icon: "info",
            title: "No se puede eliminar",
            text: "No se pude eliminar. Hay turnos pendientes.",
            confirmButtonColor: "#00A0D2",
          });
        }
      }
    });
  };

  const editDog = (id, nameDog, notaP, raza, tamaño) => {
    setStateDog({
      idDog: id,
      nameDog: nameDog,
      notaP: notaP,
      raza: raza,
      tamaño: tamaño,
    });
    setEditDog(!stateEditDog);
  };

  //EDICION DE DOG

  return (
    <>
      <ModalEditDog
        idDog={inputStateDog.idDog}
        id={10}
        state={stateEditDog}
        setStateModal={setEditDog}
        notaP={inputStateDog.notaP}
        value={inputStateDog.notaP}
        nameDog={inputStateDog.nameDog}
        raza={inputStateDog.raza}
        tamaño={inputStateDog.tamaño}
        stateHist={stateHist}
        setStateHist={setStateHist}
        modalContainerBox
        showInSettings
      />

      {state.arrayPedidos.length > 0 ? (
        <>
          <h5 className="instrument-serif-regular text-center">
            Total Servicios
          </h5>
          <div className="containerPed">
            <div className="contenedorSuma">
              <FontAwesomeIcon
                className="icon3"
                icon={faDollarSign}
                size="lg"
              />
              <h6 className="instrument-serif-regular">Efectivo</h6>
              <p className="instrument-serif-regular">
                {convertNum(sumaEfectivo)}
              </p>
            </div>

            <div className="contenedorSuma">
              <FontAwesomeIcon className="icon3" icon={faIdCard} size="lg" />
              <h6>Tarjeta</h6>
              <p>{convertNum(sumaTarjeta)}</p>
            </div>

            <div className="contenedorSuma">
              <FontAwesomeIcon
                className="icon3"
                icon={faMoneyBillTransfer}
                size="lg"
              />
              <h6>Transferencia</h6>
              <p>{convertNum(sumaBanco)}</p>
            </div>

            <div className="contenedorSuma">
              <FontAwesomeIcon className="icon3" icon={faChartLine} size="lg" />
              <h6>Cantidad Servicios</h6>
              <p>{cantPedidos}</p>
            </div>
          </div>
        </>
      ) : null}

      {!isMedicine ? (
        <>
          <div className="contenedorTit">
            <h5>Listado de Mascotas</h5>
          </div>

          <div className="containerGralDog">
            {stateDog && stateDog.length
              ? stateDog.map((dog, index) =>
                  dog.status === true ? (
                    <div className="container-description ">
                      <div>
                        <h5 className="titulo">{dog.nameDog}</h5>
                        <h5 className="descripcion">Nota: {dog.notaP}</h5>
                        {/* <h5 className="descripcion">Raza: {dog.raza}</h5> */}
                        <h5 className="descripcion">Tamaño: {dog.tamaño}</h5>

                        <button
                          className="buttonDleteDog"
                          onClick={() => DogDelete(dog._id, index)}
                        >
                          <FontAwesomeIcon
                            className="icon4"
                            icon={faTrashArrowUp}
                            size="lg"
                          />
                        </button>
                        <button
                          className="buttonEditDog"
                          onClick={() =>
                            editDog(
                              dog._id,
                              dog.nameDog,
                              dog.notaP,
                              dog.raza,
                              dog.tamaño
                            )
                          }
                        >
                          <FontAwesomeIcon
                            className="icon5"
                            icon={faFilePen}
                            size="lg"
                          />
                        </button>
                      </div>
                    </div>
                  ) : null
                )
              : null}
          </div>
        </>
      ) : null}
    </>
  );
}
