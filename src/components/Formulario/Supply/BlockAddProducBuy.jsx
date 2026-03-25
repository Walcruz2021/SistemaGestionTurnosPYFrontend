import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { actionListSupplier } from "../../../reducer/actions/supplier/actionsSupplier";
import {
    getListSupplies,
    actionAddBuySupply,
    actionEditSupply,
    getListSuppliesGral
} from "../../../reducer/actions/supply/actionsSupply";
import { getBrands } from "../../../reducer/actions/actionBrand";

const BlockAddProducBuy = ({ stateInput, setStateInput, index, validationBuySupply }) => {

    const dispatch = useDispatch();
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplies = useSelector((state) => state.supply.listSupplies);
    const listSuppliesGral = useSelector((state) => state.supply.listSuppliesGral)
    const listBrands = useSelector((state) => state.gralRed.listBrands);
    const [stateMargen, setmargen] = useState(50)

    const [suppliesOptions, setSuppliesOptions] = useState([]);

    const [brandOptions, setBrandOptions] = useState([]);

    // Acceso directo al producto actual
    const currentProduct = stateInput.detailsSupply[index];

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(getListSupplies(companySelectedMenu._id));
            dispatch(getBrands());
        }
    }, [companySelectedMenu]);

    useEffect(() => {
        dispatch(getListSuppliesGral())
    }, [])


    useEffect(() => {
        if (Array.isArray(listBrands)) {
            const formatted = listBrands.map((brand) => ({
                value: brand._id,
                label: brand.nameBrand
            }));
            setBrandOptions(formatted);
        }
    }, [listBrands]);

    useEffect(() => {
        if (currentProduct?.nameBrand && listSuppliesGral) {

            const filtered = listSuppliesGral
                .filter((prod) => prod.nameBrand === currentProduct.nameBrand)
                .map((prod) => ({
                    value: prod._id,
                    label: prod.nameSupply
                }));

            setSuppliesOptions(filtered);
        }
    }, [currentProduct?.nameBrand, listSuppliesGral]);

    useEffect(() => {
        if (currentProduct?.unitCost != null) {
            const calculated = currentProduct.unitCost * (1 + stateMargen / 100);

            setStateInput(prev => {
                const updated = [...prev.detailsSupply];
                updated[index] = {
                    ...updated[index],
                    priceSale: calculated
                };
                return { ...prev, detailsSupply: updated };
            });
        }
    }, [currentProduct?.unitCost, stateMargen]);

    // Cambiar algún valor del producto
    const handleChangeField = (name, value) => {
        if (name === "quantity" || name === "unitCost") {
            value = value.replace(/\D/g, "").slice(0, 10);
        }
        setStateInput((prev) => {
            const updated = [...prev.detailsSupply];
            updated[index] = { ...updated[index], [name]: value };
            return { ...prev, detailsSupply: updated };
        });
    };

    const handleChangeSelectBrand = (option) => {
        handleChangeField("nameBrand", option.label);
        handleChangeField("idBrand", option.value);
    };

    const handleChangeSelectSupply = (option) => {
        handleChangeField("nameSupply", option.label);
        handleChangeField("idSupply", option.value);
    };

    const handleChangeInput = (e) => {
        const { name, value, type } = e.target;

        handleChangeField(
            name,
            type === "number" ? (value === "" ? "" : Number(value)) : value
        );
    };

    const handleChangeMargen = (e) => {
        let { value } = e.target;
        value = value.replace(/\D/g, "").slice(0, 3);
        setmargen(value);
    }


const customStyles = (hasError) => ({
    control: (provided) => ({
        ...provided,
        borderColor: hasError ? "red" : provided.borderColor,
        boxShadow: "none",
        "&:hover": {
            borderColor: hasError ? "red" : provided.borderColor
        }
    })
});


    return (
        <Row className="g-2 mb-3">

            <Col xs={6}>
                <Form.Group>
                    <Form.Label>Marca</Form.Label>
                    <Select
                        styles={customStyles(!currentProduct?.nameBrand)}
                        className="instrument-serif-regular"
                        placeholder="Marca"
                        onChange={handleChangeSelectBrand}
                        options={brandOptions}
                        value={
                            currentProduct?.nameBrand
                                ? brandOptions.find((b) => b.label === currentProduct.nameBrand)
                                : null
                        }
                    />
                </Form.Group>
            </Col>

            <Col xs={6}>
                <Form.Group>
                    <Form.Label>Producto</Form.Label>
                    <Select
                        styles={customStyles(!currentProduct?.nameSupply)}
                        className="instrument-serif-regular"
                        placeholder="Producto"
                        options={suppliesOptions}
                        onChange={handleChangeSelectSupply}
                        value={
                            currentProduct?.nameSupply
                                ? suppliesOptions.find((p) => p.label === currentProduct.nameSupply)
                                : null
                        }
                    />
                </Form.Group>
            </Col>



            <Col xs={4}>
                <Form.Group>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                        type="text"
                        name="quantity"
                        className={`mt-2 instrument-serif-regular ${!currentProduct.quantity ? "border-danger" : ""}`}
                        value={currentProduct?.quantity || ""}
                        onChange={handleChangeInput}
                        required
                        maxLength={4}
                    />
                </Form.Group>
            </Col>

            <Col xs={4}>
                <Form.Group>
                    <Form.Label>Costo Unidad</Form.Label>
                    <Form.Control
                        type="text"
                        name="unitCost"
                        className={`mt-2 instrument-serif-regular ${!currentProduct.unitCost ? "border-danger" : ""}`}
                        value={currentProduct?.unitCost || ""}
                        onChange={handleChangeInput}
                        required
                    />
                </Form.Group>
            </Col>

            <Col xs={4}>
                <Form.Group>
                    <Form.Label>% Ganancia</Form.Label>
                    <Form.Control
                        type="text"
                        className={`mt-2 instrument-serif-regular ${!stateMargen ? "border-danger" : ""}`}
                        name="margen"
                        value={stateMargen}
                        onChange={handleChangeMargen}
                        maxLength={3}
                        required
                    />
                </Form.Group>
            </Col>

            <Col xs={4}>
                <Form.Group>
                    <Form.Label>Precio Venta</Form.Label>
                    <Form.Control
                        type="number"
                        className="mt-2 instrument-serif-regular"
                        name="priceSale"
                        value={currentProduct?.unitCost * (1 + stateMargen / 100) || ""}
                        onChange={handleChangeInput}
                        required
                    />
                </Form.Group>
            </Col>

            <Col xs={4}>
                <Form.Group>
                    <Form.Label>Observaciones</Form.Label>
                    <Form.Control
                        className="mt-2 instrument-serif-regular"
                        type="text"
                        as="textarea"
                        name="details"
                        value={currentProduct?.details || ""}
                        onChange={handleChangeInput}
                        maxLength={70}
                    />
                </Form.Group>
            </Col>

            <Col xs={4}>
                <Form.Group>
                    <Form.Label>Vencimiento</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        className={`mt-2 instrument-serif-regular ${!currentProduct.dueDate ? "border-danger" : ""}`}

                        value={currentProduct?.dueDate || ""}
                        onChange={handleChangeInput}
                        required
                    />
                </Form.Group>
            </Col>

        </Row>
    );
};

export default BlockAddProducBuy;
