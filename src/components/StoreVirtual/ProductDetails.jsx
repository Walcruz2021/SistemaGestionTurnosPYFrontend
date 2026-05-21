import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Package,
  Minus,
  Plus,
  ShoppingCart
} from "lucide-react";
import { addProduct } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { id } = useParams();
  const companySelectedMenu = useSelector(
    (state) => state.company.companySelected
  );

  const listProductsCart = useSelector((state) => state.cart.products)


  const listSupplies = useSelector(
    (state) => state.supply.listSupplies
  );

  const product = listSupplies?.find(
    (item) => item._id === id
  );



  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100">
        <h2 className="text-2xl font-bold text-zinc-800">
          Producto no encontrado
        </h2>
      </div>
    );
  }

  // -----------------------------
  // CANTIDAD
  // -----------------------------
  const [quantity, setQuantity] = useState(1);

  // CARRITO LOCAL
  // ---------------------------------
  const [cart, setCart] = useState([]);


  const stock = product?.totalStock || 0;
  const unitPrice = product?.priceSale || 0;

  const totalPrice = unitPrice * quantity;

  // ---------------------------------
  // SUMAR
  // ---------------------------------

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  // ---------------------------------
  // RESTAR
  // ---------------------------------

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };



  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-100">
        <h2 className="text-2xl font-bold text-zinc-800">
          Producto no encontrado
        </h2>
      </div>
    );
  }


  // ---------------------------------
  // AGREGAR AL CARRITO
  // ---------------------------------
  const handleAddToCart = () => {
    const newProduct = {
      id: product?._id,
      name: product?.global?.nameSupply,
      image: product?.img?.[0],
      quantity: quantity,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
    };

    setCart((prev) => [...prev, newProduct]);
    dispatch(addProduct(newProduct))

    alert("Producto agregado al carrito");
  };

  const goToShoppingCart = () => {
    navigate(`/tiendavirtual/${companySelectedMenu.slug}/shoppingCart`);
  };

  const [selectedImage, setSelectedImage] = useState(
  product?.imgStore?.[0] || "https://placehold.co/800x800/18181b/ffffff?text=Producto"
);


  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        <Link
          to={-1}
          className="inline-flex items-center gap-2 text-zinc-700 hover:text-black mb-8 no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">

          {/* GALERIA */}
          <div className="p-6 md:p-8">

            {/* <div className="aspect-square rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-100">

              <img
                src={product?.imgStore?.[0] || "https://placehold.co/800x800/18181b/ffffff?text=Producto"}
                alt={product?.global?.nameSupply}
                className="w-full h-full object-contain  bg-white"
              />

            </div> */}

            <div className="aspect-square rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-100">

              <img
                src={selectedImage}
                alt={product?.global?.nameSupply}
                className="w-full h-full object-contain bg-white p-4 transition-all duration-300"
              />

            </div>

            {/* MINIATURAS */}
            <div className="flex gap-3 overflow-x-auto pb-2">

              {product?.imgStore?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`min-w-[90px] h-[90px] rounded-2xl overflow-hidden border-2 transition-all duration-300
          
          ${selectedImage === img
                      ? "border-black"
                      : "border-zinc-200 hover:border-zinc-400"
                    }
          
        `}
                >

                  <img
                    src={img}
                    alt={`img-${index}`}
                    className="w-full h-full object-contain bg-white p-2"
                  />

                </button>
              ))}

            </div>

          </div>

          {/* INFO */}
          <div className="p-6 md:p-10 flex flex-col justify-between">

            <div>

              <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-full px-4 py-2 mb-5">
                <ShoppingBag className="w-4 h-4 text-zinc-700" />
                <span className="text-sm text-zinc-700 font-medium">
                  {product?.global?.categorySupply}
                </span>
              </div>

              <h1 className="text-4xl font-black text-zinc-900 leading-tight">
                {product?.global?.nameSupply}
              </h1>

              <div className="flex flex-wrap gap-3 mt-5">

                <div className="bg-zinc-100 border border-zinc-200 rounded-2xl px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                    Marca
                  </p>
                  <p className="font-bold text-zinc-900 mt-1">
                    {product?.global?.nameBrand}
                  </p>
                </div>

                <div className="bg-zinc-100 border border-zinc-200 rounded-2xl px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                    Talle
                  </p>
                  <p className="font-bold text-zinc-900 mt-1">
                    {product?.global?.valueUnidMed}
                  </p>
                </div>

                <div className="bg-zinc-100 border border-zinc-200 rounded-2xl px-4 py-3">
                  <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                    Stock
                  </p>
                  <p className="font-bold text-zinc-900 mt-1">
                    {product?.totalStock}
                  </p>
                </div>

              </div>

              <div className="mt-8">

                <p className="text-zinc-500 uppercase tracking-wider text-xs font-semibold mb-2">
                  Descripción
                </p>

                <p className="text-zinc-700 leading-relaxed text-base">
                  {product?.description || "Producto premium disponible en nuestra tienda online."}
                </p>

              </div>

            </div>

            {/* FOOTER */}
            <div className="mt-10 border-t border-zinc-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>
                <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Precio Final
                </p>

                <h2 className="text-5xl font-black text-zinc-900 mt-1">
                  ${product?.priceSale?.toLocaleString("es-AR")}
                </h2>
              </div>

              <button className="bg-black hover:bg-zinc-800 text-white rounded-2xl px-8 py-4 font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3">
                <Package className="w-5 h-5" />
                Consultar Producto
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* FORMULARIO CANTIDAD */}
      <div className="mt-10 bg-zinc-100 border border-zinc-200 rounded-3xl p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Cantidad
            </p>

            <p className="text-zinc-900 font-bold text-lg mt-1">
              {quantity} unidad{quantity > 1 && "es"}
            </p>
          </div>

          {/* CONTROLES */}
          <div className="flex items-center gap-3">

            <button
              onClick={decreaseQuantity}
              disabled={quantity === 1}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all
                        ${quantity === 1
                  ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  : "bg-white border border-zinc-300 hover:bg-zinc-900 hover:text-white"
                }`}
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="min-w-[60px] h-11 rounded-2xl bg-white border border-zinc-300 flex items-center justify-center font-black text-lg">
              {quantity}
            </div>

            <button
              onClick={increaseQuantity}
              disabled={quantity >= stock}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all
                        ${quantity >= stock
                  ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-zinc-800"
                }`}
            >
              <Plus className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* PRECIOS */}
        <div className="space-y-4">

          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <p className="text-zinc-500 font-medium">
              Precio por unidad
            </p>

            <p className="font-bold text-zinc-900">
              ${unitPrice.toLocaleString("es-AR")}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-zinc-900 font-semibold text-lg">
              Precio total
            </p>

            <p className="text-3xl font-black text-zinc-900">
              ${totalPrice.toLocaleString("es-AR")}
            </p>
          </div>

          {/* BOTON CARRITO */}
          <button
            onClick={handleAddToCart}
            className="w-full mt-6 bg-black hover:bg-zinc-800 text-white rounded-2xl px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-5 h-5" />
            Agregar al carrito
          </button>

          {/* VER EL CARRITO */}
          <button
            onClick={goToShoppingCart}
            className="w-full mt-6 bg-black hover:bg-zinc-800 text-white rounded-2xl px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-5 h-5" />
            Ir al Carrito
          </button>

        </div>

      </div>



    </div>
  );
};

export default ProductDetail;