import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../api/configFirebase";
import { useDispatch, useSelector } from "react-redux";
import { searchUser , resetUserSearch} from "../../reducer/actions/actionsUser"// Mantenemos la acción de buscar usuario

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ModalRestPassword({ show, setShow }) {
  const dispatch = useDispatch();
  const userSearch = useSelector((state) => state.user.userEmailSearch);

  const handleClose = () => {
    setShow(false);
    setEmail("");
  };
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState();
  const [validationEmail, setValidationEmail] = useState(false);
  const [alertTemp, setAlertTemp] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (newEmail) {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (emailPattern.test(newEmail)) {
        setValidationEmail(true);
      } else {
        setValidationEmail(false);
      }
    }
  };

  const sendEmail = () => {
    functionAlertUser();
    setShow(false);
  };

  const functionAlertUser = async () => {
    let timerInterval;
    Swal.fire({
      title: "Revisando el Email!",
      html: "La ventana se cerrará en <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        setAlertTemp(false);
        clearInterval(timerInterval);
      },
    }).then(async (result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // Realizamos la búsqueda
        dispatch(searchUser(email));

        // Después de realizar la búsqueda, podemos esperar un ciclo de renderizado y actualizar el estado de userSearch
      }
    });
  };

  // Esta función se ejecuta cuando el valor de userSearch cambia, y la siguiente búsqueda debe restablecer el valor de userSearch a null.
  useEffect(() => {
    if (userSearch) {
      const handleResetPassword = async () => {
        if (userSearch.status === 200) {
          try {
            await sendPasswordResetEmail(auth, email); // Resetear contraseña
            Swal.fire("Se envió Email de Reestablecimiento");
          } catch (error) {
            console.error("Error al enviar el correo de reestablecimiento:", error);
            Swal.fire("Error al enviar el Email de Reestablecimiento");
          }
        } else if (userSearch.status === 404) {
          Swal.fire("Email No Registrado");
        }

        // Limpiamos userSearch después de procesar la respuesta.
        setTimeout(() => {
          dispatch(resetUserSearch());
        }, 500); // Limpiar después de un pequeño retraso
      };

      handleResetPassword();
    }
  }, [userSearch, dispatch, email]); 

  return (
    <div className="mt-2 mb-2">
      <Button variant onClick={handleShow} className="buttonModal anton-regular">
        ¿Olvidaste la Contraseña?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Te enviaremos un Link a tu Correo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {email && validationEmail ? (
            <Button variant="primary" onClick={sendEmail}>
              Buscar Email
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalRestPassword;
