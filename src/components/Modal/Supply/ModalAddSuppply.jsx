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


const ModalAddSupply = ({ openModal, setOpenModal }) => {
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier)
    const listBrands = useSelector((state) => state.gralRed.listBrands)
    const [stateSeletedBrand, setStateSeletedBrand] = useState()

    // const [stateListSupplier, setListSupplier] = useState([])

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListSupplier(companySelectedMenu._id))
            dispatch(getBrands())
        }
    }, [])

    useEffect(() => {
        if (Array.isArray(listBrands) && listBrands.length > 0) {
            const formattedBrands = listBrands.map((brand) => ({
                value: brand._id,
                label: brand.nameBrand,
            }));

            setStateSeletedBrand(formattedBrands);
        }
    }, [listBrands]);

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
    const [stateInput, setStateInput] = useState({
        nameSupply: "",
        categorySupply: "",
        // idSupplier: "",
        idBrand: "",
        nameBrand: "",
        typeUnidMed: "",
        valueUnidMed: ""
    });


    const handleSubmit = () => {
        if (stateInput.nameSupply.trim() === "" || stateInput.categorySupply.trim() === "") {
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
                // idSupplier: stateInput.idSupplier,
                idBrand: stateInput.idBrand,
                nameBrand: stateInput.nameBrand,
                Company: companySelectedMenu._id,
                typeUnidMed: stateInput.typeUnidMed,
                valueUnidMed: stateInput.valueUnidMed
            };
            dispatch(actionAddSupply(supplyData));

            MySwal.fire({
                title: "¡Insumo creado correctamente!",
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(getListSupplies(companySelectedMenu._id));
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
                }
            });
        }
    };


    /////////////CATEGORY////////////////


    var selectCategoryArray = []


    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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


    //momentaneamente no se lo utilizara ya que relacion de insumo y porveedor es de muchos a muchos

    // var selectSupplierArray = []


    // if (Array.isArray(listSupplier)) {
    //     listSupplier.map((supplier, i) => {

    //         var option = {
    //             value: supplier._id,
    //             label: supplier.nameSupplier,
    //         };
    //         selectSupplierArray.push(option);
    //     });
    // }

    // function handleChangeSupplier(e) {
    //     const seleccionSup = e.value;

    //     setStateInput({ ...stateInput, idSupplier: seleccionSup })
    ////////////////SUPPLIER//////////////////
    // }

    //SELECT UNIDAD
    const TypeUnidMed = ["Litro", "Peso", "Talle Internacional", "Talle Numerico"]
        .map((f) => ({ value: f, label: f }));

    const handleChangeTypeUnidMed = (e) => {
        setStateInput({ ...stateInput, typeUnidMed: e.value });
    };

    //TALLES INT
    const talleInt = ["S", "M", "L", "X", "XL", "XXL"]
        .map((t) => ({ value: t, label: t }));

    const handleChangeTalleInt = (e) => {
        setStateInput({ ...stateInput, talleInt: e.value });
    };

    //TALLES NUMERICOS
    const talleNum = ["34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"]
        .map((t) => ({ value: t, label: t }));

    const handleChangeTalleNum = (e) => {
        setStateInput({ ...stateInput, valueUnidMed: e.value });
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

                            <>

                                <Select
                                    className="classSelect instrument-serif-regular"
                                    placeholder="Categoria"
                                    onChange={(e) => {
                                        handleChangeCategory(e);
                                    }}
                                    options={selectCategoryArray}
                                />

                                <Select
                                    className="classSelect instrument-serif-regular"
                                    placeholder="Marca"
                                    onChange={(e) => setStateInput({ ...stateInput, nameBrand: e.label, idBrand: e.value })}
                                    options={stateSeletedBrand}
                                />


                                <Col xs={6} className="instrument-serif-regular">
                                    <Form.Group>
                                        <Form.Label>(*) Tipo Unidad Medida</Form.Label>
                                        <Select
                                            options={TypeUnidMed}
                                            onChange={handleChangeTypeUnidMed}
                                            placeholder="Producto"
                                        />
                                    </Form.Group>
                                </Col>

                                {/* if option selected is talleInt or talleNum */}
                                {stateInput && stateInput.typeUnidMed === "Talle Internacional" ?
                                    <Col xs={6} className="pt-3">
                                        <Form.Group>
                                            <Form.Label className="instrument-serif-regular">(*) Valor Unidad Medida</Form.Label>
                                            <Select
                                                options={talleInt}
                                                onChange={handleChangeTalleInt}
                                                placeholder="Producto"
                                                className="instrument-serif-regular"
                                            />
                                        </Form.Group>
                                    </Col> : stateInput.typeUnidMed === "Talle Numerico" ?
                                        <Col xs={6} className="pt-3">
                                            <Form.Group>
                                                <Form.Label className="instrument-serif-regular">(*) Valor Unidad Medida</Form.Label>
                                                <Select
                                                    options={talleNum}
                                                    onChange={handleChangeTalleNum}
                                                    placeholder="Producto"
                                                    className="instrument-serif-regular"
                                                />
                                            </Form.Group>
                                        </Col> : <Col xs={6}>
                                            <Form.Group>
                                                <Form.Label className="instrument-serif-regular pt-3">(*) Valor Unidad Medida</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="valueUnitMed"
                                                    value={stateInput.valueUnitMed}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                }


                            </>

                            <Form.Group
                                className="mb-1"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label className="instrument-serif-regular pt-3">
                                    (*) Nombre Insumo
                                </Form.Label>

                                <Form.Control
                                    className="instrument-serif-regular"
                                    type="text"
                                    name="nameSupply"
                                    autoFocus
                                    maxLength={50}
                                    value={stateInput.nameSupply}
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
