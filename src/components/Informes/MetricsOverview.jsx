import { motion } from "framer-motion";
import { actionGrandCapitalSupply } from "../../reducer/actions/supply/actionsSupply"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import convertNum from "../../functions/convertNum"
import { actionBestSelling } from "../../reducer/actions/salesSupply/actionSalesSupply"

  // const metrics = [
  //   {
  //     id: "stock",
  //     label: "Capital en Stock",
  //     value: "$1.000.000",
  //     icon: Package,
  //     accent: "text-foreground",
  //   },
  //   {
  //     id: "gross",
  //     label: "Ganancia Bruta",
  //     value: "$500.000",
  //     icon: TrendingUp,
  //     accent: "text-foreground",
  //   },
  //   {
  //     id: "sales",
  //     label: "Total Ventas",
  //     value: "$325.000",
  //     icon: DollarSign,
  //     accent: "text-foreground",
  //   },
  // ];

export default function MetricsOverview() {

  const dispatch = useDispatch()

  const capitalStock = useSelector((state) => state.supply.capitalStock)
 // const lessSellingStock = useSelector((state) => state.supply.lessSellingStock)
 
 //actionBestSelling actions
  const bestSellingStock = useSelector((state) => state.salesSupply.listBestSelling)

  const companySelectedMenu = useSelector((state) => state.company.companySelected);

  useEffect(() => {
    if (companySelectedMenu) {
      dispatch(actionGrandCapitalSupply(companySelectedMenu._id))
      dispatch(actionBestSelling(companySelectedMenu._id))
    }
  }, [companySelectedMenu])


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

            <motion.div
    
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay:"0.1" }}
              className="group relative bg-card border border-border p-7 overflow-hidden hover:border-foreground/40 transition-colors duration-300"
            >
              {/* Glow sutil en hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-foreground/[0.03] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col gap-6">
                {/* Header con icono */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                    Capital en Stock
                  </span>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center bg-black group-hover:text-background transition-colors duration-300">
                    {/* <Icon className="w-8 h-8" text-white /> */}
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

                    <div className="relative z-10 flex flex-col gap-6">
                {/* Header con icono */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                    Mejor Venta
                  </span>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center bg-black group-hover:text-background transition-colors duration-300">
                    {/* <Icon className="w-8 h-8" text-white /> */}
                  </div>
                </div>

                {/* Valor destacado */}
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
                    {bestSellingStock && bestSellingStock.length > 0 ? convertNum(bestSellingStock[0].totalQuantitySold) : 0}
                  </p>
                   <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
                    {bestSellingStock && bestSellingStock.length > 0 ? bestSellingStock[0].nameSupply : 0}
                  </p>
                  <div className="w-8 h-px bg-border mt-4 group-hover:bg-foreground/40 transition-colors duration-300" />
                </div>
              </div>

            </motion.div>
        
      </div>
    </section>
  );
}