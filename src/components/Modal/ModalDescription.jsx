import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import clientInfo from "../../icons/clientInfo.png";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlinePhonelinkLock } from "react-icons/md";
import { PiNotepadLight } from "react-icons/pi";
import { RiStickyNoteAddFill } from "react-icons/ri";

function ModalDescription({
  state,
  setStateModal,
  nameClient,
  phone,
  notesTurn,
}) {
  const closeModal = () => {
    setStateModal(!state);
  };

  return (
    <>
      <Card className="w-100">
        <div className="d-flex justify-content-center p-2">
          <Card.Img
            className="p-2"
            style={{ width: "8rem", justifyContent: "center" }}
            variant="top"
            src={clientInfo}
          />
        </div>
        <Card.Body className="bg-success p-2 text-dark bg-opacity-10">
          <Card.Title style={{ color: "#4f4f4f" }} className="text-center fs-5">
            Informacion Cliente
          </Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item style={{ color: "#424242" }}>
            <IoPersonAdd style={{ marginRight: "10px", fontSize: "24px" }} />
            {nameClient}
          </ListGroup.Item>
          <ListGroup.Item style={{ color: "#424242" }}>
            <MdOutlinePhonelinkLock
              style={{ marginRight: "10px", fontSize: "24px" }}
            />
            {phone}
          </ListGroup.Item>

          <Card.Text style={{ color: "#dbdbdb" }} className="m-2 px-4">
            <RiStickyNoteAddFill
              style={{ marginRight: "10px", fontSize: "24px"}}
            />
            {notesTurn}
          </Card.Text>
          {/* <ListGroup.Item></ListGroup.Item> */}
        </ListGroup>
        <Card.Body>
          <div className="d-flex justify-content-center p-1">
            <button
              onClick={closeModal}
              type="button"
              className="btn btn-outline-secondary"
            >
              Cerrar
            </button>
          </div>
          {/* <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>
    </>
  );
}

export default ModalDescription;
