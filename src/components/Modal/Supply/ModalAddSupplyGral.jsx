import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import { listCategories } from "../../../reducer/actions/category/actionCategory";
import { actionListSupplier } from "../../../reducer/actions/supplier/actionsSupplier";
import { actionAddSupply, getListSupplies, actionAddImgSupply } from "../../../reducer/actions/supply/actionsSupply";
import { getBrands } from "../../../reducer/actions/actionBrand";
import { ClipLoader } from "react-spinners";

import { Utensils, Shirt, Save, Image as ImageIcon, X } from "lucide-react";

const ModalAddSupplyGral = ({ openModal, setOpenModal }) => {
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier);
    const listBrands = useSelector((state) => state.gralRed.listBrands);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [stateSeletedBrand, setStateSeletedBrand] = useState();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const listCategories = useSelector((state) => state.category.listCategories);
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const [openModalVariant, setOpenModalVariant] = useState(false)
    const [stateLastSupply, setStateLastSupply] = useState()
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListSupplier(companySelectedMenu._id));
            dispatch(getBrands());
        }
    }, [companySelectedMenu, dispatch]);

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
        setSupply({
            nameSupply: "",
            idBrand: "",
            description: "",
            idCategory: ""
        });
        setImage(null)
        setSelectedCategory(null)
    };

    const [supply, setSupply] = useState({
        nameSupply: "",
        idBrand: "",
        description: "",
        idCategory: ""
    });


    const brandOptions = listBrands?.map((brand) => ({
        value: brand._id,
        label: brand.nameBrand,
    })) || [];

    const categoryOptions =
        selectedBrand?.categories?.map((category) => ({
            value: category._id,
            label: category.name,
        })) || [];

    const handleSubmit = async () => {
        if (!supply.nameSupply.trim() || !supply.idBrand || !supply.idCategory) {
            return Swal.fire({
                icon: "error",
                title: "Faltan datos",
                text: "Complete todos los campos",
            });
        }
        setLoading(true)

        const payload = {
            nameSupply: supply.nameSupply,
            idBrand: supply.idBrand,
            description: supply.description,
            idCategory: supply.idCategory
        };

        const response = await dispatch(actionAddSupply(payload));

        if (response.status === 200) {

            if (image) {
                const imageResponse = await dispatch(
                    actionAddImgSupply(
                        image,
                        response.data.supply._id
                    )
                );
                if (imageResponse?.status !== 200) {
                    return Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "El insumo fue creado pero la imagen no pudo subirse",
                    });
                    setLoading(false)
                }
            }
            setLoading(false)
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "Ahora debes agregar variantes"
            });



            setSupply({
                nameSupply: "",
                idBrand: "",
                description: "",
                idCategory: ""
            })
            setImage(null)
            setSelectedCategory(null)
        } else if (response.status === 400) {
            setLoading(false)
            return Swal.fire({
                icon: "error",
                title: "Insumo duplicado",
                text: "El insumo ya se encuentra cargado",
            });

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "nameSupply" && value.trim() === "") {
            return;
        }

        setSupply((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //functions to add images
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    return (
        <>
            <div>
                <Modal show={openModal} onHide={handleClose} className="bg-gray-800 text-white">
                    <Modal.Header closeButton className="bg-gray-700">
                        <Modal.Title className="text-lg font-semibold text-white">
                            Agregar Insumo General
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pt-1 pb-1">
                        <div className="mb-3">
                            <label className="text-sm font-medium">(*) Nombre Insumo</label>
                            <input
                                type="text"
                                value={supply.nameSupply || ""}
                                onChange={handleChange}
                                name="nameSupply"
                                maxLength={40}
                                placeholder="Marca + nombre del insumo"
                                className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md p-2"
                                required
                            />
                            <span className="text-gray-400 text-xs">Ejemplo: Pedigree Cachorros Vital2 (marca + nombreInsumo)</span>
                        </div>

                        <div className="mb-3">
                            <label className="text-sm font-medium">(*) Marca</label>
                            <Select
                                placeholder="Seleccione una marca"
                                options={brandOptions}

                                onChange={(option) => {
                                    const brand = listBrands.find(
                                        (b) => b._id === option.value
                                    );
                                    setSelectedBrand(brand);
                                    setSelectedCategory(null); // Clear select UI
                                    setSupply({ ...supply, idCategory: "" })
                                    setSupply((prev) => ({
                                        ...prev,
                                        idBrand: option.value,
                                    }))

                                }
                                }
                                className="mt-1"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="text-sm font-medium">(*) Categoria</label>
                            <Select
                                placeholder="Seleccione Categoria"
                                options={categoryOptions}
                                value={selectedCategory}
                                onChange={(option) => {
                                    setSelectedCategory(option);

                                    setSupply((prev) => ({
                                        ...prev,
                                        idCategory: option.value,
                                    }));
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="text-sm font-medium">Descripción</label>
                            <textarea
                                rows={4}
                                name="description"
                                value={supply.description}
                                onChange={handleChange}
                                maxLength={250}
                                className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md p-2"
                            />
                        </div>

                        <div className="relative group w-40 h-40">

                            {image ? (
                                <>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="preview"
                                        className="w-full h-full object-cover rounded-xl border border-slate-700"
                                    />

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-slate-900/80 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-slate-700"
                                    >
                                        <X size={30} />
                                    </button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-2 w-full h-full bg-slate-800/60 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-indigo-500/60 hover:bg-slate-800 transition-all duration-200 group">

                                    <ImageIcon
                                        size={20}
                                        className="text-slate-600 group-hover:text-indigo-400 transition-colors duration-200"
                                    />

                                    <span className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors duration-200">
                                        Subir foto
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            )}
                        </div>

                        <div className="d-flex align-items-center label-input-container text-danger msgAlertInput mt-2">
                            (*) Valores Obligatorios
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="bg-gray-900">

                        {
                            loading ?

                                <div className="d-flex flex-column align-items-center justify-content-center w-100 py-3">

                                    <ClipLoader color="#0e0202" loading={true} size={70} />

                                    <div className="titGral">
                                        <h2 className="mt-3">
                                            Espere un Momento por favor ...
                                        </h2>
                                    </div>

                                </div> :

                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={!supply.nameSupply?.trim() || !supply.idBrand || !supply.idCategory || loading}
                                >
                                    Agregar Insumo
                                </Button>}
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default ModalAddSupplyGral;
