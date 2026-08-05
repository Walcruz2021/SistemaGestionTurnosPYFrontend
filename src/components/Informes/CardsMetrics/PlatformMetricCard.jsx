import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

/**
 * Tarjeta de ventas por plataforma.
 * Recibe el array salesByPlatform con la misma estructura que en la lógica original.
 */
export default function PlatformMetricCard({ salesByPlatform = [], delay = 0 }) {
  const hasData = salesByPlatform && salesByPlatform.length > 0;
  const maxSales = hasData
    ? Math.max(...salesByPlatform.map((p) => p.totalSales || 0))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-card border border-border p-6 sm:p-7 overflow-hidden hover:border-foreground/30 transition-colors duration-300 sm:col-span-2 lg:col-span-3"
    >
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-foreground/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
            Ventas por Plataforma
          </span>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center group-hover:text-background transition-all duration-300">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Lista de plataformas */}
        {hasData ? (
          <div className="space-y-4">
            {salesByPlatform.map((platform, i) => {
              const pct = maxSales > 0 ? ((platform.totalSales || 0) / maxSales) * 100 : 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: delay + 0.1 + i * 0.08 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-foreground tracking-tight">
                      {platform.platform}
                    </span>
                    <span className="text-sm font-black text-foreground tabular-nums">
                      {platform.totalSales}
                      <span className="text-xs font-medium text-muted-foreground tracking-normal ml-1.5">
                        productos
                      </span>
                    </span>
                  </div>
                  {/* Barra de progreso */}
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: delay + 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-black/80 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-1">
              <ShoppingBag className="w-5 h-5 text-muted-foreground/50" />
            </div>
            <p className="text-xs text-muted-foreground tracking-wide">
              Sin datos disponibles
            </p>
          </div>
        )}

        <div className="w-8 h-px bg-border mt-5 group-hover:bg-foreground/30 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}