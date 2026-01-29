
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

const TableSuppliesAdjustmentsDetails = ({ dataSupplySeleted }) => {

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
        }

        const requestSale = await dispatch(addStockAdjustment(dataAdjustment))
        if (requestSale && requestSale.status == 200) {
            //volvemos a cargar la lista de insumos de manera de que se actualice el stock visualizado
            dispatch(getListSupplies(companySelectedMenu._id))
            //limpiamos el array de con insumos elegidos para vender
            setStateDetailsSupplies([]);
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

    var arrayAdjustment = ["NOTA DE CREDITO", "DAÑADO", "VENCIDO", "PERDIDO", "ROBO", "DIFERENCIA INVENTARIO", "DONACION", "MUESTRA"];
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




            <div style={{
                maxWidth: "400px", // Limita el ancho para que no sea gigante
                margin: "0 auto",  // Centra el div horizontalmente
                width: "100%",      // Asegura que responda en móviles

            }}
            >
                <Modal.Body className="pt-1 pb-1">

                    <Form>

                        <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label className="instrument-serif-regular">
                                (*) Fecha Ajuste
                            </Form.Label>

                            <Form.Control
                                className="instrument-serif-regular"
                                type="date"
                                name="date"
                                value={stateSaleDetail.date}
                                onChange={handleChangeData}
                                required
                            />
                        </Form.Group>


                        <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label className="instrument-serif-regular">
                                Cantidad
                            </Form.Label>

                            <Form.Control
                                className="instrument-serif-regular"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                name="quantity"
                                value={stateSaleDetail.quantity}
                                onChange={handleChangeDataNumber}
                                required
                            />
                        </Form.Group>


                        <Form.Group className="mt-2">

                            <Form.Label
                                htmlFor="tam-select"
                                className="instrument-serif-regular"
                            >
                                (*) Tipo Ajuste
                            </Form.Label>

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
                        </Form.Group>


                        <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label className="instrument-serif-regular">
                                Nota Ajuste
                            </Form.Label>

                            <Form.Control
                                className="instrument-serif-regular"
                                type="text"
                                as="textarea"
                                name="noteAdjustment"
                                maxLength="50"
                                value={stateSaleDetail.noteAdjustment}
                                onChange={handleChangeData}
                                required
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <div className="text-danger msgAlertInput">(*) Valores Obligatorios</div>
                <Modal.Footer className="mt-0 pt-3 pb-1 instrument-serif-regular">

                    <Button
                        className="w-100"
                        variant="primary"
                        type="submit"
                        onClick={() => { addSaleSupply(stateDetailsSupplies) }}
                        disabled={!stateDetailsSupplies.length || !stateSaleDetail.date}
                    >
                        Agregar Ajuste
                    </Button>

                </Modal.Footer>
            </div>
        </div>
    )
}

export default TableSuppliesAdjustmentsDetails;


