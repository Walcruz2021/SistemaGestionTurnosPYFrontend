import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import listCategories from "../../../functions/categoriesSupplies.json"
import { actionListSupplier } from "../../../reducer/actions/supplier/actionsSupplier"
import { actionAddSupply, getListSupplies } from "../../../reducer/actions/supply/actionsSupply"
import { getBrands } from "../../../reducer/actions/actionBrand"


const ModalAddSaleSupply = ({ openModal, setOpenModal, dataModalSale, setStateDetailsSupplies }) => {

    const [stateInputSupply, setStateInputSupply] = useState({
        quantitySale: "",
        discount: 0,
        surcharge: 0
    });


    useEffect(() => {
        if (dataModalSale) {

            setStateInputSupply(prev => ({
                ...prev,
                quantitySale: dataModalSale.quantitySale,
                discount: dataModalSale.discount||0,
                surcharge: dataModalSale.surcharge||0,

            }));
        }
    }, [dataModalSale]);

    const handleClose = () => {
        setOpenModal(!openModal);
        setStateInput({
            nameSupply: "",
            categorySupply: "",
            // idSupplier: "",
            idBrand: "",
            nameBrand: "",
            typeUnidMed: "",
            valueUnidMed: ""
        });
    };

    const deleteSupply = () => {
        setStateDetailsSupplies(prev =>
            prev.filter(item => item._id !== dataModalSale._id)
        );

        setOpenModal(false);
    }

    const [stateInput, setStateInput] = useState({
        nameSupply: "",
        categorySupply: "",
        // idSupplier: "",
        idBrand: "",
        nameBrand: "",
        typeUnidMed: "",
        valueUnidMed: ""
    });



    const handleUpdateSupply = () => {
        setStateDetailsSupplies(prev =>
            prev.map(item =>
                item._id === dataModalSale._id
                    ? { ...item, ...stateInputSupply }
                    : item
            )
        );

        setOpenModal(false);
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
                    <Modal.Body className="pt-1 pb-1 ">
                        <Form>

                            <Form.Group
                                className="mb-1 instrument-serif-regular"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    Cantidad
                                </Form.Label>



                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="number"
                                    name="quantitySale"
                                    autoFocus
                                    min={1}
                                    max={dataModalSale&&dataModalSale.totalStock}
                                    value={stateInputSupply.quantitySale}
                                    onChange={(e) => setStateInputSupply(prev => ({ ...prev, quantitySale: e.target.value }))}
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    Descuento
                                </Form.Label>



                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="number"
                                    name="discount"
                                    autoFocus
                                    min={0}
                                    value={stateInputSupply.discount}
                                    onChange={(e) => setStateInputSupply(prev => ({ ...prev, discount: e.target.value }))}
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    $ Adicional
                                </Form.Label>



                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="number"
                                    name="surcharge"
                                    autoFocus
                                    min={0}
                                    value={stateInputSupply.surcharge}
                                    onChange={(e) => setStateInputSupply(prev => ({ ...prev, surcharge: e.target.value }))}
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular">
                                    Nota Insumo Venta
                                </Form.Label>


                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="text"
                                    rows={3}
                                    as="textarea"
                                    name="noteSaleSupply"
                                    autoFocus
                                    min={1}
                                    maxLength={50}
                                    value={stateInputSupply.noteSaleSupply}
                                    onChange={(e) => setStateInputSupply(prev => ({ ...prev, noteSaleSupply: e.target.value }))}
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
                            onClick={handleUpdateSupply}

                        >
                            Modificar Detalle
                        </Button>

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={deleteSupply}
                        >
                            Eliminar de la Lista
                        </Button>

                    </Modal.Footer>



                </Modal>
            </div>
        </>
    );
};

export default ModalAddSaleSupply;
