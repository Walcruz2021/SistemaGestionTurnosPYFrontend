import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";

import { signOut } from "@firebase/auth";
import { auth } from "../../api/configFirebase";

import { resetCompanySelected } from "../../reducer/actions/actionsCompany";
import { resetAllClients } from "../../reducer/actions/actionsClients";
import { resetGastosXanioandMesParam } from "../../reducer/actions/actionsGastos";
import { resetVentasXanioandMesParam } from "../../reducer/actions/actionsVentas";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  TrendingUp,
  DollarSign,
  BarChart2,
  Zap,
  HeadphonesIcon,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  {
    to: "/InformeVentas",
    icon: TrendingUp,
    label: "Ventas",
  },
  {
    to: "/gastos",
    icon: DollarSign,
    label: "Gastos",
  },
  {
    to: "/informes",
    icon: BarChart2,
    label: "Informes",
  },
  {
    to: "/insumos",
    icon: Zap,
    label: "Insumos",
  },
  {
    to: "/support",
    icon: HeadphonesIcon,
    label: "Soporte",
  },
];

/* ───────────────────────────────────────────── */
/* NAV LINK */
/* ───────────────────────────────────────────── */

function NavLink({ icon: Icon, label, to, onClick }) {
  return (
    <motion.div whileHover={{ x: 3 }}>
      <Link
        to={to}
        onClick={onClick}
        className="
          group flex items-center gap-3
          px-3 py-2.5 rounded-lg
          transition-all duration-200
          hover:bg-white/[0.06]
          no-underline
        "
      >
        {/* ICON */}
        <span
          className="
            flex items-center justify-center
            w-8 h-8 rounded-md shrink-0
            text-zinc-600
            group-hover:text-white
            group-hover:bg-white/[0.08]
            transition-all duration-200
          "
        >
          <Icon size={15} strokeWidth={1.8} />
        </span>

        {/* LABEL */}
        <span
          className="
            text-zinc-400 group-hover:text-white
            transition-colors duration-200
            text-sm tracking-wide
          "
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: "0.08em",
          }}
        >
          {label}
        </span>

        {/* ARROW */}
        <ChevronRight
          size={12}
          className="
            ml-auto text-zinc-700
            group-hover:text-zinc-400
            transition-colors duration-200
          "
        />
      </Link>
    </motion.div>
  );
}

/* ───────────────────────────────────────────── */
/* USER SECTION */
/* ───────────────────────────────────────────── */

function UserSection({ userLogin, onCloseSesion }) {
  const initial = (
    userLogin.displayName ||
    userLogin.email ||
    "U"
  )[0].toUpperCase();

  return (
    <div className="border-t border-white/[0.06] pt-4 mt-2 px-1">
      {/* USER INFO */}
      <div className="flex items-center gap-3 px-3 mb-3">
        <div
          className="
            w-8 h-8 rounded-full
            bg-white/10 border border-white/10
            flex items-center justify-center
            text-xs font-bold text-white uppercase
            shrink-0
          "
        >
          {initial}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs text-white font-medium truncate">
            {userLogin.displayName || userLogin.email}
          </span>

          <span className="text-[10px] text-zinc-600 truncate">
            {userLogin.email}
          </span>
        </div>
      </div>

      {/* LOGOUT */}
      <motion.button
        whileHover={{ x: 3 }}
        onClick={onCloseSesion}
        className="
          w-full flex items-center gap-2.5
          px-3 py-2.5 rounded-lg
          text-zinc-500 text-sm
          hover:text-white
          hover:bg-white/[0.06]
          transition-all duration-150
          border border-transparent
          hover:border-white/[0.06]
          text-left
        "
      >
        <LogOut size={15} strokeWidth={1.8} className="shrink-0" />
        <span>Cerrar sesión</span>
      </motion.button>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/* MAIN COMPONENT */
/* ───────────────────────────────────────────── */

function NavBarLat() {
  const [open, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.user.user);

  const CompanyMenuReducer = useSelector(
    (state) => state.company.companySelected
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCloseSesion = async () => {
    try {
      dispatch(resetCompanySelected());
      dispatch(resetAllClients());
      dispatch(resetGastosXanioandMesParam());
      dispatch(resetVentasXanioandMesParam());

      await signOut(auth);

      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!userLogin) return null;

  return (
    <>
      {/* TOP NAVBAR */}
      <nav
        className="
          sticky top-0 z-40 w-full
          flex items-center justify-between
          px-4 md:px-6 py-3
        "
        style={{
          background: "rgba(5,5,5,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 1px 40px rgba(0,0,0,0.7)",
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
        }}
      >
        {/* BRAND */}
        <div className="flex items-center gap-3">
          <span className="block w-[3px] h-6 bg-white rounded-full opacity-90" />

          <h2
            className="
              text-white text-sm font-semibold
              tracking-[0.22em] uppercase
              mb-0 m-0
            "
          >
            Gestión Turnos
          </h2>
        </div>

        {/* COMPANY */}
        {CompanyMenuReducer &&
          "nameCompany" in CompanyMenuReducer && (
            <div
              className="
                hidden md:flex items-center gap-2
                px-3 py-1.5 rounded-lg
                bg-white/[0.04]
                border border-white/[0.07]
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

              <span className="text-[11px] text-zinc-400 tracking-wide">
                {CompanyMenuReducer.nameCompany}
              </span>
            </div>
          )}

        {/* TOGGLE */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(true)}
          className="
            flex items-center justify-center
            w-9 h-9 rounded-lg
            border border-white/20
            text-zinc-400
            hover:border-white/40
            hover:text-white
            transition-all duration-200
          "
        >
          <Menu size={17} />
        </motion.button>
      </nav>

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60"
            style={{ backdropFilter: "blur(2px)" }}
          />
        )}
      </AnimatePresence>

      {/* PANEL */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="
              fixed top-0 right-0 h-full z-50
              flex flex-col
            "
            style={{
              width: "280px",
              background:
                "linear-gradient(180deg, #0a0a0a 0%, #111111 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "'DM Sans','Segoe UI',sans-serif",
            }}
          >
            {/* HEADER */}
            <div
              className="
                flex items-center justify-between
                px-5 py-4
                border-b border-white/[0.06]
              "
            >
              <div className="flex flex-col gap-0.5">
                <span
                  className="
                    text-[10px]
                    tracking-[0.25em]
                    uppercase
                    text-zinc-600
                    font-medium
                  "
                >
                  Empresa activa
                </span>

                <h3
                  className="
                    uppercase font-bold
                    text-white text-sm
                    tracking-wide m-0
                  "
                >
                  {CompanyMenuReducer?.nameCompany}
                </h3>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="
                  w-8 h-8 rounded-lg
                  flex items-center justify-center
                  text-zinc-500
                  hover:text-white
                  hover:bg-white/[0.08]
                  transition-all duration-150
                "
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* LINKS */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <p
                className="
                  text-[10px]
                  tracking-[0.22em]
                  uppercase
                  text-zinc-600
                  font-semibold
                  px-3 mb-3
                "
              >
                Módulos
              </p>

              <div className="flex flex-col gap-0.5">
                {navLinks.map(({ icon, label, to }) => (
                  <NavLink
                    key={label}
                    icon={icon}
                    label={label}
                    to={to}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>

            {/* USER */}
            <UserSection
              userLogin={userLogin}
              onCloseSesion={onCloseSesion}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBarLat;