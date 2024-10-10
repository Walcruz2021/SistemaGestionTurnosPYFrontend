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

const ModalImportClients = ({ stateVisible, setStateVisible }) => {
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
      const response = await fetch("http://localhost:3002/api/importClientsExcel", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Clientes Agregado Correctamente",
          showConfirmButton: false,
          timer: 1500
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
    <>
      <div>
        <Modal show={stateVisible} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Importacion Masiva de Clientes</Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-3 pb-3">
            <Form>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
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
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Subir Archivo
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalImportClients;
