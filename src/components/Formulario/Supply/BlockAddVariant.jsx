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

import { getListSuppliesVariant } from "../../../reducer/actions/supply/actionsSupplyVariant"
import { actionAddSupplyVariant, actionAddImgSupplyVariant } from "../../../reducer/actions/supply/actionsSupplyVariant"
import { Utensils, Shirt, Save, Image as ImageIcon, X } from "lucide-react";
import { ClipLoader } from "react-spinners";

const selectClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-500 focus:ring-4 focus:ring-gray-200/70";

const BlockAddVariant = ({ stateSupplySelected, setStateSupplySelected }) => {

    const dispatch = useDispatch();

    const [productType, setProductType] = useState("");
    const [sizeType, setSizeType] = useState("");
    const [images, setImages] = useState([null, null, null]);
    const [loading, setLoading] = useState(false)

    // const handleChangeSelectVariant = (option) => {
    //     handleChangeField("nameVariant", option.label);
    //     handleChangeField("idVariant", option.value);
    // };

    const onChangeSelectUnidad = (option) => {

        setStateSupplySelected(prev => ({
            ...prev,
            unidad: option.value
        }));
    }

    const onChangeSelectSabor = (option) => {
        setStateSupplySelected((prev) => ({
            ...prev, sabor: option.value
        }))
    }

    const onChangeSelectColor = (option) => {
        setStateSupplySelected((prev) => ({
            ...prev, color: option.value

        }))
    }

    const onChangeSelectTalle = (option) => {
        setStateSupplySelected((prev) => ({
            ...prev, talle: option.value
        }))
    }

    //functions to add images
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];

        setImages((prev) => {
            const newImages = [...prev];
            newImages[index] = file;
            return newImages;
        });
    };

    const removeImage = (index) => {
        setImages(prev => { const n = [...prev]; n[index] = null; return n; });
    };

    const handleSubmit = async () => {
        setLoading(true)
        if (!stateSupplySelected.idSupply) {
            return Swal.fire({
                icon: "error",
                title: "Faltan datos",
                text: "Complete todos los campos",
            });
        }

        const data = Object.fromEntries(
            Object.entries(stateSupplySelected).filter(
                ([key, value]) => value !== ""
            )
        );

        const response = await dispatch(actionAddSupplyVariant(data));

        if (response.status === 200) {

            const formData = new FormData();

            formData.append(
                "variantData",
                JSON.stringify(stateSupplySelected)
            );

            images.forEach((image) => {
                if (image) {
                    formData.append("images", image);
                }
            });

            const responseImg = await dispatch(actionAddImgSupplyVariant(formData, response?.data?.supplyVariant._id))

            if (responseImg?.status !== 200) {
                setLoading(false)
                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El insumo fue creado pero la imagen no pudo subirse",
                });
            } else {
                setLoading(false)
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Variante Agregada"
                });
                setStateSupplySelected({
                    idSupply: "",
                    peso: "",
                    unidad: "",
                    sabor: "",
                    talle: "",
                    color: "",
                    name: ""
                })

            }

            //The product type form is reset
            setProductType("")

        } else {
            setLoading(false)
            if (response.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ya existe la variante",
                });
            }

        }
    };

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "46px",
            backgroundColor: "#ffffff",
            borderColor: state.isFocused ? "#6b7280" : "#e5e7eb",
            borderRadius: "12px",
            boxShadow: state.isFocused ? "0 0 0 4px rgba(229, 231, 235, 0.8)" : "0 1px 2px rgba(0, 0, 0, 0.04)",
            fontSize: "14px",
            transition: "all 180ms ease",
            cursor: "pointer",
            "&:hover": {
                borderColor: state.isFocused ? "#6b7280" : "#d1d5db",
            },
        }),
        valueContainer: (base) => ({
            ...base,
            padding: "2px 14px",
        }),
        input: (base) => ({
            ...base,
            color: "#111827",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
        }),
        singleValue: (base) => ({
            ...base,
            color: "#111827",
            fontWeight: 500,
        }),
        indicatorSeparator: () => ({ display: "none" }),
        dropdownIndicator: (base, state) => ({
            ...base,
            color: state.isFocused ? "#111827" : "#9ca3af",
            paddingRight: "12px",
            "&:hover": {
                color: "#111827",
            },
        }),
        menu: (base) => ({
            ...base,
            zIndex: 30,
            overflow: "hidden",
            marginTop: "8px",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: "0 18px 45px rgba(17, 24, 39, 0.12)",
        }),
        menuList: (base) => ({
            ...base,
            padding: "6px",
        }),
        option: (base, state) => ({
            ...base,
            borderRadius: "8px",
            marginBottom: "2px",
            backgroundColor: state.isSelected
                ? "#111827"
                : state.isFocused
                    ? "#f3f4f6"
                    : "#ffffff",
            color: state.isSelected ? "#ffffff" : "#374151",
            fontSize: "14px",
            cursor: "pointer",
            "&:active": {
                backgroundColor: state.isSelected ? "#111827" : "#e5e7eb",
            },
        }),
    };

    const sectionLabel = "mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500";
    const fieldLabel = "mb-2 block text-xs font-semibold text-gray-700";

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto w-full max-w-3xl">
                <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-[0_24px_70px_-28px_rgba(17,24,39,0.28)]">

                    {/* Header */}
                    <div className="relative overflow-hidden border-b border-gray-100 px-5 py-6 sm:px-8 sm:py-8">
                        <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-gray-100 blur-2xl" />
                        <div className="relative flex items-start justify-between gap-4">
                            <div>
                                <div className="mb-3 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                                    Gestión de inventario
                                </div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
                                    Agregar variante
                                </h1>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                                    Definí sus atributos e incorporá imágenes para identificarla fácilmente.
                                </p>
                            </div>
                            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm sm:flex">
                                <Save size={20} strokeWidth={1.8} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8">

                        {/* Tipo producto */}
                        <section>
                            <label className={sectionLabel}>Tipo de producto</label>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {[
                                    { value: "food", label: "Alimentos", description: "Peso, unidad y sabor", Icon: Utensils },
                                    { value: "clothes", label: "Ropa / Accesorios", description: "Color y tipo de talle", Icon: Shirt },
                                ].map(({ value, label, description, Icon }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => {
                                            setProductType(value); setSizeType(""); setStateSupplySelected(prev => ({
                                                ...prev,
                                                peso: "",
                                                unidad: "",
                                                sabor: "",
                                                color: "",
                                                talle: ""
                                            }));;
                                        }}
                                        className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${productType === value
                                            ? "border-gray-950 bg-gray-950 text-white shadow-lg shadow-gray-900/10"
                                            : "border-gray-200 bg-white text-gray-900 shadow-sm hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                                            }`}
                                    >
                                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${productType === value
                                            ? "bg-white/10 text-white"
                                            : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                                            }`}>
                                            <Icon size={19} strokeWidth={1.8} />
                                        </span>
                                        <span>
                                            <span className="block text-sm font-semibold">{label}</span>
                                            <span className={`mt-1 block text-xs ${productType === value ? "text-gray-300" : "text-gray-500"}`}>
                                                {description}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Alimentos */}
                        {productType === "food" && (
                            <section className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 sm:p-5">
                                <div className="mb-5">
                                    <h2 className="text-sm font-semibold text-gray-900">Características del alimento</h2>
                                    <p className="mt-1 text-xs text-gray-500">Completá los datos que distinguen esta variante.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label className={fieldLabel}>Peso</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: 15"
                                            maxLength={10000}
                                            required
                                            value={stateSupplySelected.peso || ""}
                                            onChange={(e) => {
                                                // Solo permitir números y máximo 10 caracteres
                                                const value = e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 5);
                                                // Don't allow values starting with 0
                                                if (value === "0") return;
                                                setStateSupplySelected((prevState) => ({
                                                    ...prevState,
                                                    peso: value,
                                                }));
                                            }}
                                            className={selectClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={fieldLabel}>Unidad</label>
                                        <Select
                                            styles={selectStyles}
                                            options={[
                                                { value: "kg", label: "Kg" },
                                                { value: "gramos", label: "Gramos" }
                                            ]}
                                            onChange={onChangeSelectUnidad}
                                            placeholder="Seleccionar"
                                        />
                                    </div>

                                    <div>
                                        <label className={fieldLabel}>Sabor</label>
                                        <Select
                                            styles={selectStyles}
                                            options={[
                                                { value: "pollo", label: "Pollo" },
                                                { value: "carne", label: "Carne" },
                                                { value: "verduras", label: "Verduras" },
                                                { value: "cereales", label: "Cereales" },
                                                { value: "carne,leche,cereales", label: "Carne,Leche,Cereales" },
                                                { value: "pollo y arroz", label: "Pollo y Arroz" },
                                                { value: "carne, pollo y cerdo", label: "Carne, Pollo y Cerdo" },
                                                { value: "pollo, carne y vegetales", label: "Pollo, Carne y Vegetales" },
                                                { value: "pescado, carne y vegetales", label: "Pescado, Carne y Vegetales" },
                                                { value: "pescado", label: "Pescado" }
                                            ]}
                                            onChange={onChangeSelectSabor}
                                            placeholder="Seleccionar"
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Ropa */}
                        {productType === "clothes" && (
                            <section className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 sm:p-5">
                                <div className="mb-5">
                                    <h2 className="text-sm font-semibold text-gray-900">Características de la prenda</h2>
                                    <p className="mt-1 text-xs text-gray-500">Seleccioná el color y el sistema de talles.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className={fieldLabel}>Color</label>
                                        <Select
                                            styles={selectStyles}
                                            options={[
                                                { value: "negro", label: "Negro" },
                                                { value: "blanco", label: "Blanco" },
                                                { value: "rosa", label: "Rosa" },
                                                { value: "amarillo", label: "Amarillo" },
                                                { value: "beige", label: "Beige" },
                                                { value: "gris", label: "Gris" },
                                                { value: "verde", label: "Verde" },
                                                { value: "rojo", label: "Rojo" },
                                                { value: "azul", label: "Azul" },
                                                { value: "blanco y azul", label: "Blanco y Azul" },
                                                { value: "blanco y negro", label: "Blanco y Negro"},
                                                {value:"blanco y gris", label:"Blanco y Gris"},
                                            ]}
                                            onChange={onChangeSelectColor}
                                            placeholder="Seleccionar"
                                        />
                                    </div>

                                    <div>
                                        <label className={fieldLabel}>Tipo de talle</label>
                                        <Select
                                            styles={selectStyles}
                                            options={[
                                                { value: "universal", label: "Universal" },
                                                { value: "numeric", label: "Numérico" }
                                            ]}
                                            onChange={(option) => {
                                                setSizeType(option.value);
                                                onChangeSelectUnidad(option);
                                            }}
                                            placeholder="Seleccionar"
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Talle universal */}
                        {sizeType === "universal" && (
                            <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                                <label className={fieldLabel}>Talle universal</label>
                                <Select
                                    styles={selectStyles}
                                    options={[
                                        { value: "S", label: "S" },
                                        { value: "M", label: "M" },
                                        { value: "L", label: "L" },
                                        { value: "X", label: "X" },
                                        { value: "XS", label: "XS" },
                                        { value: "XL", label: "XL" },
                                        { value: "XXL", label: "XXL" }
                                    ]}
                                    onChange={onChangeSelectTalle}
                                    placeholder="Seleccionar talle"
                                />
                            </section>
                        )}

                        {/* Talle numerico */}
                        {sizeType === "numeric" && (
                            <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                                <label className={fieldLabel}>Talle numérico</label>
                                <Select
                                    styles={selectStyles}
                                    options={[
                                        { value: 34, label: "34" },
                                        { value: 35, label: "35" },
                                        { value: 36, label: "36" },
                                        { value: 37, label: "37" },
                                        { value: 38, label: "38" },
                                        { value: 39, label: "39" },
                                        { value: 40, label: "40" },
                                        { value: 41, label: "41" },
                                        { value: 42, label: "42" },
                                        { value: 43, label: "43" },
                                        { value: 44, label: "44" }
                                    ]}
                                    onChange={onChangeSelectTalle}
                                    placeholder="Seleccionar talle"
                                />
                            </section>
                        )}

                        {/* Imagenes */}
                        <section>
                            <div className="mb-4 flex items-end justify-between gap-4">
                                <div>
                                    <label className={sectionLabel}>Imágenes de la variante</label>
                                    <p className="text-xs text-gray-500">Podés cargar hasta tres fotografías.</p>
                                </div>
                                <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-500">
                                    Máximo 3
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {[0, 1, 2].map((index) => (
                                    <div key={index} className={`group relative aspect-square ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                                        {images[index] ? (
                                            <>
                                                <img
                                                    src={URL.createObjectURL(images[index])}
                                                    alt={`preview-${index}`}
                                                    className="h-full w-full rounded-2xl border border-gray-200 object-cover shadow-sm"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-gray-700 shadow-md backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-gray-950 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                                                    aria-label="Eliminar imagen"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/70 p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-400 hover:bg-white hover:shadow-md">
                                                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors group-hover:text-gray-900">
                                                    <ImageIcon size={19} strokeWidth={1.8} />
                                                </span>
                                                <span>
                                                    <span className="block text-xs font-semibold text-gray-700">Subir foto</span>
                                                    <span className="mt-1 block text-[10px] text-gray-400">PNG, JPG o WEBP</span>
                                                </span>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageChange(e, index)}
                                                />
                                            </label>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    {loading ?
                        <div className="flex min-h-56 flex-col items-center justify-center border-t border-gray-100 bg-gray-50/70 px-5 py-10 text-center">
                            <ClipLoader color="#111827" loading={true} size={48} />
                            <h2 className="mt-5 text-sm font-semibold text-gray-900">
                                Guardando variante
                            </h2>
                            <p className="mt-1 text-xs text-gray-500">
                                Espere un momento, por favor...
                            </p>
                        </div> :

                        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                            <p className="text-center text-xs text-gray-400 sm:text-left">
                                Revisá los datos antes de guardar.
                            </p>
                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                <Save size={16} strokeWidth={2} />
                                Guardar variante
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default BlockAddVariant;