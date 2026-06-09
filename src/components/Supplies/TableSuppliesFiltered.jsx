import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { CalendarPlus, Boxes, CheckSquare } from "lucide-react";
import TableStockBatch from "../StockBatch/TableStockBatch";
import ModalPriceSupply from "../Modal/Supply/ModalPriceSupply";
import BlockAddVariant from "../Formulario/Supply/BlockAddVariant"
import { FaBasketShopping } from "react-icons/fa6";
import { Plus, Trash2 } from "lucide-react";
/**
 * Table of supplies grals. a supply is selected of this collections, and then add variant.
 * @param {*} stateListSuppliesGral collection array supplies grles
 * @returns 
 */

const TableSupplyVariants = ({
    stateListSuppliesGral,
    stateInput,
    setStateInput
}) => {


    const [stateSupplySelected, setStateSupplySelected] = useState({
        idSupply: "",
            peso:"",
            unidad:"",
            sabor:"",
            talle:"",
            color:"",
            name:""
    });

  
    const listBrands = useSelector((state) => state.gralRed.listBrands)
    const [stateIdCompanySupply, setStateIdCompanySupply] = useState(null);
    const [modalOpenEditSupply, setModalOpenEditSupply] = useState(false);
    const [showContableProd, setShowContableProd] = useState(1);


    const handleSelectVariant = (item) => {


        setStateSupplySelected({ ...stateSupplySelected, idSupply: item._id });

    };



    const addBlockVariant = (e) => {
        e.preventDefault()
        const newBlock =
        {
            idSupply: ""
        }
        setStateInput((prev) => ({
            ...prev,
            detailsSupply: [...prev.detailsSupply, newBlock]
        }));
        setShowContableProd(showContableProd + 1)
    }

    const deleteBlockVariant = (e) => {
        e.preventDefault()
        setStateInput((prev) => ({
            ...prev,
            detailsSupply: prev.detailsSupply.slice(0, -1)
        }));

        setShowContableProd(showContableProd - 1);
    };

    const SectionDivider = ({ children }) => (
        <div className="flex items-center gap-3 mt-10 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                {children}
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>
    );

    const validationAccountant = () => {
        if (stateInput.date && stateInput.montoN && stateInput.nameSupplier && stateInput.NInvoice
        ) {
            return false
        } else return true
    }



    return (

        <div>

            {/* CARD TITLE */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-white border border-zinc-200 rounded-2xl overflow-hidden mb-3"
            >

                <div className="px-6 py-2 border-b border-zinc-100 flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
                            Insumo
                        </h2>

                        {
                            stateListSuppliesGral?.length > 0 ?
                                <p className="text-zinc-500 text-sm mt-0.5">
                                    Seleccione un insumo
                                </p> : <p className="text-zinc-500 text-sm mt-0.5">
                                    NO HAY DATOS
                                </p>
                        }

                    </div>

                    <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center">

                        <CalendarPlus className="w-4 h-4 text-white" />

                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-zinc-200 bg-zinc-50">

                                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                                    <CheckSquare className="scale-90" />
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                                    Nombre
                                </th>



                            </tr>

                        </thead>

                        <tbody>

                            {stateListSuppliesGral?.map((item) => (

                                <tr
                                    key={item._id}
                                    className={`border-b border-zinc-100 transition
                                    ${stateSupplySelected.idSupply === item._id
                                            ? "bg-zinc-100"
                                            : "hover:bg-zinc-50"
                                        }`}
                                >

                                    <td className="px-4 py-3">

                                        <input
                                            type="checkbox"
                                            name="variant"
                                            checked={stateSupplySelected.idSupply === item._id}
                                            className="scale-150"
                                            onChange={() =>
                                                handleSelectVariant(item)
                                            }
                                        />

                                    </td>

                                    <td className="px-4 py-3 text-zinc-600">

                                        {item.nameSupply}

                                    </td>


                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </motion.div>

            {/* this code will use for array BlockAddVariant */}

{stateSupplySelected && stateSupplySelected.idSupply &&

            <BlockAddVariant
                stateSupplySelected={stateSupplySelected}
                setStateSupplySelected={setStateSupplySelected}

            />
}


        </div>


    );
};

export default TableSupplyVariants;

    //  {
    //             stateSupplySelected &&

    //             Array.from({ length: showContableProd }).map((_, index) => (

    //                 <div>

    //                     <div className="mb-3 border-top border-2">
    //                         <div className="d-flex align-items-center gap-2 instrument-serif-regular  ml-5">
    //                             <FaBasketShopping size={25} />
    //                             <SectionDivider>Variante {index + 1} </SectionDivider>
    //                         </div>

    //                     </div>

    //                     <div key={index}>

    //                         <BlockAddVariant

    //                             index={index}
    //                             stateInput={stateInput}
    //                             setStateInput={setStateInput}

    //                         />
    //                     </div>


    //                     {/* =============================== */}
    //                     {/*       BOTÓN OCULTAR/VER         */}
    //                     {/* =============================== */}
    //                     <div className="pt-3 flex flex-wrap gap-3">

    //                         {showContableProd < 10 && (
    //                             <motion.button
    //                                 whileHover={{ y: -1 }}
    //                                 whileTap={{ scale: 0.97 }}
    //                                 onClick={(e) => addBlockVariant(e)}
    //                                 className="
    //             inline-flex items-center gap-2
    //             px-4 py-2.5
    //             rounded-xl
    //             bg-zinc-900
    //             hover:bg-black
    //             text-zinc-100
    //             text-xs font-medium
    //             border border-zinc-800
    //             transition-all duration-200
    //         "
    //                             >

    //                                 <div className="
    //             w-7 h-7 rounded-lg
    //             bg-zinc-800
    //             flex items-center justify-center
    //         ">
    //                                     <Plus size={16} />
    //                                 </div>

    //                                 <span>
    //                                     Agregar Variante
    //                                 </span>

    //                             </motion.button>
    //                         )}

    //                         {showContableProd > 1 && (
    //                             <motion.button
    //                                 whileHover={{ y: -1 }}
    //                                 whileTap={{ scale: 0.97 }}
    //                                 onClick={(e) => deleteBlockVariant(e)}
    //                                 className="
    //             inline-flex items-center gap-2
    //             px-4 py-2.5
    //             rounded-xl
    //             bg-white dark:bg-zinc-900
    //             hover:bg-zinc-100 dark:hover:bg-zinc-800
    //             text-zinc-700 dark:text-zinc-200
    //             text-xs font-medium
    //             border border-zinc-200 dark:border-zinc-800
    //             transition-all duration-200
    //         "
    //                             >

    //                                 <div className="
    //             w-7 h-7 rounded-lg
    //             bg-zinc-100 dark:bg-zinc-800
    //             flex items-center justify-center
    //         ">
    //                                     <Trash2 size={15} />
    //                                 </div>

    //                                 <span>
    //                                     Eliminar Variante
    //                                 </span>

    //                             </motion.button>
    //                         )}

    //                     </div>

    //                     < Modal.Footer >

    //                         < Button variant="primary" onClick={() => handleSubmit(stateInput)} listBrands={listBrands} disabled={validationAccountant() || validationBuySupply()}>
    //                             Guardar Variantes
    //                         </Button>


    //                     </Modal.Footer >

    //                 </div>


    //             ))
                
    //         }