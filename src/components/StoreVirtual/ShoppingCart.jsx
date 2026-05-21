import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Trash2, MessageCircle, Package, ArrowRight, ArrowLeft } from "lucide-react";
import { removeProduct } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShoppingCartComponent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companySelectedMenu = useSelector((state) => state.company.companySelected);
  const listProductsCart = useSelector((state) => state.cart.products);
  const totalCart = listProductsCart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleRemove = (id) => dispatch(removeProduct(id));

  const handleSendWhatsApp = () => {
    if (listProductsCart.length === 0) return;
    let message = `Hola! Quisiera consultar por los siguientes productos:%0A%0A`;
    listProductsCart.forEach((item, index) => {
      message += `• Producto ${index + 1}%0A`;
      message += `Nombre: ${item.name}%0A`;
      message += `Cantidad: ${item.quantity}%0A`;
      message += `Precio Unidad: $${item.unitPrice}%0A`;
      message += `Subtotal: $${item.totalPrice}%0A%0A`;
    });
    message += `TOTAL DEL PEDIDO: $${totalCart}`;
    const phone = companySelectedMenu?.phoneSale;
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };



  return (
    <div className="min-h-screen bg-[white] px-4 py-14">

      {/* Subtle ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/[0.04] blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-black/[0.02] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="mb-8">


          <button
            onClick={() => navigate(`/tiendavirtual/${companySelectedMenu?.slug}`)}
            className="inline-flex items-center gap-2 text-black/30 hover:text-black/80 transition-colors duration-300 text-sm uppercase tracking-[0.2em] font-medium group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Volver
          </button>

        </div>

        {/* ── HEADER ── */}
        <div className="mb-2">
          <p className="text-[10px] uppercase tracking-[0.35em] text-black/50 font-medium mb-2 flex items-center gap-2">
            <span className="inline-block w-5 h-px bg-white/50" />
            Tu selección
          </p>
          <div className="flex items-end justify-between gap-4">
            <h1 className="font-editorial text-5xl sm:text-6xl text-black leading-[0.95] tracking-[-0.02em]">
              Carrito
            </h1>
            {listProductsCart.length > 0 && (
              <span className="text-lx text-black/60 mb-1 font-light">
                {listProductsCart.length} producto{listProductsCart.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="mt-5 h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
        </div>

        {/* ── EMPTY STATE ── */}
        {listProductsCart.length === 0 ? (
          <div className="rounded-sm border border-white/[0.07] bg-white/[0.02] p-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-sm border border-black/10 flex items-center justify-center mb-6">
              <Package className="w-7 h-7 text-black/20" />
            </div>
            <h2 className="font-editorial text-3xl text-black/80 mb-3">Carrito vacío</h2>
            <p className="text-black/30 max-w-xs text-sm leading-relaxed font-light">
              Todavía no agregaste productos. Explorá el catálogo y encontrá lo que necesitás.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* ── PRODUCT LIST ── */}
            <div className="xl:col-span-2 space-y-3">
              {listProductsCart.map((item, i) => (
                <div
                  key={item.id}
                  className="group relative rounded-sm border border-black/[0.07] bg-black/[0.02] hover:bg-black/[0.04] hover:border-black/[0.12] transition-all duration-400 overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-amber-400/60 via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="p-3 md:p-6 flex flex-col sm:flex-row gap-5 sm:items-center justify-between">
                    {/* Image + Info */}
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className="w-[72px] h-[72px] rounded-sm overflow-hidden border border-black/[0.08] shrink-0 bg-black/[0.03]">
                        <img
                          src={item.image || "https://placehold.co/200x200/0a0a0a/333?text=—"}
                          alt={item.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] uppercase tracking-[0.25em] text-black/50 mb-1.5">
                          Artículo #{i + 1}
                        </p>
                        <h2 className="text-black font-semibold text-base truncate mb-3 tracking-tight">
                          {item.name}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          <Pill label="Cantidad" value={item.quantity} />
                          <Pill label="Precio unit." value={`$${item.unitPrice?.toLocaleString("es-AR") ?? "—"}`} />
                          <Pill label="Subtotal" value={`$${item.totalPrice?.toLocaleString("es-AR") ?? "—"}`} gold />
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-sm border border-black/[0.40] text-black/40 text-xs font-medium uppercase tracking-[0.12em] hover:border-red-500/30 hover:text-red-500 hover:bg-red-600/[0.05] transition-all duration-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Eliminar
                    </button>
                  </div>

                  {/* Bottom micro-rule */}
                  <div className="h-px w-full bg-gradient-to-r from-white/[0.05] via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* ── SUMMARY PANEL ── */}
            <div className="h-fit sticky top-8">
              <div className="rounded-sm border border-black/[0.08] bg-black/[0.02] overflow-hidden">

                {/* Panel top rule */}
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

                <div className="p-6">
                  <p className="text-[12px] uppercase tracking-[0.3em] text-black/40 mb-4">Resumen</p>
                  <h2 className="font-editorial text-3xl text-black mb-6 leading-tight">
                    Tu pedido
                  </h2>

                  {/* Item rows */}
                  <div className="space-y-2.5 mb-6">
                    {listProductsCart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4">
                        <span className="text-black/60 text-[15px] font-light truncate flex-1">{item.name}</span>
                        <span className="text-black/60 text-[15px] font-medium shrink-0">
                          ${item.totalPrice?.toLocaleString("es-AR") ?? "—"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-black/[0.07] mb-5" />

                  {/* Totals */}
                  <div className="space-y-2 mb-7">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-black/50 uppercase tracking-wider">Productos</span>
                      <span className="text-black/50 font-medium">{listProductsCart.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-black/60 text-sm font-medium">Total</span>
                      <span className="text-2xl font-black text-amber-400 tracking-tight">
                        ${totalCart.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <button
                    onClick={handleSendWhatsApp}
                    className="group relative w-full mt-7 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 font-bold text-white flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    {/* shimmer */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12" />
                    <MessageCircle className="w-4 h-4 relative z-10 shrink-0" />
                    <span className="relative z-10">Consultar por WhatsApp</span>
                    <ArrowRight className="w-4 h-4 relative z-10 shrink-0 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>

                  <p className="text-center text-[11px] text-white/20 mt-4 tracking-wide">
                    Te contactamos a la brevedad
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

/* ── PILL BADGE ── */
function Pill({ label, value, gold }) {
  return (
    <div className={`rounded-sm px-3 py-1.5 text-xs border ${gold
      ? "bg-amber-400/[0.07] border-amber-400/20 text-amber-600"
      : "bg-black/[0.06] border-black/[0.10] text-black/40"
      }`}>
      <p className="text-[12px] uppercase tracking-[0.2em] opacity-100 mb-0.5">{label}</p>
      <p className="font-semibold text-current">{value}</p>
    </div>
  );
}

export default ShoppingCartComponent;