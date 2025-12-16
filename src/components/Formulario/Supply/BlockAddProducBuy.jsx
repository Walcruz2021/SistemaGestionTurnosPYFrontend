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
    actionEditSupply
} from "../../../reducer/actions/supply/actionsSupply";
import { getBrands } from "../../../reducer/actions/actionBrand";

const BlockAddProducBuy = ({ stateInput, setStateInput, index }) => {

    const dispatch = useDispatch();
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplies = useSelector((state) => state.supply.listSupplies);
    console.log(listSupplies)
    const listBrands = useSelector((state) => state.gralRed.listBrands);
    const [stateMargen, setmargen] = useState(50)

    const [suppliesOptions, setSuppliesOptions] = useState([]);

    const [brandOptions, setBrandOptions] = useState([]);

    // Acceso directo al producto actual
    const currentProduct = stateInput.detailsSupply[index];
console.log(currentProduct)
    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(getListSupplies(companySelectedMenu._id));
            dispatch(getBrands());
        }
    }, [companySelectedMenu]);

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
        if (currentProduct?.nameBrand && listSupplies) {

            const filtered = listSupplies
                .filter((prod) => prod.global.nameBrand === currentProduct.nameBrand)
                .map((prod) => ({
                    value: prod.global._id,
                    label: prod.global.nameSupply
                }));
       
            setSuppliesOptions(filtered);
        }
    }, [currentProduct?.nameBrand, listSupplies]);

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
        console.log(value)
        handleChangeField(
            name,
            type === "number" ? (value === "" ? "" : Number(value)) : value
        );
    };

    const handleChangeMargen = (e) => {
        const { value } = e.target;
        setmargen(value);
    }

    return (
        <Row className="g-2 mb-3">

            <Col xs={6}>
                <Form.Group>
                    <Form.Label>Marca</Form.Label>
                    <Select
                        className="classSelect instrument-serif-regular"
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
                        className="classSelect instrument-serif-regular"
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

            <Col xs={6}>
                <Form.Group>
                    <Form.Label>Fecha Vencimiento</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        value={currentProduct?.dueDate || ""}
                        onChange={handleChangeInput}
                        required
                    />
                </Form.Group>
            </Col>

            <Col xs={6}>
                <Form.Group>
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={currentProduct?.quantity || ""}
                        onChange={handleChangeInput}
                        required
                    />
                </Form.Group>
            </Col>

            <Col xs={6}>
                <Form.Group>
                    <Form.Label>Costo Unidad</Form.Label>
                    <Form.Control
                        type="number"
                        name="unitCost"
                        value={currentProduct?.unitCost || ""}
                        onChange={handleChangeInput}
                        required
                    />
                </Form.Group>
            </Col>

            <Col xs={6}>
                <Form.Group>
                    <Form.Label>% Margen Ganancia</Form.Label>
                    <Form.Control
                        type="number"
                        name="margen"
                        value={stateMargen}
                        onChange={handleChangeMargen}
                        required
                    />
                </Form.Group>
            </Col>

            <Col xs={6}>
                <Form.Group>
                    <Form.Label>Precio Venta</Form.Label>
                    <Form.Control
                        type="number"
                        name="priceSale"
                        value={currentProduct?.unitCost * (1 + stateMargen / 100) || ""}
                        onChange={handleChangeInput}
                        required
                    />
                </Form.Group>
            </Col>

            <Col xs={12}>
                <Form.Group>
                    <Form.Label>Observaciones</Form.Label>
                    <Form.Control
                        type="text"
                        name="details"
                        value={currentProduct?.details || ""}
                        onChange={handleChangeInput}
                    />
                </Form.Group>
            </Col>

        </Row>
    );
};

export default BlockAddProducBuy;
