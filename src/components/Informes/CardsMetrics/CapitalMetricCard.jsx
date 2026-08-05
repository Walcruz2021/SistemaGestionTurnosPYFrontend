
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import convertNum from "../../../functions/convertNum";

/**
 * Tarjeta de capital en stock.
 * Recibe capitalStock (number) con la misma estructura que en la lógica original.
 */
export default function CapitalMetricCard({ capitalStock = 0, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-card border border-border p-6 sm:p-7 overflow-hidden hover:border-foreground/30 transition-colors duration-300"
    >
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-foreground/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
            Capital en Stock
          </span>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center group-hover:text-background transition-all duration-300">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Valor destacado */}
        <div>
          <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
            {capitalStock ? convertNum(capitalStock) : 0}
          </p>
          <div className="w-8 h-px bg-border mt-4 group-hover:bg-foreground/40 transition-colors duration-300" />
        </div>
      </div>
    </motion.div>
  );
}