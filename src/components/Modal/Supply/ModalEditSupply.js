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
import { getListSupplies, actionEditSupply } from "../../../reducer/actions/supply/actionsSupply"
import { getBrands } from "../../../reducer/actions/actionBrand"

const ModalEditSupply = ({
    modalOpenEditSupply,
    setModalOpenEditSupply,
    dataSupply,
}) => {
  

    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier)
    const listBrands = useSelector((state) => state.gralRed.listBrands)

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
        if (companySelectedMenu) {
            dispatch(getBrands())
        }
    }, [])

    useEffect(() => {
        if (dataSupply) {
            setStateInput({
                idSupply: dataSupply._id,
                nameSupply: dataSupply.global.nameSupply,
                categorySupply: dataSupply.global.categorySupply,
                idSupplier: dataSupply.idSupplier,
                nameSupplier: dataSupply.nameSupplier,
                priceSale: dataSupply.priceSale,
                nameBrand: dataSupply.global.nameBrand,
                typeUnidMed: dataSupply.global.typeUnidMed,
                valueUnidMed: dataSupply.global.valueUnidMed,
                priceSale: dataSupply.priceSale
            })
        }
    }, [dataSupply])

    useEffect(() => {
        if (Array.isArray(listBrands) && listBrands.length > 0) {
            const formattedBrands = listBrands.map((brand) => ({
                value: brand._id,
                label: brand.nameBrand,
            }));

            setStateSeletedBrand(formattedBrands);
        }
    }, [listBrands]);

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
        const nameSupplier = e.label

        setStateInput({ ...stateInput, idSupplier: idSupplier, nameSupplier: nameSupplier })
    }

    const handleSubmit = () => {
        // if (stateInput.nameSupply.trim() === "" || stateInput.categorySupply.trim() === "" || stateInput.idSupplier.trim() === "") {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Faltan Datos por Completar",
        //     });
        // }
        
            const supplyData = {
                categorySupply: stateInput.categorySupply,
                idSUpply: stateInput.idSupply,
                nameBrand: stateInput.nameBrand,
                nameSupply: stateInput.nameSupply,
                idBrand: stateInput.idBrand,
                priceSale: stateInput.priceSale,
                typeUnidMed: stateInput.typeUnidMed,
                valueUnidMed: stateInput.valueUnidMed,
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
        
    };

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
                <Modal show={modalOpenEditSupply} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="instrument-serif-regular">
                            Editar Insumo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-1 pb-1">
                        <Form>

                            <>

                                <Select
                                    className="classSelect instrument-serif-regular"
                                    placeholder={stateInput.categorySupply ? stateInput.categorySupply : "Seleccione Categoria"}
                                    onChange={(e) => {
                                        handleChangeCategory(e);
                                    }}
                                    options={selectCategoryArray}
                                />

                                <Select
                                    className="classSelect instrument-serif-regular"
                                    placeholder={stateInput.nameBrand ? stateInput.nameBrand : "Seleccione Marca"}
                                    onChange={(e) => setStateInput({ ...stateInput, nameBrand: e.label, idBrand: e.value })}
                                    options={stateSeletedBrand}
                                />

                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Label className="instrument-serif-regular">Tipo Unidad Medida</Form.Label>
                                        <Select
                                            className="instrument-serif-regular mt-1"
                                            options={TypeUnidMed}
                                            onChange={handleChangeTypeUnidMed}
                                            placeholder={stateInput.typeUnidMed ? stateInput.typeUnidMed : "Seleccione tipo de Unidad"}
                                        />
                                    </Form.Group>
                                </Col>

                                {stateInput && stateInput.typeUnidMed === "Talle Internacional" ?
                                    <Col xs={6} className="mt-2">
                                        <Form.Group>
                                            <Form.Label className="instrument-serif-regular">Valor Unidad Medida</Form.Label>
                                            <Select
                                                className="instrument-serif-regular"
                                                onChange={handleChangeTalleInt}
                                                placeholder={stateInput.valueUnidMed ? stateInput.valueUnidMed : "Seleccione valor de Unidad"}
                                            />
                                        </Form.Group>

                                    </Col> : stateInput.typeUnidMed === "Talle Numerico" ?
                                        <Col xs={6} className="mt-2">
                                            <Form.Group>
                                                <Form.Label className="instrument-serif-regular">Valor Unidad Medida</Form.Label>
                                                <Select
                                                    className="instrument-serif-regular"
                                                    options={talleNum}
                                                    onChange={handleChangeTalleNum}
                                                    placeholder={stateInput.valueUnidMed ? stateInput.valueUnidMed : "Seleccione valor de Unidad"}
                                                />
                                            </Form.Group>
                                        </Col> : <Col xs={6}>
                                            <Form.Group>
                                                <Form.Label>Valor Unidad Medida</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="valueUnitMed"
                                                    value={stateInput.valueUnitMed}
                                                    onChange={handleChange}
                                                    placeholder={stateInput.valueUnidMed ? stateInput.valueUnidMed : "Seleccione valor de Unidad"}
                                                />
                                            </Form.Group>
                                        </Col>
                                }

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
                                        onChange={handleChange}
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
                            disabled={!stateInput.nameSupply || !stateInput.categorySupply || !stateInput.typeUnidMed || !stateInput.valueUnidMed || !stateInput.nameBrand || !stateInput.priceSale}
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
