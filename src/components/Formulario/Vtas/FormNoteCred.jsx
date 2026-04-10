import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { actionNoteCred } from "../../../reducer/actions/salesSupply/actionSalesSupply";
import {resetSalesByMonth} from "../../../reducer/actions/supply/actionsInformSalesSupply";
import convertNum from "../../../functions/convertNum";
import { set } from "react-hook-form";

const FormNoteCred = ({ openModal, setOpenModal, dataModalSale,setStateDetailsSale }) => {
    const dispatch = useDispatch();
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const [stateOptionsSelect, setStateOptionsSelect] = useState([]);
    const [stateQuantity, setStateQuantity] = useState(0);
    const [stateListOptionSelected, setStateListOptionSelected] = useState([]);

    const [stateDate, setStateDate] = useState(new Date().toISOString().split('T')[0]);
    const [stateReason, setStateReason] = useState("");

    const MySwal = withReactContent(Swal);


    useEffect(() => {
        if (dataModalSale && dataModalSale.items.length > 0) {

            const options = dataModalSale.items
                .filter(item => (item.quantitySale - (item.quantityReturned || 0)) > 0)
                .map(item => ({
                    value: {
                        idItemSale: item._id,
                        nameSupply: item.nameSupply,
                        precioUnit: item.subtotal / item.quantitySale,
                        quantitySale: item.quantitySale,
                        quantityReturn: item.quantitySale - (item.quantityReturned || 0)
                    },
                    label: item.nameSupply
                }));

            setStateOptionsSelect(options);
        }
    }, [dataModalSale]);

    const handleChangeSelect = (selectedOption) => {
        setStateOptionsSelect(prev =>
            prev.filter(option => option.value.idItemSale !== selectedOption.value.idItemSale)
        );

        setStateListOptionSelected(prev => [
            ...prev,
            selectedOption.value
        ]);
    }

    const changeQuantity = (data, { e }) => {
console.log(data)
        const value = Math.max(1, Math.min(data?.quantitySale - (data?.quantityReturn || 0), parseInt(e.target.value, 10) || 0));
        setStateListOptionSelected(prevState => prevState.map(option => option.idItemSale === data.idItemSale ? { ...option, quantityReturn: value } : option));
    };

    const addNoteCred = async ({ date, arraySupplies, idSale, idCompany, reason }) => {
     
   
        MySwal.fire({
            title: "Cargando...",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                MySwal.showLoading();
            }
        });

        try {
            const request = await dispatch(actionNoteCred({ date, arraySupplies, idSale, idCompany, reason }));

            if (request && request.status === 200) {

                // Cerrar loading y mostrar el mensaje de éxito
                await MySwal.fire({
                    title: "¡Nota de Crédito creada correctamente!",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(21, 151, 67)",
                });

               setStateListOptionSelected([]);
                setStateDate("")
                setStateReason("")
                setOpenModal(false);
                setStateDetailsSale("")
                dispatch(resetSalesByMonth())

            } else {
                await MySwal.fire({
                    title: "Error",
                    text: "Ocurrió un error al crear la nota de crédito.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(255, 0, 0)",
                });
            }

       } catch (error) {
   
            await MySwal.fire({
                title: "Error",
                text: "Ocurrió un error al crear la nota de crédito.",
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(255, 0, 0)",
            });
       }
    }

    const removeItem = (itemToRemove) => {
        // eliminar de la tabla
        setStateListOptionSelected(prev =>
            prev.filter(item => item.idItemSale !== itemToRemove.idItemSale)
        );

        // devolver al select
        setStateOptionsSelect(prev => [
            ...prev,
            {
                value: itemToRemove,
                label: itemToRemove.nameSupply
            }
        ]);
    };

    const subtotal = stateListOptionSelected.reduce((acc, item) => {
        return acc + (item.quantityReturn * (item.precioUnit || 0));
    }, 0);

    return (
        <>
            <div className="container mt-1">
                <div className="titGral">

                    <h2 className="mb-4">Nota de Crédito</h2>
                </div>


                <div className="row justify-content-center">

                    {/* FILA 1 */}
                    <div className="col-12 col-md-8">
                        <div className="row">

                            <div className="col-12 col-md-6 mb-3">
                                <label>N° Factura</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={dataModalSale?.numeSale || ""}
                                    readOnly
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label>Producto</label>
                                <Select
                                    className="instrument-serif-regular"
                                    inputId="tam-select"
                                    placeholder={
                                        stateOptionsSelect.length > 0
                                            ? "Seleccione Producto"
                                            : "No hay opciones disponibles"
                                    }
                                    onChange={handleChangeSelect}
                                    options={stateOptionsSelect}
                                    isDisabled={stateOptionsSelect.length === 0}
                                />
                            </div>

                        </div>
                    </div>

                    {/* FILA 2 */}
                    <div className="col-12 col-md-8">
                        <div className="row">

                            <div className="col-12 col-md-6 mb-3">
                                <label>Fecha</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    min={stateDate}
                                    value={stateDate}
                                    onChange={(e) => setStateDate(e.target.value)}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label>Observaciones</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    onChange={(e) => setStateReason(e.target.value)}
                                ></textarea>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div className="container-lg table-responsive">


                <table className="table table-bordered align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stateListOptionSelected && stateListOptionSelected.length > 0 ? (
                                stateListOptionSelected.map((option, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="text" className="form-control" value={option.nameSupply} readOnly />
                                        </td>
                                        <td>
                                            <input type="number" className="form-control" value={option.quantityReturn} onChange={(e) => changeQuantity(option, { e })} />
                                        </td>
                                        <td>{option.quantityReturn * (option.precioUnit || 0)}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => removeItem(option)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                )
                                )
                            ) : null
                        }
                    </tbody>
                </table>

                <div className="mb-2">
                    {/* <div>Subtotal: {convertNum(subtotal)}</div> */}

                    <strong>Total:  {convertNum(subtotal)}</strong>

                </div>





                <div className="mt-4 d-flex gap-2">
                    <button className="btn btn-success" onClick={() => addNoteCred({ date: stateDate, arraySupplies: stateListOptionSelected, idSale: dataModalSale._id, idCompany: companySelectedMenu._id, reason: stateReason })}>
                        Guardar Nota de Crédito
                    </button>

                </div>

            </div>




        </>
    );
};

export default FormNoteCred;
