import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ChevronRight,
  Sparkles,
  Tag,
} from "lucide-react";

export default function ProductCard({
  product,
  index,
  slug,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const image =
    product?.idGlobalSupply?.imgStore ||
    "https://placehold.co/600x600/f4f4f5/18181b?text=Sin+imagen";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="h-full"
    >
      <Link
        to={`/tiendavirtual/${slug}/product/${product._id}`}
        state={{ product }}
        className="group block h-full no-underline"
      >
        <CardInner
          product={product}
          image={image}
          imgLoaded={imgLoaded}
          setImgLoaded={setImgLoaded}
        />
      </Link>
    </motion.div>
  );
}

function CardInner({
  product,
  image,
  imgLoaded,
  setImgLoaded,
}) {
  const category =
    product?.idGlobalSupply?.idCategory?.name;

  const brand =
    product?.idGlobalSupply?.idBrand?.nameBrand;

  const name =
    product?.idGlobalSupply?.nameSupply;

  const description =
    product?.idGlobalSupply?.description;

  return (
    <div
      className="
      relative h-full flex flex-col rounded-3xl overflow-hidden border
      bg-white border-zinc-200/80
      transition-all duration-500
      hover:border-zinc-300
      hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.14)]
      hover:-translate-y-1.5
    "
    >
      {/* ───────────────────────────────────────── */}
      {/* IMAGE */}
      {/* ───────────────────────────────────────── */}

      <div className="relative overflow-hidden bg-zinc-50 aspect-[4/3]">
        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 animate-pulse" />
        )}

        {/* IMAGE */}
        <img
          src={image}
          alt={name}
          onLoad={() => setImgLoaded(true)}
          className={`
            w-full h-full object-contain bg-white p-4
            transition-all duration-700
            group-hover:scale-[1.07]
            ${imgLoaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* CATEGORY */}
        {category && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-white/60 text-zinc-700 text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full font-semibold shadow-sm">
              <Tag className="w-2.5 h-2.5" />
              {category}
            </div>
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────── */}
      {/* CONTENT */}
      {/* ───────────────────────────────────────── */}

      <div className="flex flex-col flex-1 p-3 gap-2">
        {/* BRAND */}
        {brand && (
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-zinc-300" />

            <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-semibold">
              {brand}
            </span>
          </div>
        )}

        {/* NAME */}
        <h3
          className="
          font-black text-base leading-snug line-clamp-2
          transition-colors duration-300
          text-zinc-600 group-hover:text-black
        "
        >
          {name}
        </h3>

        {/* DESCRIPTION */}
        {description && (
          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="h-px bg-zinc-100" />

        {/* FOOTER */}
        <div className="flex items-center justify-end pt-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 group-hover:text-zinc-700 transition-colors duration-300 hidden sm:block">
              Ver producto
            </span>

            <div className="w-9 h-9 rounded-2xl border border-zinc-200 bg-zinc-50 group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300 flex items-center justify-center shadow-sm">
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}