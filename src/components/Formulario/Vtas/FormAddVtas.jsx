import React from 'react';
import ModalAddSupply from '../../Modal/Supply/ModalAddSuppply';
import ModalAddSupplier from '../../Modal/Suppier/ModalAddSupplier';
import addSupplyIcon from "../../../icons/supply2.png"
import addSupplierIcon from "../../../icons/supplier.png"
import { useState, useEffect } from "react";
import TableSuppliesSale from '../../Supplies/TableSuppliesSale';
const FormAddVtas = () => {

    const [openModalSupply, setOpenModalSupply] = useState(false);
    const [openModalSupplier, setOpenModalSupplier] = useState(false);
    const [stateNewFicha, setStateNewFicha] = useState(null);


    const addSupplyFunction = () => {

        setOpenModalSupply(!openModalSupply);

    };

    const addSupplierFunction = () => {

        setOpenModalSupplier(!openModalSupplier);

    };


    return (
        <div>
            <div className="titGral">
                <h1>LISTADO DE INSUMOS PARA VENTAS</h1>
            </div>
            <div className="col-6 col-md-4 d-flex justify-content-center mb-1">
                <div className="text-center">
                    {/* <div className="card-body">
                        <button className="btn btn-link">
                            <img src={addSupplyIcon} onClick={addSupplyFunction} />
                        </button>

                    </div> */}
                </div>

                <div className="text-center">
                    <div className="card-body">
                        <button className="btn btn-link">
                            <img src={addSupplierIcon} onClick={addSupplierFunction} />
                        </button>

                    </div>
                </div>
            </div>
            <div className="container-fluid table-responsive">

                <TableSuppliesSale />
                <ModalAddSupply
                    openModal={openModalSupply}
                    setOpenModal={setOpenModalSupply}
                />

                <ModalAddSupplier
                    openModal={openModalSupplier}
                    setOpenModal={setOpenModalSupplier}
                />

            </div>
            {/* Aquí puedes agregar la lógica para mostrar la lista de insumos */}
        </div>
    );
};

export default FormAddVtas;
