import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown } from "@fortawesome/free-solid-svg-icons";
import vacunas from "../../icons/vacunas.png";
import tratamiento from "../../icons/tratamiento.png";
import receta from "../../icons/receta.png";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsJournalPlus } from "react-icons/bs";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { get_clients_id } from "../../reducer/actions/actionsClients";
import { MdPhoneAndroid } from "react-icons/md";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { IoIosPersonAdd } from "react-icons/io";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import iconPdf from "../../icons/iconPDF.png";
import calendarOrder from "../../icons/calendarOrder.png";
import dateOrder2 from "../../icons/dateOrder2.png";

function HistorialPet() {
  const dispatch = useDispatch();
  const vtaxClient = useSelector((state) => state.vtaxClient);
  const listVts = vtaxClient.data.vta;
  const clientBusc = useSelector((state) => state.clientBusc);
  const historialRef = useRef();
  const [orderTable1, setOrderTable1] = useState(false);
  const idClientFromDashboard = JSON.parse(
    localStorage.getItem("historialData") || "{}"
  );

  useEffect(() => {
    if (idClientFromDashboard && idClientFromDashboard !== "{}") {
      dispatch(get_clients_id(idClientFromDashboard));
    }
  }, [dispatch, idClientFromDashboard]);

  function convertDateFormat(date) {
    let info = 0;
    if (date) {
      info = date.split("-").reverse().join("/");
    }
    return info;
  }

  function convertDay(date) {
    const day = new Date(date).getDay();
    if (day === 0) {
      return "Lun";
    } else if (day === 1) {
      return "Mar";
    } else if (day === 2) {
      return "Mi";
    } else if (day === 3) {
      return "Jue";
    } else if (day === 4) {
      return "Vie";
    } else if (day === 5) {
      return "Sab";
    } else return "Dom";
  }

  function generarPDF() {
    const input = historialRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Historial_Mascota.pdf");
    });
  }

  function handleOrderTable(e) {
    setOrderTable1(!orderTable1);
    //dispatch(orderTurnos(order));
    const listOrder = listVts;

    const arrayOrder =
      orderTable1 === true
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

    // return {
    //   ...stateListTurn,
    //   stateListTurn: arrayOrder,
    // };
  }

  return (
    <div className="container py-3">
      <div className="text-center d-flex justify-content-center gap-2">
        <button onClick={generarPDF} className="border-0 m-1">
          <img src={iconPdf} style={{ width: "30px", height: "35px" }} />
        </button>

        <button
          onClick={(e) => handleOrderTable(e)}
          style={{ cursor: "pointer" }}
          className="border-0 m-1"
        >
          <img src={calendarOrder} style={{ width: "25px", height: "35px" }} />
        </button>
      </div>

      <div ref={historialRef}>
        <div className="titGral">
          <h1>HISTORIAL MASCOTA</h1>
        </div>
        <div className="container-lg table-responsive mb-4">
          <div className="text-center">
            <div className="titGral">
              <div className="container py-3">
                <div className="row d-flex flex-wrap justify-content-center">
                  {/* Primer bloque */}
                  <div className="col-12 col-md-6 d-flex justify-content-center">
                    <div className="row w-100 text-center">
                      <h2 className="w-100">DATOS MASCOTAS</h2>
                      <div className="col-6 d-flex justify-content-center mb-1">
                        <div className="card-body text-center">
                          <MdOutlineDriveFileRenameOutline
                            style={{ width: "27px", height: "27px" }}
                          />
                          <p>
                            {listVts[0].Dog.nameDog === ""
                              ? "S/D"
                              : listVts[0].Dog.nameDog}
                          </p>
                        </div>
                      </div>
                      <div className="col-6 d-flex justify-content-center mb-1">
                        <div className="card-body text-center">
                          <MdOutlinePets
                            style={{ width: "27px", height: "27px" }}
                          />
                          <p>
                            {listVts[0].Dog.raza === ""
                              ? "S/D"
                              : listVts[0].Dog.raza}
                          </p>
                        </div>
                      </div>
                      <div className="col-6 d-flex justify-content-center mb-1">
                        <div className="card-body text-center">
                          <BsJournalPlus
                            style={{ width: "27px", height: "27px" }}
                          />
                          <p>
                            {listVts[0].Dog.notaP === ""
                              ? "S/D"
                              : listVts[0].Dog.notaP}
                          </p>
                        </div>
                      </div>
                      <div className="col-6 d-flex justify-content-center mb-1">
                        <div className="card-body text-center">
                          <TfiRulerAlt2
                            style={{ width: "27px", height: "27px" }}
                          />
                          <p>
                            {listVts[0].Dog.tamaño === ""
                              ? "S/D"
                              : listVts[0].Dog.tamaño}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Segundo bloque */}

                  <div className="col-12 col-md-6 d-flex justify-content-center">
                    {clientBusc && clientBusc.findClient ? (
                      <div className="row w-100 text-center">
                        <h2 className="w-100">DATOS DUEÑO</h2>
                        <div className="col-6 d-flex justify-content-center mb-1">
                          <div className="card-body text-center">
                            <IoIosPersonAdd
                              style={{ width: "27px", height: "27px" }}
                            />
                            <p>
                              {clientBusc &&
                              clientBusc.findClient.name === "" ? (
                                "S/D"
                              ) : !clientBusc ? (
                                <p>cargando...</p>
                              ) : (
                                clientBusc.findClient.name
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="col-6 d-flex justify-content-center mb-1">
                          <div className="card-body text-center">
                            <FaHouseChimneyUser
                              style={{ width: "27px", height: "27px" }}
                            />
                            <p>
                              {clientBusc &&
                              clientBusc.findClient.address === "" ? (
                                "S/D"
                              ) : !clientBusc ? (
                                <p>cargando...</p>
                              ) : (
                                clientBusc.findClient.address
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="col-6 d-flex justify-content-center mb-1">
                          <div className="card-body text-center">
                            <BsJournalPlus
                              style={{ width: "27px", height: "27px" }}
                            />
                            <p>
                              {clientBusc &&
                              clientBusc.findClient.notesCli === ""
                                ? "S/D"
                                : clientBusc.findClient.notesCli}
                            </p>
                          </div>
                        </div>

                        <div className="col-6 d-flex justify-content-center mb-1">
                          <div className="card-body text-center">
                            <MdPhoneAndroid
                              style={{ width: "27px", height: "27px" }}
                            />
                            <p>
                              {clientBusc && clientBusc.findClient.phone === ""
                                ? "S/D"
                                : clientBusc.findClient.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>cargando</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VACUNAS */}

          <div className="text-center d-flex justify-content-center gap-2 p-2">
            <img
              className="img-thumbnail"
              src={vacunas}
              style={{ width: "50px", height: "50px" }}
            />
            <div className="titGral">
              <h2>VACUNAS</h2>
            </div>
          </div>
          {/* <td>{selectedDog.selectedDog.label}</td> */}

          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-secondary">
              <tr>
                <th style={{ width: "150px" }}>Fecha </th>
                <th>Inoculacion</th>
                {/* <th>Info</th> */}
              </tr>
            </thead>
            <tbody>
              {listVts.map((data) => (
                <tr key={data._id}>
                  <td>
                    {convertDateFormat(data.date)} - {convertDay(data.date)}
                  </td>
                  <td>{data.vacunas}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TRATAMIENTO */}

          <div className="text-center d-flex justify-content-center gap-2 p-2">
            <img
              className="img-thumbnail"
              src={tratamiento}
              style={{ width: "50px", height: "50px" }}
            />
            <div className="titGral">
              <h2>TRATAMIENTO</h2>
            </div>
          </div>

          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-secondary">
              <tr>
                <th style={{ width: "150px" }}>Fecha </th>
                <th>Tratamiento</th>
                {/* <th>Info</th> */}
              </tr>
            </thead>
            <tbody>
              {listVts.map((data) => (
                <tr key={data._id}>
                  <td>
                    {convertDateFormat(data.date)} - {convertDay(data.date)}
                  </td>
                  <td>{data.tratamiento}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* RECETA */}

          <div className="text-center d-flex justify-content-center gap-2  p-2">
            <img
              className="img-thumbnail"
              src={receta}
              style={{ width: "50px", height: "50px" }}
            />
            <div className="titGral">
              <h2>RECETA</h2>
            </div>
          </div>

          <table className="table table-bordered table-hover table-white">
            <thead class="thead-light table-secondary">
              <tr>
                <th style={{ width: "150px" }}>Fecha </th>
                <th>Receta</th>
                {/* <th>Info</th> */}
              </tr>
            </thead>
            <tbody>
              {listVts.map((data) => (
                <tr key={data._id}>
                  <td>
                    {convertDateFormat(data.date)} - {convertDay(data.date)}
                  </td>
                  <td>{data.receta}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default HistorialPet;
