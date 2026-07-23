import React from 'react';
import ModalAddSupplyGral from '../Formulario/Supply/FormAddSupplyGral';
import ModalAddSupplier from '../Modal/Suppier/ModalAddSupplier';
import addSupplyIcon from "../../icons/supply2.png"
import addSupplierIcon from "../../icons/supplier.png"
import { useState, useEffect } from "react";
import TableSupplies from './TableSupplies';
import {
    ShoppingCart,
    UserPlus,
    Users,
    PawPrint,
    CalendarPlus,
    TrendingUp,
    Dog,
    Scale,
    User,
    FileText,
    ArrowUpDown,
    ChevronRight,
    Boxes,
    ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const Supplies = () => {

    const [stateNewFicha, setStateNewFicha] = useState(null);


    return (
        <div>


            <div className="container-fluid table-responsive">



                <TableSupplies />
            

            </div>
            {/* Aquí puedes agregar la lógica para mostrar la lista de insumos */}
        </div>
    );
};

export default Supplies;
