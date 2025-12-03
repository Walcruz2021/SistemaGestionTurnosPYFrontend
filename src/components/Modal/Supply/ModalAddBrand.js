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
import { actionListSupplier } from "../../../reducer/actions/supplier/actionsSupplier"
import { actionAddSupply, getListSupplies } from "../../../reducer/actions/supply/actionsSupply"


const ModalAddSupply = ({ openModal, setOpenModal }) => {
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier)
    // const [stateListSupplier, setListSupplier] = useState([])

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListSupplier(companySelectedMenu._id))
        }
    }, [])

    // useEffect(() => {
    //     if (listSupplier.length) {
    //         setListSupplier(listSupplier)
    //     }
    // }, listSupplier)

    const handleClose = () => {
        setOpenModal(!openModal);
        setStateInput({
            nameBrand: ""
        });
    };
    const [stateInput, setStateInput] = useState({
        nameBrand: ""
    });


    const handleSubmit = () => {
        if (stateInput.nameBrand.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Faltan Datos por Completar",
            });
        }
        else {
            const supplyData = {
                nameBrand: stateInput.nameBrand
            };
            dispatch(actionAddBrand(supplyData));
            MySwal.fire({
                title: "Marca creada correctamente!",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(getListSupplies(companySelectedMenu._id));
                    setOpenModal(!openModal);

                    setStateInput({
                        nameBrand: "",

                    });
                }
            });
        }
    };

    var selectCategoryArray = []


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
                            Agregar Insumo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-1 pb-1">
                        <Form>


                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    Nombre Marca
                                </Form.Label>

                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="text"
                                    name="nameBrand"
                                    autoFocus
                                    maxLength={50}
                                    value={stateInput.nameBrand}
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
                            disabled={!stateInput.nameSupply || !stateInput.categorySupply}
                        >
                            Agregar Insumo
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default ModalAddSupply;
