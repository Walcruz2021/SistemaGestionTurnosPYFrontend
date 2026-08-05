import { motion } from "framer-motion";
import { actionGrandCapitalSupply } from "../../reducer/actions/supply/actionsSupply"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import convertNum from "../../functions/convertNum"
import { actionBestSelling, actionLessSelling, actionSalesByPlatform } from "../../reducer/actions/salesSupply/actionSalesSupply"
import ProductMetricCard from "./CardsMetrics/ProductMetricCard.jsx"
import CapitalMetricCard from "./CardsMetrics/CapitalMetricCard.jsx"
import PlatformMetricCard from "./CardsMetrics/PlatformMetricCard.jsx"


export default function MetricsOverview() {

  const dispatch = useDispatch()

  const capitalStock = useSelector((state) => state.supply.capitalStock)

  //actionLessSelling actions
  const lessSellingStock = useSelector((state) => state.salesSupply.listLessSelling)


  //actionBestSelling actions
  const bestSellingStock = useSelector((state) => state.salesSupply.listBestSelling)

  //actionSalesByPlatform actions
  const salesByPlatform = useSelector((state) => state.salesSupply.listSalesByPlatform)


  const companySelectedMenu = useSelector((state) => state.company.companySelected);

  useEffect(() => {
    if (companySelectedMenu) {
      dispatch(actionGrandCapitalSupply(companySelectedMenu._id))
      dispatch(actionBestSelling(companySelectedMenu._id))
      dispatch(actionLessSelling(companySelectedMenu._id))
      dispatch(actionSalesByPlatform(companySelectedMenu._id))
    }
  }, [companySelectedMenu])


  return (
    // <section className="w-full">
    //   <div className="mb-8">
    //     <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-2">
    //       Resumen financiero
    //     </p>
    //     <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
    //       Métricas del negocio
    //     </h2>
    //     <div className="w-10 h-0.5 bg-foreground mt-4" />
    //   </div>

    // <ProductMetricCard
    //       label="Producto Más Vendido"
    //       data={bestSellingStock}
    //       variant="best"
    //       delay={0.2}
    //     />
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

    //     <motion.div

    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5, delay: "0.1" }}
    //       className="group relative bg-card border border-border p-7 overflow-hidden hover:border-foreground/40 transition-colors duration-300"
    //     >
    //       {/* Glow sutil en hover */}
    //       <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-foreground/[0.03] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    //       <div className="relative z-10 flex flex-col gap-6">
    //         {/* Header con icono */}
    //         <div className="flex items-center justify-between">
    //           <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
    //             Capital en Stock
    //           </span>
    //           <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center bg-black group-hover:text-background transition-colors duration-300">
    //             {/* <Icon className="w-8 h-8" text-white /> */}
    //           </div>
    //         </div>

    //         {/* Valor destacado */}
    //         <div>
    //           <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //             {capitalStock ? convertNum(capitalStock) : 0}
    //           </p>
    //           <div className="w-8 h-px bg-border mt-4 group-hover:bg-foreground/40 transition-colors duration-300" />
    //         </div>
    //       </div>

    //       <div className="relative z-10 flex flex-col gap-6">
    //         {/* Header con icono */}
    //         <div className="flex items-center justify-between">
    //           <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
    //             Producto Mas Vendido
    //           </span>
    //           <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center bg-black group-hover:text-background transition-colors duration-300">
    //             {/* <Icon className="w-8 h-8" text-white /> */}
    //           </div>
    //         </div>

    //         {/* Valor destacado */}
    //         <div>
    //           <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //             {bestSellingStock && bestSellingStock.length > 0 ? convertNum(bestSellingStock[0].totalQuantitySold) : 0}
    //           </p>
    //           <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //             {bestSellingStock && bestSellingStock.length > 0 ? bestSellingStock[0].nameSupply : 0}
    //           </p>
    //           <img src={bestSellingStock && bestSellingStock.length > 0 ? bestSellingStock[0]?.supply?.imgStore : ""} alt={bestSellingStock && bestSellingStock.length > 0 ? bestSellingStock[0].nameSupply : ""} className="w-40 h-40 object-cover rounded-full mt-2" />
    //           <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
    //             Total $ vendido: {bestSellingStock && bestSellingStock.length > 0 ? convertNum(bestSellingStock[0].totalSale) : 0}
    //           </span>
    //           <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
    //             Total $ ganancia: {bestSellingStock && bestSellingStock.length > 0 ? convertNum(bestSellingStock[0].totalProfit) : 0}
    //           </span>
    //           <div className="w-8 h-px bg-border mt-4 group-hover:bg-foreground/40 transition-colors duration-300" />
    //         </div>
    //       </div>

    //       <div className="relative z-10 flex flex-col gap-6">
    //         {/* Header con icono */}
    //         <div className="flex items-center justify-between">
    //           <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
    //             Producto Menos Vendido
    //           </span>
    //           <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center bg-black group-hover:text-background transition-colors duration-300">
    //             {/* <Icon className="w-8 h-8" text-white /> */}
    //           </div>
    //         </div>

    //         {/* Valor destacado */}
    //         <div>
    //           <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //             {lessSellingStock && lessSellingStock.length > 0 ? convertNum(lessSellingStock[0].totalQuantitySold) : 0}
    //           </p>
    //           <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //             {lessSellingStock && lessSellingStock.length > 0 ? lessSellingStock[0].nameSupply : 0}
    //           </p>
    //           <img src={lessSellingStock && lessSellingStock.length > 0 ? lessSellingStock[0]?.supply?.imgStore : ""} alt={lessSellingStock && lessSellingStock.length > 0 ? lessSellingStock[0].nameSupply : ""} className="w-40 h-40 object-cover rounded-full mt-2" />
    //           <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
    //             Total $ vendido: {lessSellingStock && lessSellingStock.length > 0 ? convertNum(lessSellingStock[0].totalSale) : 0}
    //           </span>
    //           <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
    //             Total $ ganancia: {lessSellingStock && lessSellingStock.length > 0 ? convertNum(lessSellingStock[0].totalProfit) : 0}
    //           </span>
    //           <div className="w-8 h-px bg-border mt-4 group-hover:bg-foreground/40 transition-colors duration-300" />
    //         </div>

    //         <h2>Ventas por Plataforma</h2>
    //         {salesByPlatform && salesByPlatform.length > 0 &&
    //           salesByPlatform.map((platform) => {
    //             return (

    //               <div>
    //                 <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //                   Plataforma
    //                 </span>
    //                 <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //                   {platform.platform}
    //                 </p>
    //                 <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //                   Cantidad de productos
    //                 </span>
    //                 <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight tabular-nums">
    //                   {platform.totalSales}
    //                 </p>

    //               </div>
    //             )
    //           })
    //         }


    //       </div>

    //     </motion.div>

    //   </div>
    // </section>

    <section className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-muted-foreground mb-2">
          Resumen financiero
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          Métricas del negocio
        </h2>
        <div className="w-10 h-0.5 bg-foreground mt-4" />
      </motion.div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Capital en Stock */}
        <CapitalMetricCard capitalStock={capitalStock} delay={0.1} />

        {/* Producto Más Vendido */}
        <ProductMetricCard
          label="Producto Más Vendido"
          data={bestSellingStock}
          variant="best"
          delay={0.2}
        />

        {/* Producto Menos Vendido */}
        <ProductMetricCard
          label="Producto Menos Vendido"
          data={lessSellingStock}
          variant="less"
          delay={0.3}
        />

        {/* Ventas por Plataforma — ocupa todo el ancho */}
        <PlatformMetricCard salesByPlatform={salesByPlatform} delay={0.4} />
      </div>
    </section>
  );
}