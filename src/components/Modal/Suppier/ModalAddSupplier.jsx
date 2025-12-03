import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import listCategories from "../../../functions/categoriesSupplies.json"
import { actionListSupplier,actionAddSupplier } from "../../../reducer/actions/supplier/actionsSupplier"


const ModalAddSupplier = ({ openModal, setOpenModal }) => {
    const companySelectedMenu = useSelector((state) => state.company.companySelected);

    // const [stateListSupplier, setListSupplier] = useState([])

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);


    const handleClose = () => {
        setOpenModal(!openModal);
        setStateInput({
            nameSupplier: "",
            address: "",
            cuit: "",
            phone: ""
        });
    };
    const [stateInput, setStateInput] = useState({
        nameSupplier: "",
        address: "",
        cuit: "",
        phone: ""
    });


    const handleSubmit = () => {
        if (stateInput.nameSupplier.trim() === "" || stateInput.address.trim() === "" || stateInput.cuit.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Faltan Datos por Completar",
            });
        }
        else {
            const supplierData = {
                nameSupplier: stateInput.nameSupplier,
                address: stateInput.address,
                cuit: stateInput.cuit,
                phone: stateInput.phone,
                Company:companySelectedMenu._id
            };
            dispatch(actionAddSupplier(supplierData));
            MySwal.fire({
                title: "¡Proveedor agregado correctamente!",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(actionListSupplier(companySelectedMenu._id));
                    setOpenModal(!openModal);

                    setStateInput({
                        nameSupplier: "",
                        address: "",
                        cuit: "",
                        phone: ""
                    });
                }
            });
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    return (
        <>

            <div>
                <Modal show={openModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="instrument-serif-regular">
                            Agregar Proveedor
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-1 pb-1">
                        <Form>

                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    Nombre Proveedor
                                </Form.Label>

                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="text"
                                    name="nameSupplier"
                                    autoFocus
                                    maxLength={50}
                                    value={stateInput.nameSupplier}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>


                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    Domicilio
                                </Form.Label>

                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="text"
                                    name="address"
                                    autoFocus
                                    maxLength={50}
                                    value={stateInput.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                   

                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    Telefono
                                </Form.Label>

                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="text"
                                    name="phone"
                                    autoFocus
                                    maxLength={50}
                                    value={stateInput.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    CUIT
                                </Form.Label>

                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="text"
                                    name="cuit"
                                    autoFocus
                                    maxLength={50}
                                    value={stateInput.cuit}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                        </Form>
                        <div className="text-danger msgAlertInput mt-2  instrument-serif-regular">
                            (*) Valores Obligatorios
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="mt-0 pt-1 pb-1 instrument-serif-regular">

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!stateInput.nameSupplier || !stateInput.address}
                        >
                            Agregar Proveedor
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default ModalAddSupplier;
