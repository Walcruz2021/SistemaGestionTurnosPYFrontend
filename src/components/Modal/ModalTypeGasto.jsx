import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import clientInfo from "../../icons/clientInfo.png";
import { IoPersonAdd } from "react-icons/io5";
import { MdOutlinePhonelinkLock } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { RiBankCardLine } from "react-icons/ri";
import { BsBank } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import convertNum from "../../functions/convertNum";
function ModalTypeGasto({
  state,
  setStateModal,
  descripcion,
  efectivo,
  transferencia,
  tarjeta
}) {
  const closeModal = () => {
    setStateModal(!state);
  };

  return (
    <div className="instrument-serif-regular  ">
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
            Detalle de Gasto
          </Card.Title>
        </Card.Body>
        <ListGroup>
        <ListGroup.Item style={{ color: "#424242" }}>
            <FaMoneyBillTransfer
              style={{ marginRight: "10px", fontSize: "24px" }}
            />
            {convertNum(efectivo)}
          </ListGroup.Item>
          <ListGroup.Item style={{ color: "#424242" }}>
            <BsBank
              style={{ marginRight: "10px", fontSize: "24px" }}
            />
            {convertNum(transferencia)}
          </ListGroup.Item>
          <ListGroup.Item style={{ color: "#424242" }}>
            <RiBankCardLine
              style={{ marginRight: "10px", fontSize: "24px" }}
            />
            {convertNum(tarjeta)}
          </ListGroup.Item>
          <Card.Text style={{ color: "#424242" }} className="m-2 px-4">
            <RiStickyNoteAddFill
              style={{ marginRight: "10px", fontSize: "24px"}}
            />
              {descripcion}
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
    </div>
  );
}

export default ModalTypeGasto;
