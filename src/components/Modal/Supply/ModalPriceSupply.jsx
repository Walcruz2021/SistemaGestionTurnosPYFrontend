import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { FormGroup } from "react-bootstrap";
import listCategories from "../../../functions/categoriesSupplies.json"
import { actionEditCompanySupply } from "../../../reducer/actions/companySupply/actionCompanySupply"
import {getListSupplies} from "../../../reducer/actions/supply/actionsSupply"
import { getBrands } from "../../../reducer/actions/actionBrand"

const ModalPriceSupply = ({
    modalOpenEditSupply,
    setModalOpenEditSupply,
    dataSupply,
    setSupplySelected
}) => {


    const companySelectedMenu = useSelector((state) => state.company.companySelected);


    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const [show, setShow] = useState(false);

    const handleClose = () => setModalOpenEditSupply(!modalOpenEditSupply);
    const [stateSeletedBrand, setStateSeletedBrand] = useState()
    const [stateInput, setStateInput] = useState({
        nameSupply: "",
        categorySupply: "",
        // idSupplier: "",
        idBrand: "",
        nameBrand: "",
        typeUnidMed: "",
        valueUnidMed: "",
        priceSale: ""
    });


    useEffect(() => {
        if (dataSupply) {
            setStateInput({
                nameSupply: dataSupply.global.nameSupply,
                priceSale: dataSupply.priceSale
            })
        }
    }, [dataSupply])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {


        const supplyData = {
            idGlobalSupply: dataSupply.global._id,
            priceSale: stateInput.priceSale,

        };
        const dispatchEditPrice = await dispatch(actionEditCompanySupply(supplyData, companySelectedMenu._id));

        if (dispatchEditPrice && dispatchEditPrice.status === 200) {

            MySwal.fire({
                title: "¡Precio Modificado correctamente!",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",

            })
            dispatch(getListSupplies(companySelectedMenu._id));
            setModalOpenEditSupply(!modalOpenEditSupply);

            setStateInput({
                nameSupplier: "",
                categorySupply: "",
                idSupplier: "",
            });
 
            setSupplySelected(null);
        } else {
            MySwal.fire({
                title: "¡Error al modificar el precio!",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
            })
        };

    }
    return (
        <>
            <div>
                <Modal show={modalOpenEditSupply} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="instrument-serif-regular">
                            Editar Insumo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-1 pb-1">
                        <Form>

                            <>


                                <Form.Group
                                    className="mb-1 mt-1"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="instrument-serif-regular mt-1">
                                        Nombre Insumo
                                    </Form.Label>

                                    <Form.Control
                                        className="instrument-serif-regular"
                                        type="text"
                                        name="nameSupply"
                                        autoFocus
                                        maxLength={50}
                                        value={stateInput ? stateInput.nameSupply : ""}
                                  
                                        required
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-1 mt-1"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="instrument-serif-regular">
                                        Precio de Venta
                                    </Form.Label>

                                    <Form.Control
                                        className="instrument-serif-regular"
                                        type="number"
                                        name="priceSale"
                                        autoFocus
                                        maxLength={50}
                                        min="0"
                                        value={stateInput ? stateInput.priceSale : ""}
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
                            disabled={ !stateInput.priceSale}
                        >
                            Editar Insumo
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default ModalPriceSupply;
