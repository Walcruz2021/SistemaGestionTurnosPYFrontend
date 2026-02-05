
import React, { useEffect, useState } from "react"
import { TbCategoryFilled } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { PiHighHeelFill } from "react-icons/pi";
import { FaCheckToSlot } from "react-icons/fa6";
import ModalAddSaleSupply from "../Modal/Supply/ModalAddSaleSupply";
import { actionAddSaleSupply } from "../../reducer/actions/supply/actionsSupply";
import { useDispatch, useSelector } from "react-redux";
import convertDateFormat from "../../functions/convertDateFormat"
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import converNum from "../../functions/convertNum"
import { getListSupplies } from "../../reducer/actions/supply/actionsSupply.js"

const TableSuppliesSaleDetails = ({ dataSupplySeleted }) => {

    const [stateOpenModalSale, setStateOpenModalSale] = useState(false);
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal);
    //estado que manejara el array de los insumos a vender que se seleccionaron
    const [stateDetailsSupplies, setStateDetailsSupplies] = useState([]);
    const [visibleCheckE, setVisibleCheckE] = useState(false);
    const [visibleCheckT, setVisibleCheckT] = useState(false);
    const [visibleCheckB, setVisibleCheckB] = useState(false);

    const [stateSaleDetail, setStateDetail] = useState({
        dateSale: "",
        platformMethod: ""
    })

    const [stateValueMethodPay, setStateValueMethodPay] = useState({
        transferencia: "",
        tarjeta: "",
        efectivo: ""
    });


    const [dataModalSale, setDataModalSale] = useState(null);

    const companySelectedMenu = useSelector((state) => state.company.companySelected);

    const [selectState, setSelectState] = useState(null);


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
                    ...prev,
                    { ...dataSupplySeleted, quantitySale: 1 }
                ];
            });
            const date = Date()
            const dateNew = convertDateFormat(date)
            setStateDetail({ ...stateSaleDetail, dateSale: dateNew })
        }
    }, [dataSupplySeleted]);


    const totalSale = React.useMemo(() => {
        return stateDetailsSupplies.reduce((acc, sale) => {
            const quantity = sale.quantitySale ?? 0;
            const price = sale.priceSale ?? 0;
            const discount = sale.discount ?? 0;
            const surcharge = sale.surcharge ?? 0;

            return acc +
                (price * quantity) -
                (discount * quantity) +
                (surcharge * quantity);
        }, 0);
    }, [stateDetailsSupplies]);



    const openModalSaleDetails = (supply) => {
        setStateOpenModalSale(true);
        setDataModalSale(supply)
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


        const dataSaleSupply = {
            idCompany: companySelectedMenu._id,
            date: stateSaleDetail.dateSale,
            paymentMethodEfectivo: stateValueMethodPay.efectivo,
            paymentMethodTransferencia: stateValueMethodPay.transferencia,
            paymentMethodTarjeta: stateValueMethodPay.tarjeta,
            platformMethod: stateSaleDetail.platformMethod,
            items: listItemsSupplies
        }

        const requestSale = await dispatch(actionAddSaleSupply(dataSaleSupply))
        if (requestSale && requestSale.status == 200) {
            //volvemos a cargar la lista de insumos de manera de que se actualice el stock visualizado
            dispatch(getListSupplies(companySelectedMenu._id))
            //limpiamos el array de con insumos elegidos para vender
            setStateDetailsSupplies([]);
            MySwal.fire({
                title: `¡Venta Agregada Correctamente!`,
                icon: "success",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(21, 151, 67)",
            }).then((result) => {
                if (result.isConfirmed) {
                    setStateDetail({
                        platformMethod: "",
                        dateSale: ""
                    });
                    setStateValueMethodPay({
                        transferencia: "",
                        tarjeta: "",
                        efectivo: ""
                    });

                    setSelectState(null);
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

    const handleChangeDate = (e) => {
        const { name, value } = e.target;
        // value aquí vendrá como "yyyy-mm-dd" al seleccionar en el calendario
        setStateDetail((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    var arrayPlataforma = ["Mercado Libre", "Instagram", "Facebook", "Tik Tok", "Local"];
    var selectPlataformaArray = [];

    if (Array.isArray(arrayPlataforma)) {
        arrayPlataforma.map((plat, i) => {
            var option = {
                value: plat,
                label: plat,
            };
            selectPlataformaArray.push(option);
        });
    }

    function handleChangePlat(e) {
        const seleccionP = e.value;

        setStateDetail({ ...stateSaleDetail, platformMethod: seleccionP });
    }

    const handleCheckChange = (type) => {
        if (type === "Efectivo") {
            setVisibleCheckE(!visibleCheckE);
        } else if (type === "Transferencia") {
            setVisibleCheckB(!visibleCheckB);
        } else if (type === "Tarjeta") {
            setVisibleCheckT(!visibleCheckT);
        }
    };

    const changeNumber = (e) => {
        const { name, value } = e.target;

        // permitir decimales (máx 2)
        if (!/^\d*\.?\d{0,2}$/.test(value)) return;

        // permitir borrar
        if (value === "") {
            setStateValueMethodPay(prev => ({
                ...prev,
                [name]: ""
            }));
            return;
        }

        const numericValue = Number(value);

        // valores actuales
        const efectivo = Number(
            name === "efectivo" ? numericValue : stateValueMethodPay.efectivo || 0
        );
        const transferencia = Number(
            name === "transferencia" ? numericValue : stateValueMethodPay.transferencia || 0
        );
        const tarjeta = Number(
            name === "tarjeta" ? numericValue : stateValueMethodPay.tarjeta || 0
        );

        const totalIngresado = efectivo + transferencia + tarjeta;

        // 🚫 no permitir superar el total de la venta
        if (totalIngresado > totalSale) return;

        setStateValueMethodPay(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validationFormSale = () => {
        if (!stateDetailsSupplies.length) return true;
        if (!stateSaleDetail.dateSale) return true;
        if (!stateSaleDetail.platformMethod) return true;
        if (!stateValueMethodPay.efectivo && !stateValueMethodPay.transferencia && !stateValueMethodPay.tarjeta) return true;
        const totalPay = Number(stateValueMethodPay.efectivo || 0) + Number(stateValueMethodPay.transferencia || 0) + Number(stateValueMethodPay.tarjeta || 0);
        if (totalPay !== totalSale) return true;
        return false;
    };

    const messsageErrorValidation = () => {
        if (!stateDetailsSupplies.length) return "No hay insumos registrados";
        if (!stateSaleDetail.dateSale) return "Seleccione una fecha de venta";
        if (!stateSaleDetail.platformMethod) return "Seleccione una plataforma de venta";
        if (!stateValueMethodPay.efectivo && !stateValueMethodPay.transferencia && !stateValueMethodPay.tarjeta) return "Ingrese al menos un método de pago";
        const totalPay = Number(stateValueMethodPay.efectivo || 0) + Number(stateValueMethodPay.transferencia || 0) + Number(stateValueMethodPay.tarjeta || 0);
        if (totalPay !== totalSale) return "La suma de los métodos de pago no coincide con el total de la venta";
        return "";
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

                        <th className="instrument-serif-regular">Cantidad</th>
                        <th className="instrument-serif-regular">$ Venta Unid</th>
                        <th className="instrument-serif-regular">$ Venta Total</th>
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

                                <td className="instrument-serif-regular">{sup.quantitySale ?? 0}</td>


                                <td className="instrument-serif-regular">{converNum(sup.priceSale)}</td>
                                <td className="instrument-serif-regular">

                                    {

                                        converNum(
                                            (sup.priceSale * (sup.quantitySale ?? 0)) - Number(sup.discount * sup.quantitySale || 0) +
                                            Number(sup.surcharge * sup.quantitySale || 0)

                                        )
                                    }
                                </td>

                                <td>

                                    <FaCheckToSlot size={"2rem"} onClick={() => openModalSaleDetails(sup)} />
                                </td>

                            </tr>))

                        }

                    </tbody>

                }
                <div className="p-2 instrument-serif-regular d-flex justify-content-end">
                    <p className="text-end fw-bold f-20  me-2">
                        Total Venta:
                    </p>
                    <p className="text-end fw-bold">
                        {converNum(totalSale)}
                    </p>

                </div>


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
                                (*) Fecha Venta
                            </Form.Label>

                            <Form.Control
                                className="instrument-serif-regular"
                                type="date"
                                name="dateSale"
                                value={stateSaleDetail.dateSale}
                                onChange={handleChangeDate}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="instrument-serif-regular">
                                (*) Detalle de Pago
                            </Form.Label>
                        </Form.Group>

                        <Form.Group>

                            <Form.Check
                                type="checkbox"
                                id="check-efectivo"
                                label="Efectivo"
                                onChange={() => handleCheckChange("Efectivo")}
                                className="mt-2 instrument-serif-regular"

                            />
                            {visibleCheckE && (
                                <>
                                    <Form.Control
                                        type="text"
                                        placeholder="Efectivo"
                                        name="efectivo"
                                        inputMode="decimal"
                                        maxLength={6}
                                        required
                                        className="mt-2 instrument-serif-regular"
                                        value={stateValueMethodPay.efectivo}
                                        onChange={
                                            // Solo permitir números y máximo 10 caracteres
                                            changeNumber
                                        }
                                    />
                                </>
                            )}

                            <Form.Check
                                type="checkbox"
                                id="check-transferencia"
                                label="Transferencia"
                                onChange={() => handleCheckChange("Transferencia")}
                                className="mt-2 instrument-serif-regular"
                            />
                            {visibleCheckB && (
                                <>
                                    <Form.Control
                                        type="text"
                                        placeholder="Transferencia"
                                        name="transferencia"
                                        maxLength={6}
                                        inputMode="decimal"
                                        required
                                        className="mt-2 instrument-serif-regular"
                                        value={stateValueMethodPay.transferencia}
                                        onChange={changeNumber}
                                    />
                                </>
                            )}

                            <Form.Check
                                type="checkbox"
                                id="check-tarjeta"
                                label="Tarjeta"
                                onChange={() => handleCheckChange("Tarjeta")}
                                className="mt-2 instrument-serif-regular"
                            />
                            {visibleCheckT && (
                                <>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tarjeta"
                                        name="tarjeta"
                                        maxLength={6}
                                        inputMode="decimal"
                                        required
                                        className="mt-2 mb-2 instrument-serif-regular"
                                        value={stateValueMethodPay.tarjeta}
                                        onChange={changeNumber}
                                    />
                                </>
                            )}
                        </Form.Group>



                        <Form.Group className="mt-2">

                            <Form.Label
                                htmlFor="tam-select"
                                className="instrument-serif-regular"
                            >
                                (*) Plataforma Venta
                            </Form.Label>
                            {/* <Form.Label>Seleccione Tamaño</Form.Label> */}
                            <Select
                                className="instrument-serif-regular"
                                inputId="tam-select"
                                inputProps={{ "data-testid": "tam-select" }}
                                placeholder="Seleccione Plataforma"
                                onChange={(e) => {
                                    handleChangePlat(e);
                                    setSelectState(e);
                                }}
                                options={selectPlataformaArray}
                                value={selectState}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <div className="text-danger msgAlertInput">(*) Valores Obligatorios</div>
                <div className="text-danger msgAlertInput">{messsageErrorValidation()}</div>
                <Modal.Footer className="mt-0 pt-3 pb-1 instrument-serif-regular">

                    <Button
                        className="w-100"
                        variant="primary"
                        type="submit"
                        onClick={() => { addSaleSupply(stateDetailsSupplies) }}
                        disabled={validationFormSale()}
                    >
                        Agregar Venta
                    </Button>

                </Modal.Footer>
            </div>
            <ModalAddSaleSupply openModal={stateOpenModalSale} setOpenModal={setStateOpenModalSale} dataModalSale={dataModalSale} stateDetailsSupplies={stateDetailsSupplies} setStateDetailsSupplies={setStateDetailsSupplies} />
        </div>
    )
}

export default TableSuppliesSaleDetails;


