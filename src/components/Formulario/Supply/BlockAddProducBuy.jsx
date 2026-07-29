import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { motion } from "framer-motion";
import {
    getListSupplies,
    getListSuppliesGral
} from "../../../reducer/actions/supply/actionsSupply";
import { getBrands } from "../../../reducer/actions/actionBrand";
import { getListSuppliesVariant } from "../../../reducer/actions/supply/actionsSupplyVariant";

const inputClass =
    "w-full bg-white border border-zinc-500 text-gray-900 text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/5 transition-all duration-200 placeholder:text-gray-400";

const labelClass =
    "text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500 mb-1.5 block";

const errorClass =
    "border-red-300 focus:border-red-400 focus:ring-red-100";

const BlockAddProducBuy = ({
    stateInput,
    setStateInput,
    index,
    validationBuySupply
}) => {
    const dispatch = useDispatch();
    console.log(stateInput)
    const companySelectedMenu = useSelector(
        (state) => state.company.companySelected
    );

    const listSupplies = useSelector(
        (state) => state.supply.listSupplies
    );

    const listSuppliesGral = useSelector(
        (state) => state.supply.listSuppliesGral
    );

    const listBrands = useSelector(
        (state) => state.gralRed.listBrands
    );

    const listSuppliesVariant = useSelector(
        (state) =>
            state.supplyVariant.listSuppliesVariant.listSupplyVariants
    );

    const [stateMargen, setmargen] = useState(50);
    const [suppliesOptions, setSuppliesOptions] = useState([]);
    const [variantOptions, setVariantOptions] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);

    const currentProduct = stateInput.detailsSupply[index];

    useEffect(() => {
        if (companySelectedMenu) {
            dispatch(getListSupplies(companySelectedMenu._id));
            dispatch(getBrands(companySelectedMenu?.category));
        }
    }, [companySelectedMenu]);

    useEffect(() => {
        dispatch(getListSuppliesGral());
        dispatch(getListSuppliesVariant());
    }, []);

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
                .filter(
                    (prod) => prod?.idBrand === currentProduct?.idBrand
                )
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
                    (variant) =>
                        variant?.idSupply === currentProduct?.idSupply
                )
                .map((variant) => ({
                    value: variant._id,
                    label: variant.name
                }));

            setVariantOptions(filteredVariants);
        }
    }, [currentProduct?.idSupply, listSuppliesVariant]);

    useEffect(() => {
        if (currentProduct?.unitCost != null) {
            const calculated =
                currentProduct.unitCost * (1 + stateMargen / 100);

            setStateInput((prev) => {
                const updated = [...prev.detailsSupply];

                updated[index] = {
                    ...updated[index],
                    priceSale: calculated
                };

                return {
                    ...prev,
                    detailsSupply: updated
                };
            });
        }
    }, [currentProduct?.unitCost, stateMargen]);

    const handleChangeFieldBrand = (name, value) => {

        if (name === "quantity" || name === "unitCost") {
            value = value.replace(/\D/g, "").slice(0, 10);
        }

        setStateInput((prev) => {
            const updated = [...prev.detailsSupply];

            updated[index] = {
                ...updated[index],
                [name]: value
            };

            return {
                ...prev,
                detailsSupply: updated
            };
        });

        setStateInput((prev) => ({
            ...prev,
            detailsSupply: prev.detailsSupply.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        idSupply: "",
                        nameSupply: "",
                        idVariant: "",
                        nameVariant: "",
                    }
                    : item
            ),
        }));
    };

    const handleChangeFieldProduct = (name, value) => {

        if (name === "quantity" || name === "unitCost") {
            value = value.replace(/\D/g, "").slice(0, 10);
        }

        setStateInput((prev) => {
            const updated = [...prev.detailsSupply];

            updated[index] = {
                ...updated[index],
                [name]: value
            };

            return {
                ...prev,
                detailsSupply: updated
            };
        });
    };

    const handleChangeFieldVariant = (name, value) => {

        if (name === "quantity" || name === "unitCost") {
            value = value.replace(/\D/g, "").slice(0, 10);
        }

        setStateInput((prev) => {
            const updated = [...prev.detailsSupply];

            updated[index] = {
                ...updated[index],
                [name]: value
            };

            return {
                ...prev,
                detailsSupply: updated
            };
        });
    };

    const handleChangeSelectBrand = (option) => {
        setStateInput((prev) => {
            const updated = [...prev.detailsSupply];

            updated[index] = {
                ...updated[index],

                // Nueva marca seleccionada
                nameBrand: option?.label || "",
                idBrand: option?.value || "",

                // Limpiar producto
                nameSupply: "",
                idSupply: "",

                // Limpiar variante
                nameVariant: "",
                idVariant: "",
            };

            return {
                ...prev,
                detailsSupply: updated,
            };
        });
    };

    const handleChangeSelectSupply = (option) => {
        setStateInput((prev) => {
            const updated = [...prev.detailsSupply];

            updated[index] = {
                ...updated[index],

                // Nuevo producto seleccionado
                nameSupply: option?.label || "",
                idSupply: option?.value || "",

                // Limpiar variante
                nameVariant: "",
                idVariant: "",
            };

            return {
                ...prev,
                detailsSupply: updated,
            };
        });
    };

    const handleChangeSelectVariant = (option) => {
        setStateInput((prev) => {
            const updated = [...prev.detailsSupply];

            updated[index] = {
                ...updated[index],
                nameVariant: option?.label || "",
                idVariant: option?.value || "",
            };

            return {
                ...prev,
                detailsSupply: updated,
            };
        });
    };

    const handleChangeInput = (e) => {
        const { name, value, type } = e.target;

        handleChangeField(
            name,
            type === "number"
                ? value === ""
                    ? ""
                    : Number(value)
                : value
        );
    };

    const handleChangeMargen = (e) => {
        let { value } = e.target;

        value = value.replace(/\D/g, "").slice(0, 3);
        setmargen(value);
    };

    const customStyles = (hasError) => ({
        container: (provided) => ({
            ...provided,
            width: "100%"
        }),
        control: (provided, state) => ({
            ...provided,
            minHeight: "42px",
            borderRadius: "0.5rem",
            borderColor: hasError
                ? "#fca5a5"
                : state.isFocused
                    ? "#111827"
                    : "#e5e7eb",
            boxShadow: state.isFocused
                ? "0 0 0 1px rgba(17, 24, 39, 0.05)"
                : "none",
            backgroundColor: "#ffffff",
            fontSize: "0.875rem",
            transition: "all 0.2s ease",
            "&:hover": {
                borderColor: hasError ? "#f87171" : "#111827"
            }
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: "0 14px"
        }),
        input: (provided) => ({
            ...provided,
            margin: 0,
            padding: 0
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#d1d5db"
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#111827"
        }),
        indicatorSeparator: () => ({
            display: "none"
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#9ca3af",
            padding: "8px"
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 50,
            borderRadius: "0.75rem",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)"
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: "0.875rem",
            backgroundColor: state.isSelected
                ? "#111827"
                : state.isFocused
                    ? "#f3f4f6"
                    : "#ffffff",
            color: state.isSelected ? "#ffffff" : "#374151",
            cursor: "pointer"
        })
    });

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>* Marca</label>

                    <Select
                        styles={customStyles(!currentProduct?.nameBrand)}
                        placeholder="Seleccione una marca"
                        onChange={handleChangeSelectBrand}
                        options={brandOptions}
                        value={
                            currentProduct?.nameBrand
                                ? brandOptions.find(
                                    (brand) =>
                                        brand.label === currentProduct.nameBrand
                                ) || null
                                : null
                        }
                    />
                </div>

                <div>
                    <label className={labelClass}>* Producto</label>

                    <Select
                        styles={customStyles(!currentProduct?.nameSupply)}
                        placeholder="Seleccione un producto"
                        options={suppliesOptions}
                        onChange={handleChangeSelectSupply}
                        value={
                            currentProduct?.nameSupply
                                ? suppliesOptions.find(
                                    (product) =>
                                        product.label === currentProduct.nameSupply
                                ) || null
                                : null
                        }
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        * Variante de producto
                    </label>

                    <Select
                        styles={customStyles(!currentProduct?.idVariant)}
                        placeholder="Seleccione una variante"
                        options={variantOptions}
                        onChange={handleChangeSelectVariant}
                        value={
                            currentProduct?.nameVariant
                                ? variantOptions.find(
                                    (variant) =>
                                        variant.label === currentProduct.nameVariant
                                ) || null
                                : null
                        }
                    />
                </div>

                <div>
                    <label className={labelClass}>Vencimiento</label>

                    <input
                        type="date"
                        name="dueDate"
                        className={inputClass}
                        value={currentProduct?.dueDate || ""}
                        onChange={handleChangeInput}
                    />
                </div>

                <div>
                    <label className={labelClass}>* Cantidad</label>

                    <input
                        type="text"
                        name="quantity"
                        placeholder="0"
                        className={`${inputClass} ${!currentProduct?.quantity ? errorClass : ""
                            }`}
                        value={currentProduct?.quantity || ""}
                        onChange={handleChangeInput}
                        required
                        maxLength={4}
                    />
                </div>

                <div>
                    <label className={labelClass}>* Costo Unidad</label>

                    <input
                        type="text"
                        name="unitCost"
                        placeholder="0"
                        className={`${inputClass} ${!currentProduct?.unitCost ? errorClass : ""
                            }`}
                        value={currentProduct?.unitCost || ""}
                        onChange={handleChangeInput}
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>% Ganancia</label>

                    <div className="relative">
                        <input
                            type="text"
                            name="margen"
                            placeholder="0"
                            className={`${inputClass} pr-12 ${!stateMargen ? errorClass : ""
                                }`}
                            value={stateMargen}
                            onChange={handleChangeMargen}
                            maxLength={3}
                            required
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                            %
                        </span>
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Precio Venta</label>

                    <div className="relative">
                        <input
                            type="text"
                            name="priceSale"
                            className={`${inputClass} bg-gray-100 font-semibold text-gray-900 pr-16`}
                            value={
                                currentProduct?.unitCost *
                                (1 + stateMargen / 100) || ""
                            }
                            onChange={handleChangeInput}
                            required
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400">
                            Auto
                        </span>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label className={labelClass}>Observaciones</label>

                    <textarea
                        rows={3}
                        name="details"
                        value={currentProduct?.details || ""}
                        onChange={handleChangeInput}
                        maxLength={70}
                        placeholder="Agregue observaciones del producto..."
                        className={`${inputClass} resize-none`}
                    />

                    <div className="mt-1.5 flex justify-end">
                        <span className="text-[10px] tracking-wide text-gray-400">
                            {(currentProduct?.details || "").length}/70
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlockAddProducBuy;