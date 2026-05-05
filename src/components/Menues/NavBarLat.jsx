import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaChartLine } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { FaChargingStation } from "react-icons/fa";
import { signOut } from "@firebase/auth";
import { auth } from "../../api/configFirebase";
import { resetCompanySelected } from "../../reducer/actions/actionsCompany";
import { resetAllClients } from "../../reducer/actions/actionsClients";
import { resetGastosXanioandMesParam } from "../../reducer/actions/actionsGastos";
import { resetVentasXanioandMesParam } from "../../reducer/actions/actionsVentas";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";

const navLinks = [
  {
    to: "./InformeVentas",
    icon: <FaMoneyBillTrendUp />,
    label: "Ventas",
  },
  {
    to: "./gastos",
    icon: <PiMoneyFill />,
    label: "Gastos",
  },
  {
    to: "./informes",
    icon: <FaChartLine />,
    label: "Informes",
  },
  {
    to: "./insumos",
    icon: <FaChargingStation />,
    label: "Insumos",
  },
  {
    to: "./support",
    icon: <BiSupport />,
    label: "Soporte",
  },
];

function NavBarLat({ listCompaniesAll }) {
  const userLogin = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const CompanyMenuReducer = useSelector(
    (state) => state.company.companySelected
  );

  const [stateStatus, setStatus] = useState(false);

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

  const closeMenuLat = () => setStatus(!stateStatus);

  if (!userLogin) return null;

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="
            bg-black/95
            backdrop-blur-xl
            border-b border-white/[0.06]
            shadow-[0_1px_40px_rgba(0,0,0,0.6)]
            mb-3
            px-0
          "
          style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
        >
          <Container fluid className="px-3">
            {/* BRAND */}
            <Navbar.Brand className="flex items-center gap-3">
              {/* Accent line */}
              <span className="block w-[3px] h-6 bg-white rounded-full opacity-90" />
              <h2
                className="
                  text-white text-sm font-semibold
                  tracking-[0.2em] uppercase
                  letter-spacing-widest
                  mb-0
                "
              >
                Gestión Turnos
              </h2>
            </Navbar.Brand>

            {/* TOGGLE */}
            <Navbar.Toggle
              className="
                border border-white/20
                text-white/60
                hover:border-white/40
                hover:text-white
                transition-all duration-200
                focus:shadow-none
                p-2 rounded-lg
              "
            />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              className="text-gray-300"
              placement="end"
              style={{
                background: "linear-gradient(180deg, #0a0a0a 0%, #111111 100%)",
                width: "280px",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* OFFCANVAS HEADER */}
              {CompanyMenuReducer && "nameCompany" in CompanyMenuReducer && (
                <Offcanvas.Header
                  closeButton
                  onClick={closeMenuLat}
                  className="border-b border-white/[0.06] px-6"
                  closeVariant="white"
                >
                  <Offcanvas.Title as={Link} to="/" className="no-underline">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-gray-500 font-medium mb-1">
                        Empresa activa
                      </span>
                      <h3
                        className="
                          uppercase font-bold text-white text-base
                          tracking-wide mb-0
                        "
                      >
                        {CompanyMenuReducer.nameCompany}
                      </h3>
                    </div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
              )}

              {/* OFFCANVAS BODY */}
              {CompanyMenuReducer ? (
                <Offcanvas.Body className="flex flex-col px-3 py-2">
                  {/* NAV SECTION LABEL */}
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold px-3 mb-2 mt-2">
                    Módulos
                  </p>

                  {/* Importar en tu index.html o CSS global: */}
                  {/* @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap'); */}

                  <Nav className="flex flex-col gap-0.5">
                    {navLinks.map(({ to, icon, label }) => (
                      <Nav.Link
                        key={label}
                        as={Link}
                        to={to}
                        className="group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/[0.06] active:bg-white/10"
                        style={{ textDecoration: "none" }}
                      >
                        {/* Icono */}
                        <span
                          className="
          flex items-center justify-center
          w-8 h-8 shrink-0 rounded-md
          text-gray-600
          group-hover:text-white group-hover:bg-white/[0.08]
          transition-all duration-200
        "
                          style={{ fontSize: "15px" }}
                        >
                          {icon}
                        </span>

                        {/* Label */}
                        <span
                          className="ml-3 text-gray-400 group-hover:text-white transition-colors duration-200"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "15px",
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            lineHeight: 1,
                          }}
                        >
                          {label}
                        </span>
                      </Nav.Link>
                    ))}
                  </Nav>

                  {/* USER SECTION */}
                  <UserSection
                    userLogin={userLogin}
                    onCloseSesion={onCloseSesion}
                  />
                </Offcanvas.Body>
              ) : (
                <Offcanvas.Body className="flex flex-col px-3 py-5">
                  <div className="flex-1" />
                  <UserSection
                    userLogin={userLogin}
                    onCloseSesion={onCloseSesion}
                  />
                </Offcanvas.Body>
              )}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

/* ─── User section separada para reutilizar ─── */
function UserSection({ userLogin, onCloseSesion }) {
  return (
    <div
      className="
        border-t border-white/[0.06] pt-4 mt-2
      "
    >
      <div className="flex items-center gap-3 px-3 mb-2">
        {/* Avatar placeholder */}
        <div
          className="
            w-8 h-8 rounded-full bg-white/10
            flex items-center justify-center
            text-xs font-bold text-white uppercase
            border border-white/10 shrink-0
          "
        >
          {(userLogin.displayName || userLogin.email || "U")[0]}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-white font-medium truncate">
            {userLogin.displayName || userLogin.email}
          </span>
          <span className="text-[10px] text-gray-600 truncate">
            {userLogin.email}
          </span>
        </div>
      </div>

      <button
        onClick={onCloseSesion}
        className="
          w-full mt-1 flex items-center gap-2
          px-3 py-2.5 rounded-lg
          text-gray-500 text-sm font-medium
          hover:text-white hover:bg-white/[0.06]
          transition-all duration-150
          border border-transparent
          hover:border-white/[0.06]
          text-left mt-4
        "
      >
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
        Cerrar sesión
      </button>
    </div>
  );
}

export default NavBarLat;