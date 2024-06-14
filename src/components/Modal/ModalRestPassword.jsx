import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../../hooks/configFirebase";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../reducer/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function ModalRestPassword({show,setShow}) {
  const dispatch = useDispatch();
  const userSearch = useSelector((state) => state.userEmailSearch);
  //console.log(userSearch);

  const handleClose = () => {
    setShow(false);
    setEmail("");
  };
  const handleShow = () => setShow(true);
  const [modalUser, setModalUser] = useState(false);
  const [email, setEmail] = useState();
  console.log(email);
  const [alertTemp, setAlertTemp] = useState(false);
  const [validationEmail, setValidationEmail] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  
    if (newEmail) {
      // Updated regular expression to be case-insensitive and allow for longer TLDs
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (emailPattern.test(newEmail)) {
        setValidationEmail(true);
      } else {
        setValidationEmail(false);
      }
    }
  };

  const sendEmail = async () => {
  
    //dispatch(searchUser(email));
    //setEmail("");

    await sendPasswordResetEmail(auth, email)
      .then(function () {
        dispatch(searchUser(email))
      })
      .catch(function (error) {
        // Se produjo un error
        console.error("Error al enviar el email de restablecimiento:", error);
      });
    setShow(false);
    setAlertTemp(true);
  };

  if (alertTemp === true) {
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
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        functionAlertUser();
      }
    });
  }

  const functionAlertUser = () => {
    setModalUser(true);
  };

  if (modalUser) {
    if (userSearch) {
      if (userSearch.status === 200) {
        Swal.fire("Se envio Email de Reestablecimiento");
        setModalUser(false);
      } else {
        Swal.fire("Email No Registrado");
        setModalUser(false);
      }
    }
  }
  return (
    <>
      <Button variant onClick={handleShow} className="buttonModal">
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
                //value={email}
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
            <Button variant="primary" onClick={(handleClose, sendEmail)}>
              Buscar Email
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalRestPassword;