import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { motion, AnimatePresence, setStyle } from "framer-motion";

import {
  ArrowLeft,
  ShoppingBag,
  Package,
  Minus,
  Plus,
  ShoppingCart,
  Tag,
  Layers,
  Ruler,
  CheckCircle2,
} from "lucide-react";

import { addProduct } from "../../store/cartSlice";

import { getCompanySupplyVariants } from "../../reducer/actions/companySupplyVariant/actionsCompanySupplyVariant";

// ─────────────────────────────────────────────────────────────
// META PILL
// ─────────────────────────────────────────────────────────────

function MetaPill({ icon: Icon, label, value }) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-2xl px-4 py-2.5 shadow-sm">
      <Icon className="w-4 h-4 text-zinc-600 shrink-0" />

      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 leading-none">
          {label}
        </p>

        <p className="text-sm font-bold text-zinc-800 leading-tight mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

const ProductDetail = () => {
  const location = useLocation();

  const product = location.state?.product;


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  // ─────────────────────────────────────────────────────────────
  // REDUX
  // ─────────────────────────────────────────────────────────────

  const listProductosCart =
    useSelector(
      (state) => state.companySupplyVariant.listCompanySupplyVariant
    ) || []; //route /getVariantsByCompanySupply/idCompanySupply


  const companySelectedMenu = useSelector(
    (state) => state.company.companySelected
  );

  // ─────────────────────────────────────────────────────────────
  // STATES
  // ─────────────────────────────────────────────────────────────

  const [selectedVariant, setSelectedVariant] = useState(null);


  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState([]);

  const [addedToCart, setAddedToCart] = useState(false);

  const [selectedImage, setSelectedImage] = useState(
    product?.idGlobalSupply?.imgStore ||
    "https://placehold.co/800x800/18181b/ffffff?text=Producto"
  );

  // ─────────────────────────────────────────────────────────────
  // EFFECTS
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (id) {
      dispatch(getCompanySupplyVariants(id));
    }
  }, [id]);

  useEffect(() => {
    if (listProductosCart?.length > 0) {
      setSelectedVariant(listProductosCart[0]);
    }
  }, [listProductosCart]);

  // ─────────────────────────────────────────────────────────────
  // DATA
  // ─────────────────────────────────────────────────────────────

  let stock = selectedVariant?.inventory?.currentStock || 0;

  const unitPrice =
    selectedVariant?.priceSale || selectedVariant?.price || 0;

  const totalPrice = unitPrice * quantity;

  // ─────────────────────────────────────────────────────────────
  // QUANTITY
  // ─────────────────────────────────────────────────────────────

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // CART
  // ─────────────────────────────────────────────────────────────

  const handleAddToCart = () => {
    const newProduct = {
      id: product?._id,
      name: product?.global?.nameSupply,
      image: product?.img?.[0],
      quantity,
      unitPrice,
      totalPrice,
    };

    setCart((prev) => [...prev, newProduct]);
    setQuantity(stock - quantity);
    stock = stock - quantity;
    dispatch(addProduct(newProduct));

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2500);
  };

  const validationDisabled = () => {

    if (quantity <= stock) {
      return false
    } else {
      return true
    }

  }

  const goToShoppingCart = () => {
    navigate(`/tiendavirtual/${companySelectedMenu.slug}/shoppingCart`);
  };

  // ─────────────────────────────────────────────────────────────
  // VALIDATION
  // ─────────────────────────────────────────────────────────────

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100">
        <h2 className="text-2xl font-bold text-zinc-800">
          Producto no encontrado
        </h2>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* TOP BAR */}
      <div className="bg-white border-b border-zinc-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
          <Link
            to={-1}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-medium group no-underline"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Volver
          </Link>

          <p className="text-[12px] uppercase tracking-[0.25em] text-zinc-600 font-medium hidden sm:block">
            Detalle de producto
          </p>

          <button
            onClick={goToShoppingCart}
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            Ver carrito
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            {/* MAIN IMAGE */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-zinc-200 aspect-square shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={product?.idGlobalSupply?.nameSupply}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-contain bg-white p-4"
                />
              </AnimatePresence>

              <div className="absolute top-4 left-4">
                <span className="bg-zinc-900/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full font-semibold">
                  {product?.idGlobalSupply?.idCategory?.name}
                </span>
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto pb-1">

              {selectedVariant?.idSupplyVariant?.imgStore?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300
                  
                  ${selectedImage === img
                      ? "border-zinc-900 shadow-md scale-[1.04]"
                      : "border-zinc-200 hover:border-zinc-400"
                    }`}
                >
                  <img
                    src={img}
                    alt={`img-${index}`}
                    className="w-full h-full object-contain bg-white p-2"
                  />
                </button>
              ))}

            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* TITLE */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-medium mb-2">
                {product?.idGlobalSupply?.idCategory?.name}
              </p>

              <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 leading-tight">
                {product?.idGlobalSupply?.nameSupply}
              </h1>
            </div>

            {/* META */}
            <div className="flex flex-wrap gap-2.5">
              <MetaPill
                icon={Tag}
                label="Marca"
                value={product?.idGlobalSupply?.idBrand?.nameBrand}
              />

              <MetaPill
                icon={Layers}
                label="Modelo"
                value={product?.idGlobalSupply?.nameSupply}
              />

              <MetaPill
                icon={Ruler}
                label="Talle"
                value={selectedVariant?.global?.valueUnidMed}
              />

              <MetaPill
                icon={Package}
                label="Stock"
                value={`${stock} unidades`}
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-medium mb-2">
                Descripción
              </p>

              <p className="text-zinc-600 leading-relaxed text-sm">
                {product?.idGlobalSupply?.description ||
                  "Producto premium disponible en nuestra tienda online."}
              </p>
            </div>

            {/* VARIANTS */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-medium mb-3">
                Variantes disponibles
              </p>

              <div className="flex gap-3 flex-wrap">
                {listProductosCart?.map((variant) => {
                  const isActive =
                    selectedVariant?._id === variant?._id;

                  return (
                    <motion.button
                      key={variant._id}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setQuantity(1);
                        setSelectedImage(variant?.idSupplyVariant?.imgStore?.[0] ||
                          product?.idGlobalSupply?.imgStore ||
                          "https://placehold.co/800x800/18181b/ffffff?text=Producto");
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative rounded-2xl border p-3.5 text-left transition-all duration-300 min-w-[110px]
                      
                      ${isActive
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-lg"
                          : "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400"
                        }`}
                    >
                      {isActive && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white/50" />
                        </div>
                      )}

                      <p
                        className={`text-[9px] uppercase tracking-wider mb-1
                        
                        ${isActive
                            ? "text-white/50"
                            : "text-zinc-400"
                          }`}
                      >
                        Variante
                      </p>

                      <p className="font-bold text-sm leading-tight">
                        {variant?.idSupplyVariant?.name}
                      </p>

                      <p
                        className={`text-[10px] mt-1.5
                        
                        ${isActive
                            ? "text-white/60"
                            : "text-zinc-400"
                          }`}
                      >
                        Stock:{" "}
                        {variant?.inventory?.currentStock}
                      </p>

                      <p className="font-black text-sm mt-0.5">
                        $
                        {(variant?.priceSale || 0).toLocaleString(
                          "es-AR"
                        )}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-zinc-100" />

            {/* PURCHASE CARD */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
              {/* QUANTITY */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-medium">
                    Cantidad
                  </p>

                  <p className="text-zinc-700 font-semibold mt-0.5 text-sm">
                    {quantity} unidad
                    {quantity > 1 ? "es" : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                    
                    ${quantity === 1
                        ? "bg-zinc-100 text-zinc-300 cursor-not-allowed"
                        : "bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-600 border border-zinc-200"
                      }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="w-14 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center font-black text-zinc-900">
                    {quantity}
                  </div>

                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                    
                    ${quantity >= stock
                        ? "bg-zinc-100 text-zinc-300 cursor-not-allowed"
                        : "bg-zinc-900 hover:bg-zinc-700 text-white"
                      }`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PRICE */}
              <div className="bg-zinc-50 rounded-2xl px-5 py-4 space-y-2 border border-zinc-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">
                    Precio por unidad
                  </span>

                  <span className="font-semibold text-zinc-700">
                    ${unitPrice.toLocaleString("es-AR")}
                  </span>
                </div>

                <div className="h-px bg-zinc-200" />

                <div className="flex items-center justify-between">
                  <span className="text-zinc-900 font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-black text-zinc-900">
                    ${totalPrice.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3">
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={!addedToCart ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5
          

                  ${addedToCart
                      ? "bg-emerald-500 text-white"
                      : "bg-zinc-900 hover:bg-zinc-700 text-white"
                    }`}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      ¡Agregado al carrito!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Agregar al carrito
                    </>
                  )}
                </motion.button>

                <button
                  onClick={goToShoppingCart}
                  className="w-full py-4 rounded-2xl font-bold text-sm border border-zinc-200 hover:border-zinc-400 text-zinc-600 hover:text-zinc-900 bg-white transition-all duration-300 flex items-center justify-center gap-2.5"

                >
                  <ShoppingBag className="w-5 h-5" />
                  Ir al carrito
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;