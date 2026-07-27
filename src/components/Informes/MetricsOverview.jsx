import { motion } from "framer-motion";


export default function MetricsOverview({ metrics = metrics }) {
  return (
    <section className="w-full">
      <div className="mb-8">
        <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-2">
          Resumen financiero
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          Métricas del negocio
        </h2>
        <div className="w-10 h-0.5 bg-foreground mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-card border border-border p-7 overflow-hidden hover:border-foreground/40 transition-colors duration-300"
            >
              {/* Glow sutil en hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-foreground/[0.03] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col gap-6">
                {/* Header con icono */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                    {m.label}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center bg-black group-hover:text-background transition-colors duration-300">
                    <Icon className="w-8 h-8" text-white/>
                  </div>
                </div>

                {/* Valor destacado */}
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
                    {m.value}
                  </p>
                  <div className="w-8 h-px bg-border mt-4 group-hover:bg-foreground/40 transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}