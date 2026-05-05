import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Lock, ArrowDownCircle, GitBranch } from "lucide-react";

const TABS = [
  {
    id: "variables",
    label: "Gastos Variables",
    shortLabel: "Variables",
    icon: TrendingDown,
    description: "Fluctúan según la actividad",
    color: "text-gray-300",
  },
  {
    id: "fijos",
    label: "Gastos Fijos",
    shortLabel: "Fijos",
    icon: Lock,
    description: "Monto constante mensual",
    color: "text-gray-300",
  },
  {
    id: "directos",
    label: "Gastos Directos",
    shortLabel: "Directos",
    icon: ArrowDownCircle,
    description: "Vinculados al producto/servicio",
    color: "text-gray-300",
  },
  {
    id: "indirectos",
    label: "Gastos Indirectos",
    shortLabel: "Indirectos",
    icon: GitBranch,
    description: "Apoyo general a la operación",
    color: "text-gray-300",
  },
];

export default function GastosTabs({ activeTab, onChange }) {
  return (
    <div className="w-full">
      {/* Desktop tabs */}
      <div className="hidden sm:grid grid-cols-4 border border-gray-200 bg-white shadow-sm">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative group flex flex-col items-center justify-center gap-2 px-4 py-5 transition-colors duration-200 border-r last:border-r-0 border-gray-200 focus:outline-none
                ${isActive ? "bg-black" : "bg-white hover:bg-gray-50"}`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}

              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-700"}`}
                strokeWidth={1.5}
              />
              <div className="text-center">
                <p className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900"}`}>
                  {tab.label}
                </p>
                <p className={`text-[11px] mt-0.5 transition-colors duration-200 ${isActive ? "text-gray-400" : "text-gray-400"}`}>
                  {tab.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile tabs — 2x2 grid */}
      <div className="grid grid-cols-2 sm:hidden border border-gray-200 bg-white shadow-sm">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative flex items-center gap-3 px-4 py-4 transition-colors duration-200 border-r border-b last:border-b-0 border-gray-200 focus:outline-none
                [&:nth-child(2)]:border-r-0
                [&:nth-child(3)]:border-b-0
                [&:nth-child(4)]:border-r-0 [&:nth-child(4)]:border-b-0
                ${isActive ? "bg-black" : "bg-white hover:bg-gray-50"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBarMobile"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-400"}`}
                strokeWidth={1.5}
              />
              <span className={`text-xs font-semibold tracking-tight transition-colors duration-200 ${isActive ? "text-white" : "text-gray-700"}`}>
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active label strip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 px-1 pt-4 pb-1"
        >
          <div className="w-1 h-4 bg-black rounded-full" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500">
            {TABS.find((t) => t.id === activeTab)?.label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}