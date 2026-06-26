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
import {listCategories} from "../../../reducer/actions/category/actionCategory"
import { actionEditCompanySupplyVariant } from "../../../reducer/actions/companySupplyVariant/actionsCompanySupplyVariant";
import { getListSupplies } from "../../../reducer/actions/supply/actionsSupply"


const ModalPriceSupply = ({
    modalOpenEditSupply,
    setModalOpenEditSupply,
    stateDetailsVariant,
    setStateDetailsVariant,
    stateIdCompanySupply,
    setSupplySelected
}) => {


    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listCategoriesState = useSelector((state) => state.category.listCategories);
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const [show, setShow] = useState(false);
    const [stateInput, setStateInput] = useState({
        nameVariant: "",
        priceSale: "",
    });
    const handleClose = () => setModalOpenEditSupply(!modalOpenEditSupply);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (stateDetailsVariant) {
            setStateInput({
                idVariant: stateDetailsVariant.idSupplyVariant,
                nameVariant: stateDetailsVariant.variant?.name || "",
                priceSale: stateDetailsVariant?.priceSale || ""
            });
        }
    }, [stateDetailsVariant]);

    const handleSubmit = async () => {


        const variantData = {
            idVariant: stateInput.idVariant,
            nameVariant: stateInput.nameVariant,
            priceSale: stateInput.priceSale,
            idCompanySupply: stateIdCompanySupply
        };

        try {
            const dispatchEditPrice = await dispatch(actionEditCompanySupplyVariant(variantData));

            if (dispatchEditPrice && dispatchEditPrice.status === 200) {

                MySwal.fire({
                    title: "Variante Modificada correctamente!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(21, 151, 67)",

                })
                setSupplySelected(null)
                dispatch(getListSupplies(companySelectedMenu._id));
                setModalOpenEditSupply(!modalOpenEditSupply);

                setStateInput({
                    nameVariant: "",
                    priceSale: ""
                });


            } else {
   
                MySwal.fire({
                    title: "¡Error al modificar el precio!",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(21, 151, 67)",
                })
            };

        } catch (error) {
            console.log(error)
        }

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
                                {/* <Form.Group
                                    className="mb-1 mt-1"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label className="instrument-serif-regular mt-1">
                                        Nombre Variante
                                    </Form.Label>

                                    <Form.Control
                                        className="instrument-serif-regular"
                                        type="text"
                                        name="nameVariant"
                                        autoFocus
                                        maxLength={50}
                                        value={stateInput.nameVariant}
                                        required
                                    />
                                </Form.Group> */}

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
                                        value={stateInput.priceSale}
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
                            disabled={!stateDetailsVariant?.priceSale || stateDetailsVariant?.priceSale < 0}
                        >
                            Editar Variante
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default ModalPriceSupply;
