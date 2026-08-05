import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import convertNum from "../../../functions/convertNum";

/**
 * Tarjeta de métrica para producto más/menos vendido.
 * Recibe los mismos datos que en la lógica original.
 */
export default function ProductMetricCard({
  label,
  data,
  variant = "best", // "best" | "less"
  delay = 0,
}) {
  const isBest = variant === "best";
  const Icon = isBest ? TrendingUp : TrendingDown;
  const accent = isBest ? "emerald" : "amber";
  const hasData = data && data.length > 0;
  const item = hasData ? data[0] : null;

  const accentRing = isBest
    ? "group-hover:border-emerald-500/30"
    : "group-hover:border-amber-500/30";
  const accentGlow = isBest
    ? "bg-emerald-500/[0.04]"
    : "bg-amber-500/[0.04]";
  const iconBg = isBest
    ? "bg-emerald-500/10 text-emerald-400"
    : "bg-amber-500/10 text-amber-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`group relative bg-card border border-border p-6 sm:p-7 overflow-hidden hover:border-foreground/30 transition-all duration-300 ${accentRing}`}
    >
      <div
        className={`absolute -top-16 -right-16 w-40 h-40 rounded-full ${accentGlow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
            {label}
          </span>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${iconBg}`}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* Producto */}
        {hasData ? (
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Imagen */}
            <div className="relative shrink-0">
              <div
                className={`absolute inset-0 rounded-2xl ${accentGlow} blur-md`}
              />
              <img
                src={item?.supply?.imgStore || ""}
                alt={item?.nameSupply || ""}
                className="relative w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-border grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-base sm:text-lg font-black text-foreground tracking-tight leading-snug truncate">
                {item?.nameSupply || "—"}
              </p>
              <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight tabular-nums mt-1">
                {item?.totalQuantitySold != null ? item.totalQuantitySold : 0}
                <span className="text-xs font-medium text-muted-foreground tracking-normal ml-1.5">
                  unidades
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <div
              className={`w-12 h-12 rounded-full ${accentGlow} flex items-center justify-center mb-1`}
            >
              <Icon className="w-5 h-5 text-muted-foreground/50" />
            </div>
            <p className="text-xs text-muted-foreground tracking-wide">
              Sin datos disponibles
            </p>
          </div>
        )}

        {/* Stats footer */}
        {hasData && (
          <div className="mt-6 pt-5 border-t border-border grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-1">
                Total vendido
              </p>
              <p className="text-sm font-bold text-foreground tabular-nums">
                {item?.totalSale != null ? convertNum(item.totalSale) : 0}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-1">
                Ganancia
              </p>
              <p
                className={`text-sm font-bold tabular-nums ${
                  isBest ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {item?.totalProfit != null ? convertNum(item.totalProfit) : 0}
              </p>
            </div>
          </div>
        )}

        <div className="w-8 h-px bg-border mt-5 group-hover:bg-foreground/30 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}