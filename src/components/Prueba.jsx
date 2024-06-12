import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import foto from "../icons/addClient.png";

export default function Prueba() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = [
    { name: "Enero", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Febrero", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Marzo", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Abril", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Mayo", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Junio", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Julio", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Abrir Modal
      </Button>

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={foto} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
