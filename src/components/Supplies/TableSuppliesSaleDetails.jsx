
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

const TableSuppliesSaleDetails = ({ dataSupplySeleted }) => {

    const [stateOpenModalSale, setStateOpenModalSale] = useState(false);
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal);
    //estado que manejara el array de los insumos a vender que se seleccionaron
    const [stateDetailsSupplies, setStateDetailsSupplies] = useState([]);

    console.log(stateDetailsSupplies)
    const [stateSaleDetail, setStateDetail] = useState({
        dateSale: "",
        platformMethod: ""
    })


    const [dataModalSale, setDataModalSale] = useState(null);
    const companySelectedMenu = useSelector((state) => state.company.companySelected);

    useEffect(() => {

        //dataSUpplySelected es el insumo que se eligio de la lista,se actualizara en la lista setStateDetailsSupplies si es que no hay otro elegido
        //esto lo determina el exists
        if (dataSupplySeleted) {
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



    const openModalSaleDetails = (supply) => {
        setStateOpenModalSale(true);
        setDataModalSale(supply)
    }

    const addSaleSupply = (detailsSupplies) => {


        const listPrevArray = detailsSupplies.map(sup => {
            //ellimino todos los campos que no utilizares para cumplir con el formato del backend
            const { _id, global, idCompany, idGlobalSupply, priceSale, totalStock, ...newArray } = sup;
            return newArray;
        });

        const listItemsSupplies = listPrevArray.map(sup => {
            if (sup.batches.length > 0) {
                const idCompanySupply = sup.batches[0].idCompanySupply;
                const itemArrayPrev = { ...sup, idCompanySupply }
                const { batches, ...itemArraySale } = itemArrayPrev;
                return itemArraySale
            }
        });


        const dataSaleSupply = {
            idCompany: companySelectedMenu._id,
            date: stateSaleDetail.dateSale,
            paymentMethod: "Efectivo",
            platformMethod: stateSaleDetail.platformMethod,
            items: listItemsSupplies
        }

        MySwal.fire({
            title: `¡Venta Agregada Correctamente!`,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "rgb(21, 151, 67)",
        }).then((result) => {
            if (result.isConfirmed) {
                setStateDetail({
                    platformMethod: ""
                });
                dispatch(actionAddSaleSupply(dataSaleSupply))

            }
        });


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

    return (
        <>

            <table className="table table-bordered table-hover table-white mt-3">
                <thead className="table-secondary">
                    <tr>
                        <th>
                            Insumo{" "}
                            {/* <FontAwesomeIcon
                                onClick={handleOrder}
                                icon={faSortAlphaDown}
                                style={{ cursor: "pointer" }}
                                color={order ? "#FF846A" : "#A2DFFF"}
                            /> */}
                        </th>

                        <th>$ Venta Unid</th>
                        <th>Cantidad</th>
                        <th>$ Venta Total</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>

                    {stateDetailsSupplies && stateDetailsSupplies.map((sup) => (
                        <tr>
                            <td
                                style={{ cursor: "pointer" }}
                            // onClick={(e) =>
                            //     handleDetailsSupplies(e, { sup })
                            // }
                            >
                                {sup.global?.nameSupply}
                            </td>
                            <td>{converNum(sup.priceSale)}</td>

                            <td>{sup.quantitySale ?? 0}</td>
                            {converNum(
                                (sup.priceSale * (sup.quantitySale ?? 0)) -
                                Number(sup.discount || 0) +
                                Number(sup.surcharge || 0)
                            )}                            <td>

                                <FaCheckToSlot size={"2rem"} onClick={() => openModalSaleDetails(sup)} />
                            </td>

                        </tr>))}
                </tbody>
            </table>


            <div style={{
                maxWidth: "400px", // Limita el ancho para que no sea gigante
                margin: "0 auto",  // Centra el div horizontalmente
                width: "100%"      // Asegura que responda en móviles
            }}
            >
                <Modal.Body className="pt-1 pb-1">

                    <Form>

                        <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label className="instrument-serif-regular">
                                Fecha Venta
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
                                }}
                                options={selectPlataformaArray}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="mt-0 pt-1 pb-1 instrument-serif-regular">

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={() => { addSaleSupply(stateDetailsSupplies) }}
                        disabled={!stateDetailsSupplies.length || !stateSaleDetail.dateSale || !stateSaleDetail.platformMethod}
                    >
                        Agregar Venta
                    </Button>

                </Modal.Footer>
            </div>
            <ModalAddSaleSupply openModal={stateOpenModalSale} setOpenModal={setStateOpenModalSale} dataModalSale={dataModalSale} stateDetailsSupplies={stateDetailsSupplies} setStateDetailsSupplies={setStateDetailsSupplies} />
        </>
    )
}

export default TableSuppliesSaleDetails;


