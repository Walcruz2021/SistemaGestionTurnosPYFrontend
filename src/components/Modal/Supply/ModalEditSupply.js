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
import { FormGroup } from "react-bootstrap";
import listCategories from "../../../functions/categoriesSupplies.json"
import { getListSupplies, actionEditSupply } from "../../../reducer/actions/supply/actionsSupply"

const ModalEditSupply = ({
    stateOpenModal,
    setStateOpenModal,
    stateDataSupply,
    setDataSupply
}) => {


    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier)

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const [show, setShow] = useState(false);

    const handleClose = () => setStateOpenModal(!stateOpenModal);

    const [stateInput, setStateInput] = useState({

    });



    useEffect(() => {
        if (stateDataSupply) {
            setStateInput({
                idSupply: stateDataSupply._id,
                nameSupply: stateDataSupply.nameSupply,
                categorySupply: stateDataSupply.categorySupply,
                idSupplier: stateDataSupply.idSupplier,
                nameSupplier: stateDataSupply.nameSupplier
            })
        }
    }, [stateDataSupply])
    var selectSupplierArray = []

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (Array.isArray(listSupplier)) {
        listSupplier.map((supplier, i) => {

            var option = {
                value: supplier._id,
                // value2: supplier.nameSupplier,
                label: supplier.nameSupplier,
            };
            selectSupplierArray.push(option);
        });
    }



    var selectCategoryArray = []

    if (Array.isArray(listCategories)) {
        listCategories.map((category, i) => {
            var option = {
                value: category.name,
                label: category.name,
            };
            selectCategoryArray.push(option);
        });
    }

    function handleChangeCategory(e) {
        const seleccionCat = e.value;

        setStateInput({ ...stateInput, categorySupply: seleccionCat })
    }

    function handleChangeSupplier(e) {
        const idSupplier = e.value;
        const nameSupplier=e.label

        setStateInput({ ...stateInput, idSupplier: idSupplier, nameSupplier:nameSupplier })
    }

    const handleSubmit = () => {
        if (stateInput.nameSupply.trim() === "" || stateInput.categorySupply.trim() === "" || stateInput.idSupplier.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Faltan Datos por Completar",
            });
        }
        else {
            const supplyData = {
                nameSupply: stateInput.nameSupply,
                categorySupply: stateInput.categorySupply,
                idSupplier: stateInput.idSupplier,
                nameSupplier: stateInput.nameSupplier,
                Company: companySelectedMenu._id
            };
            dispatch(actionEditSupply(supplyData, stateInput.idSupply));
            MySwal.fire({
                title: "¡Insumo editado correctamente!",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(getListSupplies(companySelectedMenu._id));
                    setStateOpenModal(!stateOpenModal);

                    setStateInput({
                        nameSupplier: "",
                        categorySupply: "",
                        idSupplier: "",
                    });
                }
            });
        }
    };


    return (
        <>
            <div>
                <Modal show={stateOpenModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="instrument-serif-regular">
                            Editar Insumo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-1 pb-1">
                        <Form>

                            <>

                                <>

                                    <Select
                                        className="classSelect instrument-serif-regular"
                                        placeholder={stateInput.nameSupplier ? stateInput.nameSupplier : "Seleccione Proveedor"}
                                        onChange={(e) => {
                                            handleChangeSupplier(e);
                                        }}
                                        options={selectSupplierArray}
                                    />

                                    <Select
                                        className="classSelect instrument-serif-regular"
                                        placeholder={stateInput.categorySupply ? stateInput.categorySupply : "Seleccione Categoria"}
                                        onChange={(e) => {
                                            handleChangeCategory(e);
                                        }}
                                        options={selectCategoryArray}
                                    />
                                </>

                                <Form.Group
                                    className="mb-1"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="instrument-serif-regular">
                                        Nombre Insumo
                                    </Form.Label>

                                    <Form.Control
                                        className="instrument-serif-regular"
                                        type="text"
                                        name="nameSupply"
                                        autoFocus
                                        maxLength={50}
                                        value={stateInput ? stateInput.nameSupply : ""}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer className="mt-0 pt-1 pb-1 instrument-serif-regular">

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!stateInput.nameSupply || !stateInput.categorySupply || !stateInput.nameSupplier}
                        >
                            Editar Insumo
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default ModalEditSupply;
