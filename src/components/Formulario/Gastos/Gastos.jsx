import { Reac, useState } from "react";
import FormGastosVar from "./FormGastosVar";
import FormGastosInd from "./FormGastosInd";
import FormGastosDir from "./FormGastosDir";
import Button from "react-bootstrap/Button";
import FormGastosFij from "./FormGastosFij";
import gasto from "../../../icons/gastos.png";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import GastosTabs from "./GastosTab";
const Gastos = () => {

  const CONTENT = {
    variables: {
      title: "Gastos Variables",
      subtitle: "Registrá gastos que cambian según el volumen de actividad del negocio.",
    },
    fijos: {
      title: "Gastos Fijos",
      subtitle: "Registrá gastos de monto constante que se repiten todos los meses.",
    },
    directos: {
      title: "Gastos Directos",
      subtitle: "Registrá gastos vinculados directamente a la producción o prestación del servicio.",
    },
    indirectos: {
      title: "Gastos Indirectos",
      subtitle: "Registrá gastos de soporte general que no se asignan directamente al servicio.",
    },
  };

  const [activeTab, setActiveTab] = useState("variables");
  const current = CONTENT[activeTab];

  const [stateActiveGDir, stateSetActiveGDir] = useState(true);
  const [stateActiveGInd, stateSetActiveGInd] = useState(false);
  const [stateActiveGVar, stateSetActiveGVar] = useState(false);
  const [stateActiveGFij, stateSetActiveGFij] = useState(false);

  const activeGVar = () => {
    stateSetActiveGVar(true);
    stateSetActiveGFij(false);
    stateSetActiveGDir(false);
    stateSetActiveGInd(false);
  };

  const activeGFij = () => {
    stateSetActiveGVar(false);
    stateSetActiveGFij(true);
    stateSetActiveGDir(false);
    stateSetActiveGInd(false);
  };

  const activeGDir = () => {
    stateSetActiveGVar(false);
    stateSetActiveGFij(false);
    stateSetActiveGDir(true);
    stateSetActiveGInd(false);
  };

  const activeGInd = () => {
    stateSetActiveGVar(false);
    stateSetActiveGFij(false);
    stateSetActiveGDir(false);
    stateSetActiveGInd(true);
  };

  return (
    
      <div className="min-h-screen bg-gray-50">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200 px-6 sm:px-10 py-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-gray-400 mb-1">
              Gestión financiera
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Registro de Gastos
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-8">

          {/* Tabs */}
          <GastosTabs activeTab={activeTab} onChange={setActiveTab} />

          {/* Tab content placeholder */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-6 bg-white border border-gray-200 p-8"
            >
              <h2 className="text-lg font-black text-gray-900 tracking-tight mb-1">
                {current.title}
              </h2>
              <p className="text-gray-500 text-sm font-light">{current.subtitle}</p>

              {/* Formulario placeholder */}
              <div className="mt-8 border-2 border-dashed border-gray-200 rounded-sm text-center">
                <p className="text-gray-400 text-sm tracking-wide mt-3">
                  Formulario de carga · <span className="font-semibold text-gray-600">{current.title}</span>

                  {current.title==="Gastos Directos" ? (
                    <FormGastosDir />
                  ) : current.title==="Gastos Indirectos" ? (
                    <FormGastosInd />
                  ) : current.title==="Gastos Variables" ? (
                    <FormGastosVar />
                  ) : (
                    <FormGastosFij />
                  )}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

    
  );
};

export default Gastos;
