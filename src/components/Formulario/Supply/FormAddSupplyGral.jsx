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

import { X, Image as ImageIcon, Loader2, Plus } from "lucide-react";

const FormAddSupplyGral = ({ openModal, setOpenModal }) => {
    const inputClass =
        "w-full bg-white border border-gray-500 text-gray-600 text-sm px-3 py-2.5 rounded-none focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400";

    const labelClass =
        "text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500";


    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const listSupplier = useSelector((state) => state.supplier.listSupplier);
    const listBrands = useSelector((state) => state.gralRed.listBrands);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [stateSeletedBrand, setStateSeletedBrand] = useState();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const listCategories = useSelector((state) => state.category.arrayCategories);

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const [openModalVariant, setOpenModalVariant] = useState(false)
    const [stateLastSupply, setStateLastSupply] = useState()
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(actionListSupplier(companySelectedMenu._id));
            dispatch(getBrands(companySelectedMenu?.category));
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
                console.log(imageResponse, "IMAGE")
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
            <div className="w-full  bg-white border border-gray-200 overflow-hidden mt-3">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-200">
                    <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-gray-400 mb-1">
                        Gestión de inventario
                    </p>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">
                        Agregar Insumo General
                    </h1>
                </div>

                {/* Body */}
                <form className="px-8 py-7 space-y-5">
                    {/* Nombre Insumo */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>(*) Nombre Insumo</label>
                        <input
                            type="text"
                            value={supply.nameSupply || ""}
                            onChange={handleChange}
                            name="nameSupply"
                            maxLength={40}
                            placeholder="Marca + nombre del insumo"
                            className={inputClass}
                            required
                        />
                        <span className="text-gray-500 text-xs">
                            Ejemplo: Pedigree Cachorros Vital2 (marca + nombreInsumo)
                        </span>
                    </div>

                    {/* Marca */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>(*) Marca</label>
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

                    {/* Categoría */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>(*) Categoría</label>
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

                    {/* Descripción */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>Descripción</label>
                        <textarea
                            rows={4}
                            name="description"
                            value={supply.description}
                            onChange={handleChange}
                            maxLength={400}
                            placeholder="Añadí un comentario o detalle del insumo..."
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* Imagen */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>Imagen</label>
                        <div className="relative group w-40 h-40">
                            {image ? (
                                <>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="preview"
                                        className="w-full h-full object-cover border border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-white/90 text-gray-600 hover:text-red-500 hover:bg-red-50 p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-200"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center gap-2 w-full h-full bg-gray-50 border-2 border-dashed border-gray-200 cursor-pointer hover:border-gray-900 hover:bg-gray-100 transition-all duration-200 group">
                                    <ImageIcon
                                        size={20}
                                        className="text-gray-300 group-hover:text-gray-700 transition-colors duration-200"
                                    />
                                    <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
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
                    </div>

                    {/* Obligatorios */}
                    <p className="text-[11px] tracking-[0.18em] uppercase text-red-500 font-semibold">
                        (*) Valores Obligatorios
                    </p>

                    {/* Footer */}
                    <div className="pt-2 border-t border-gray-200 -mx-8 px-8 pt-5 bg-gray-50 -mb-7 pb-7">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center w-full py-3 gap-3">
                                <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
                                <p className="text-sm text-gray-600 font-light">
                                    Espere un Momento por favor ...
                                </p>
                            </div>
                        ) : (
                            <button
                                type="button"
                                 onClick={handleSubmit}
                                disabled={
                                    !supply.nameSupply?.trim() ||
                                    !supply.idBrand ||
                                    !supply.idCategory ||
                                    loading
                                }
                                className="flex items-center gap-2 bg-black text-white text-sm font-semibold tracking-[0.12em] uppercase px-7 py-3 hover:bg-gray-800 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Plus className="w-4 h-4" strokeWidth={2} />
                                Agregar Insumo
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormAddSupplyGral;
