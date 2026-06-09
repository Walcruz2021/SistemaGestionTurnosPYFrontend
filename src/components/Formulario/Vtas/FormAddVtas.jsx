import React from 'react';
import ModalAddSupplyGral from '../../Modal/Supply/ModalAddSupplyGral';
import ModalAddSupplier from '../../Modal/Suppier/ModalAddSupplier';
import addSupplyIcon from "../../../icons/supply2.png"
import addSupplierIcon from "../../../icons/supplier.png"
import { useState, useEffect } from "react";
import TableSuppliesSale from '../../Supplies/TableSuppliesSale';
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

const FormAddVtas = () => {

    const [openModalSupply, setOpenModalSupply] = useState(false);

    const [stateNewFicha, setStateNewFicha] = useState(null);
    const [openModalSupplier, setOpenModalSupplier] = useState(false);

    const ACTION_CARDS = [

        // {
        //     id: "supply",
        //     label: "Insumo",
        //     sub: "Agregar insumo",
        //     icon: Boxes,
        //     action: () => setOpenModalSupply(!openModalSupply),
        //     type: "button",

        // },

        {
            id: "supplier",
            label: "Proveedor",
            sub: "Agregar proveedor",
            icon: UserPlus,
            action: () => setOpenModalSupplier(!openModalSupplier),
            type: "button",
        },

    ];



    return (
        <div>


            <div className="not-bootstrap">

                <div className="px-1 md:px-8 pt-4 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-3"
                    >

                        <div className="px-6 py-2 border-b border-zinc-100 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                                    Ventas
                                </h2>

                                <p className="text-zinc-400 text-sm mt-0.5">
                                    Listado de insumos para venta
                                </p>

                            </div>

                            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                                <CalendarPlus className="w-4 h-4 text-white" />

                            </div>

                        </div>
                    </motion.div>

                    <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-4">
                        Acciones rápidas
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-2">

                        {ACTION_CARDS
                            .filter((card) => !card.hidden)
                            .map((card, i) => {

                                const Icon = card.icon;

                                const content = (
                                    <motion.div
                                        custom={i}
                                        // variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="
              relative
              overflow-hidden
              group
              bg-gray
              hover:bg-black
              border
              border-zinc-200
              hover:border-black
              rounded-2xl

              h-[140px]
              min-h-[140px]

              p-4
              cursor-pointer
              transition-all
              duration-300
              hover:shadow-2xl

              flex
              flex-col
              justify-between
            "
                                    >

                                        {/* CONTENIDO */}
                                        <div className="relative z-10 flex flex-col h-full">

                                            {/* ICON */}
                                            <div className="w-9 h-9 rounded-xl  group-hover:bg-white/10 flex items-center justify-center mb-3 transition-colors duration-300">

                                                <Icon
                                                    className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors duration-300"
                                                    strokeWidth={1.8}
                                                />

                                            </div>

                                            {/* TITULO */}
                                            <div>

                                                <h3 className="text-zinc-900 group-hover:text-white font-semibold text-sm transition-colors duration-300">
                                                    {card.label}
                                                </h3>

                                                <p className="text-zinc-500 group-hover:text-zinc-300 text-[11px] leading-tight mt-1 transition-colors duration-300 no-underline">
                                                    {card.sub}
                                                </p>

                                            </div>

                                            {/* FLECHA */}
                                            <div className="flex justify-end mt-auto">

                                                <ChevronRight
                                                    className="
                    w-4
                    h-4
                    text-zinc-300
                    group-hover:text-white
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                  "
                                                />

                                            </div>

                                        </div>

                                    </motion.div>
                                );

                                if (card.type === "link") {
                                    return (
                                        <Link
                                            key={card.id}
                                            to={card.action}
                                            className="block w-full no-underline"
                                            style={{ textDecoration: "none" }}
                                        >
                                            {content}
                                        </Link>
                                    );
                                }

                                return (
                                    <button
                                        key={card.id}
                                        onClick={card.action}
                                        className="w-full text-left bg-transparent border-0"
                                    >
                                        {content}
                                    </button>
                                );
                            })}
                    </div>
                </div>
            </div>


            <div className="px-1 md:px-8 pt-1 max-w-7xl mx-auto">


                <TableSuppliesSale />
                <ModalAddSupplyGral
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
