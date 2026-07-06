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
import { getListSuppliesVariant } from "../../../reducer/actions/supply/actionsSupplyVariant"

const BlockAddProducBuy = ({ stateInput, setStateInput, index, validationBuySupply }) => {

    const dispatch = useDispatch();
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplies = useSelector((state) => state.supply.listSupplies);
    const listSuppliesGral = useSelector((state) => state.supply.listSuppliesGral)

    const listBrands = useSelector((state) => state.gralRed.listBrands);
    const [stateMargen, setmargen] = useState(50)
    const [suppliesOptions, setSuppliesOptions] = useState([]);

    const [variantOptions, setVariantOptions] = useState([]);

    const [brandOptions, setBrandOptions] = useState([]);
    //list supplyVariant
    const listSuppliesVariant = useSelector((state) => state.supplyVariant.listSuppliesVariant.listSupplyVariants);


    // marca que se elige en el select MARCA
    const currentProduct = stateInput.detailsSupply[index];

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(getListSupplies(companySelectedMenu._id));
            dispatch(getBrands(companySelectedMenu?.catgory));
        }
    }, [companySelectedMenu]);

    useEffect(() => {
        dispatch(getListSuppliesGral())
        dispatch(getListSuppliesVariant());
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
        if (currentProduct?.idBrand && listSuppliesGral) {

            const filtered = listSuppliesGral
                .filter((prod) => prod?.idBrand === currentProduct?.idBrand)
                .map((prod) => ({
                    value: prod._id,
                    label: prod.nameSupply
                }));

            setSuppliesOptions(filtered);
        }
    }, [currentProduct?.idBrand, listSuppliesGral]);

    useEffect(() => {
        if (currentProduct?.idSupply && listSuppliesVariant) {

            const filteredVariants = listSuppliesVariant
                .filter(
                    (variant) => variant?.idSupply === currentProduct?.idSupply
                )
                .map((variant) => ({
                    value: variant._id,
                    label: variant.name,
                    // typeUnidMed: variant.typeUnidMed,
                    // valueUnitMed: variant.valueUnitMed,
                    // imgStore: variant.imgStore
                }));

            setVariantOptions(filteredVariants);
        }
    }, [currentProduct?.idSupply, listSuppliesVariant]);

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

    const handleChangeSelectVariant = (option) => {
        handleChangeField("nameVariant", option.label);
        handleChangeField("idVariant", option.value);
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
                    <Form.Label>* Marca</Form.Label>
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
                    <Form.Label>* Producto</Form.Label>
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


            <Col xs={6}>
                <Form.Group>
                    <Form.Label>* Variante de producto</Form.Label>

                    <Select
                        styles={customStyles(!currentProduct?.nameSupply)}
                        className="instrument-serif-regular"
                        placeholder="Variante"
                        options={variantOptions}

                        onChange={handleChangeSelectVariant}

                        value={
                            currentProduct?.nameVariant
                                ? variantOptions.find(
                                    (v) => v.label === currentProduct.nameVariant
                                )
                                : null
                        }
                    />
                </Form.Group>
            </Col>


            <Col xs={4}>
                <Form.Group>
                    <Form.Label>* Cantidad</Form.Label>
                    <Form.Control
                        type="text"
                        name="quantity"
                        className={`mt-2 instrument-serif-regular ${!currentProduct?.quantity ? "border-danger" : ""}`}
                        value={currentProduct?.quantity || ""}
                        onChange={handleChangeInput}
                        required
                        maxLength={4}
                    />
                </Form.Group>
            </Col>

            <Col xs={4}>
                <Form.Group>
                    <Form.Label>* Costo Unidad</Form.Label>
                    <Form.Control
                        type="text"
                        name="unitCost"
                        className={`mt-2 instrument-serif-regular ${!currentProduct?.unitCost ? "border-danger" : ""}`}
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
                        type="text"
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
                        className={`mt-2 instrument-serif-regular`}

                        value={currentProduct?.dueDate || ""}
                        onChange={handleChangeInput}
                    />
                </Form.Group>
            </Col>

        </Row>
    );
};

export default BlockAddProducBuy;
