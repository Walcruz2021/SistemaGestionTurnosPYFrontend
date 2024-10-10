import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "../css/cssGeneral.css";
import { FaCheck } from "react-icons/fa6";

const ImportMasivaInforme = () => {
  const [file, setFile] = useState(null);
  const handleClose = () => setStateVisible(!stateVisible);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:3002/api/importClientsExcel",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Clientes Agregado Correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Revisar el Archivo",
        });
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Hubo un error al subir el archivo.");
    }
  };

  return (
    <div className="container">
      <div>
        <div className="titGral">
          <h2>CONSIDERE LOS SIGUIENTES PUNTOS</h2>
        </div>
        <div className="textGral">
          <li> El archivo se debe subir en un archivo Excel</li>
          <li>
            Los campos deben tener los siguientes nombres tal cual muestra la
            siguiente imagen
          </li>
          <li>
            En caso de que algún campo no cumpla con los requisitos no se subirá
            el archivo
          </li>
          <li>
            El campo <span className="fw-bold">phone</span> debe ser si o si un
            número
          </li>
          <li>Los demás campos serán palabras comunes</li>
          <li>NO deben existir campos en blanco</li>
        </div>
      </div>

      <Form className="pt-3">
        <Modal.Header>
          <Modal.Title>Importacion Masiva de Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-3 pb-3">
          <Form>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label className="pt-1 pb-3">Ingrese Archivo</Form.Label>
              <Form.Control
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="mt-0 pt-3 pb-3">
          {file ? (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Subir Archivo
            </Button>
          ) : (
            <Button variant="primary" type="submit" disabled>
              Subir Archivo
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </div>
  );
};

export default ImportMasivaInforme;
