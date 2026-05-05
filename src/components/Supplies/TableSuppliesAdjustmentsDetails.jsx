
import React, { useEffect, useState } from "react"
import { TbCategoryFilled } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { PiHighHeelFill } from "react-icons/pi";
import { FaCheckToSlot } from "react-icons/fa6";
import { actionAddSaleSupply } from "../../reducer/actions/supply/actionsSupply";
import { useDispatch, useSelector } from "react-redux";
import convertDateFormat from "../../functions/convertDateFormat"
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import converNum from "../../functions/convertNum"
import { getListSupplies } from "../../reducer/actions/supply/actionsSupply.js"
import { addStockAdjustment } from "../../reducer/actions/stockAdjustment/actionStockAdjustment.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { CalendarDays, Package, SlidersHorizontal, FileText, Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { set } from "react-hook-form";

const TableSuppliesAdjustmentsDetails = ({ dataSupplySeleted }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [stateOpenModalAdj, setStateOpenModalAdj] = useState(false);
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal);
    //estado que manejara el array de los insumos a vender que se seleccionaron
    const [stateDetailsSupplies, setStateDetailsSupplies] = useState([]);

    const [stateSaleDetail, setStateDetail] = useState({
        date: "",
        typeAdjustment: "",
        noteAdjustment: "",
        quantity: 1,
    })


    const [typeAdjustment, setTypeAdjustment] = useState(null);

    const [dataModalAdj, setDataModalAdj] = useState(null);

    const companySelectedMenu = useSelector((state) => state.company.companySelected);

    useEffect(() => {

        //dataSUpplySelected es el insumo que se eligio de la lista,se actualizara en la lista setStateDetailsSupplies si es que no hay otro elegido
        //esto lo determina el exists
        if (dataSupplySeleted && dataSupplySeleted._id) {

            setStateDetailsSupplies(prev => {
                const exists = prev.find(
                    item => item._id === dataSupplySeleted._id
                );

                if (exists) return prev;

                return [

                    { ...dataSupplySeleted, quantity: 1 }
                ];
            });
            const date = Date()
            const dateNew = convertDateFormat(date)
            setStateDetail({ ...stateSaleDetail, date: dateNew })
        }
    }, [dataSupplySeleted]);


    // const totalSale = React.useMemo(() => {
    //     return stateDetailsSupplies.reduce((acc, item) => {
    //         const quantity = item.quantity ?? 0;
    //         const price = item.priceSale ?? 0;

    //         return acc +
    //             (price * quantity)
    //     }, 0);
    // }, [stateDetailsSupplies]);


    const openModalDetails = (supply) => {
        setStateOpenModalAdj(true);
        setDataModalAdj(supply)
    }

    const addSaleSupply = async (detailsSupplies) => {

        setIsLoading(true)
        const listPrevArray = detailsSupplies.map(sup => {
            //ellimino todos los campos que no utilizares para cumplir con el formato del backend
            const { _id, global, idCompany, idGlobalSupply, priceSale, totalStock, ...newArray } = sup;
            return newArray;
        });

        const listItemsSupplies = listPrevArray.map(sup => {
            if (sup.batches.length > 0) {
                const idCompanySupply = sup.batches[0].idCompanySupply;
                const unitCost = sup.batches[0].unitCost;
                const itemArrayPrev = { ...sup, idCompanySupply, unitCost }
                const { batches, ...itemArraySale } = itemArrayPrev;
                return itemArraySale
            }
        });


        const dataAdjustment = {
            idCompany: companySelectedMenu._id,
            idCompanySupply: listItemsSupplies[0].idCompanySupply,
            date: stateSaleDetail.date,
            typeAdjustment: stateSaleDetail.typeAdjustment,
            quantity: stateSaleDetail.quantity,
            noteAdjustment: stateSaleDetail.noteAdjustment
        }

        const requestSale = await dispatch(addStockAdjustment(dataAdjustment))
        if (requestSale && requestSale.status == 200) {
            setIsLoading(false);
            //limpiamos el array de con insumos elegidos para vender
            setStateDetailsSupplies([]);
            //volvemos a cargar la lista de insumos de manera de que se actualice el stock visualizado
            dispatch(getListSupplies(companySelectedMenu._id))

            MySwal.fire({
                title: `¡Ajuste  Agregado Correctamente!`,
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
            }).then((result) => {
                if (result.isConfirmed) {


                    setStateDetail({
                        date: "",
                        typeAdjustment: "",
                        quantity: "",
                        noteAdjustment: "",
                    });
                    //reseteo del select
                    setTypeAdjustment(null)
                }
            });
        } else {
            setIsLoading(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un Error",
            });
        }


    }

    const handleChangeDataNumber = (e) => {
        const { name, value } = e.target;
        let valMax = stateDetailsSupplies.length > 0 ? stateDetailsSupplies[0].totalStock : 0;
        // solo enteros
        if (!/^\d*$/.test(value)) return;

        // evitar vacío
        if (value === "") {
            setStateDetail(prev => ({ ...prev, [name]: "" }));
            return;
        }

        // bloquear 0 exacto
        if (Number(value) === 0) return;

        const numericValue = Number(value);

        //límite máximo
        if (numericValue > valMax) return;

        setStateDetail(prev => ({
            ...prev,
            [name]: numericValue
        }));
    };

    const handleChangeData = (e) => {
        const { name, value } = e.target;

        setStateDetail(prev => ({
            ...prev,
            [name]: value
        }));
    };

    var arrayAdjustment = ["DAÑADO", "VENCIDO", "PERDIDO", "ROBO", "DIFERENCIA DE INVENTARIO", "DONACIÓN", "MUESTRA"];
    var selectTypeAdjuArray = [];

    if (Array.isArray(arrayAdjustment)) {
        arrayAdjustment.map((plat, i) => {
            var option = {
                value: plat,
                label: plat,
            };
            selectTypeAdjuArray.push(option);
        });
    }

    function handleChangeAdj(e) {
        const seleccionP = e.value;

        setStateDetail({ ...stateSaleDetail, typeAdjustment: seleccionP });
    }

    const deleteSupply = () => {

        MySwal.fire({
            title: "¿Estas seguro?",
            text: "¡Eliminar Insumo del Listado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1ABD53",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setStateDetailsSupplies([]);
                setStateDetail({
                    date: "",
                    typeAdjustment: "",
                    noteAdjustment: "",
                    quantity: "",
                })
                setTypeAdjustment(null);
                MySwal.fire({
                    title: "Insumo Eliminado",
                    text: "El Insumo se eliminó correctamente.",
                    icon: "success",
                    confirmButtonColor: "#00A0D2",
                });
            }
        });


    }

    const isValid = () => {
        return stateDetailsSupplies.length > 0 &&
            stateSaleDetail.date &&
            stateSaleDetail.quantity &&
            stateSaleDetail.typeAdjustment;
    }

    return (
        <div className="container-lg table-responsive mb-4">


            <table className="table table-bordered table-hover table-white mt-3">
                <thead className="thead-light table-secondary">
                    <tr>
                        <th className="instrument-serif-regular">
                            Insumo{" "}
                            {/* <FontAwesomeIcon
                                onClick={handleOrder}
                                icon={faSortAlphaDown}
                                style={{ cursor: "pointer" }}
                                color={order ? "#FF846A" : "#A2DFFF"}
                            /> */}
                        </th>



                        <th className="instrument-serif-regular">Opciones</th>
                    </tr>
                </thead>

                {

                    <tbody>

                        {stateDetailsSupplies && stateDetailsSupplies.length > 0 && stateDetailsSupplies.map((sup) => (
                            <tr>
                                <td
                                    className="instrument-serif-regular"
                                    style={{ cursor: "pointer" }}
                                // onClick={(e) =>
                                //     handleDetailsSupplies(e, { sup })
                                // }
                                >
                                    {sup.global?.nameSupply}
                                </td>

                                <td>

                                    <FontAwesomeIcon icon={faTrash} size="lg" onClick={() => deleteSupply()} />
                                </td>

                            </tr>))

                        }

                    </tbody>

                }



            </table>


            <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 bg-gray-100">

                <div className="">

                    <div>
                        <div className="mb-8">
                            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-gray-400 mb-1">
                                Gestión de inventario
                            </p>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                Ajuste de Stock
                            </h2>
                            <div className="mt-3 w-8 h-0.5 bg-black" />
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={(e) => {

                            e.preventDefault();
                            addSaleSupply(stateDetailsSupplies);
                        }}>


                            <div className="flex flex-col gap-1.5">
                                <label className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500">
                                    <CalendarDays className="w-3.5 h-3.5" />
                                    (*) Fecha de ajuste
                                </label>

                                <input className="w-full bg-white border border-gray-200 text-gray-900 text-sm px-4 py-3 
  focus:outline-none focus:ring-0 focus:border-black transition-colors duration-150"
                                    type="date"
                                    name="date"
                                    value={stateSaleDetail.date}
                                    onChange={handleChangeData}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div className="flex flex-col gap-1.5">

                                    <label className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500">
                                        <Package className="w-3.5 h-3.5" />
                                        Cantidad
                                    </label>

                                    <input
                                        className="w-full bg-white border border-gray-200 text-gray-900 text-sm px-4 py-3 
  focus:outline-none focus:ring-0 focus:border-black transition-colors duration-150 placeholder:text-gray-300"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[1-9]*"
                                        name="quantity"
                                        value={stateSaleDetail.quantity}
                                        onChange={handleChangeDataNumber}
                                        required
                                    />


                                </div>
                                <div className="flex flex-col gap-1.5">

                                    <label className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        Tipo de ajuste
                                    </label>

                                    <Select
                                        className="instrument-serif-regular"
                                        inputId="tam-select"
                                        value={typeAdjustment}
                                        inputProps={{ "data-testid": "tam-select" }}
                                        placeholder="Seleccione Tipo Ajuste"
                                        onChange={(e) => {
                                            setTypeAdjustment(e);
                                            handleChangeAdj(e);
                                        }}
                                        options={selectTypeAdjuArray}
                                    />
                                </div>


                            </div>


                            <div
                                className="flex flex-col gap-1.5"
                                controlId="exampleForm.ControlInput1"
                            >
                                <label className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500">
                                    <FileText className="w-3.5 h-3.5" />
                                    Nota de ajuste
                                    <span className="text-gray-300 font-normal normal-case tracking-normal">(opcional)</span>
                                </label>

                                <textarea
                                    className="w-full bg-white border border-gray-200 text-gray-900 text-sm px-4 py-3 focus:outline-none focus:border-gray-900 transition-colors duration-150 resize-none placeholder:text-gray-300"
                                    type="text"
                                    as="textarea"
                                    name="noteAdjustment"
                                    maxLength="50"
                                    value={stateSaleDetail.noteAdjustment}
                                    onChange={handleChangeData}

                                />
                            </div>


                            {/* Divider */}
                            <div className="border-t border-gray-100" />


                            <div className="flex items-center justify-between gap-4">

                                <div className="text-xs text-gray-400">
                                    {isValid() ? (
                                        <span className="text-gray-600 font-medium">
                                            Ajuste listo para registrar
                                        </span>
                                    ) : (
                                        "Completá los campos requeridos"
                                    )}
                                </div>


                                {!isLoading ? <button
                                    className={`flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase px-7 py-3 transition-all duration-150
              ${isValid()
                                            ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                                            : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                        }`}
                                    variant="primary"
                                    type="submit"

                                    disabled={!isValid()}
                                // disabled={!stateDetailsSupplies.length || !stateSaleDetail.date || !stateSaleDetail.quantity || !stateSaleDetail.typeAdjustment}
                                >
                                    <Plus className="w-4 h-4" strokeWidth={2} />
                                    Agregar Ajuste
                                </button> : null}

                                {isLoading && (
                                    <div className="d-flex vh-50 justify-content-center align-items-center flex-column">
                                        <ClipLoader color="#000" loading={true} size={70} />
                                        <div className="titGral">
                                            <h2 className="mt-3">Espere un Momento por favor ...</h2>
                                        </div>
                                    </div>
                                )}



                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default TableSuppliesAdjustmentsDetails;


