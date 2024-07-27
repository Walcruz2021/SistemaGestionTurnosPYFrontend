import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaChartLine } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { FaCogs } from "react-icons/fa";
import { signOut } from "@firebase/auth";
import { auth } from "../../api/configFirebase";
import {
  functionCompanySelected,
  resetCompanySelected,
  resetAllClients 
} from "../../reducer/actions/actions";
import {resetGastosXanioandMesParam} from "../../reducer/actions/actionsGastos"
import {resetVentasXanioandMesParam} from "../../reducer/actions/actionsVentas"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function NavBarLat({ listCompaniesAll }) {
  
  const userLogin = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const CompanyMenuReducer = useSelector((state) => state.companySelected);


  const [stateCompanySelected, setCompanySelectedMenu] = useState();

  useEffect(() => {
    if (CompanyMenuReducer) {
      setCompanySelectedMenu(CompanyMenuReducer);
    }
  }, [CompanyMenuReducer]);

  const onCloseSesion = async () => {
    try {
      dispatch(resetCompanySelected());
      dispatch(resetAllClients())
      dispatch(resetGastosXanioandMesParam())
      dispatch(resetVentasXanioandMesParam())
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const changeCompany = (company) => {
    setCompanySelectedMenu(company);
    dispatch(functionCompanySelected(company));
    dispatch(resetAllClients())
    dispatch(resetGastosXanioandMesParam())
    dispatch(resetVentasXanioandMesParam())
    navigate("/")
  };

  const [stateStatus, setStatus] = useState(false);
  const closeMenuLat = () => {
    setStatus(!stateStatus);
  };

  if (!userLogin) {
    return null; // No renderizar nada si userLogin no existe
  }

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand>GESTION DE TURNOS PYMESYA</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              {CompanyMenuReducer &&
              "nameCompany" in CompanyMenuReducer ? (
                <Offcanvas.Header closeButton onClick={closeMenuLat}>
                  <Offcanvas.Title
                    as={Link}
                    to="/"
                    id={`offcanvasNavbarLabel-expand-${expand}`}
                  >
                    <h4>{CompanyMenuReducer.nameCompany}</h4>
                  </Offcanvas.Title>
                </Offcanvas.Header>
              ) : null}

              {CompanyMenuReducer &&
              "nameCompany" in CompanyMenuReducer ? (
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link as={Link} to="./listVentas">
                      <FaMoneyBillTrendUp className="mx-4" />
                      Ventas
                    </Nav.Link>
                    <Nav.Link as={Link} to="./gastos">
                      <PiMoneyFill className="mx-4" />
                      Gastos
                    </Nav.Link>
                    <Nav.Link as={Link} to="./informes">
                      <FaChartLine className="mx-4" />
                      Informes
                    </Nav.Link>

                    <NavDropdown
                      title={userLogin.displayName || userLogin.email}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item onClick={onCloseSesion}>
                        Cerrar Sesion
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>

                    <NavDropdown
                      title="Empresas"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      {typeof listCompaniesAll === "object"
                        ? listCompaniesAll.companies.map((company) => (
                            <NavDropdown.Item
                              key={company._id}
                              onClick={() => changeCompany(company)}
                            >
                              {company.nameCompany}
                            </NavDropdown.Item>
                          ))
                        : null}
                      <NavDropdown.Item as={Link} to="/addCompany">
                        Agregar Empresa
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Offcanvas.Body>
              ) : (
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavDropdown
                      title={userLogin.displayName || userLogin.email}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item onClick={onCloseSesion}>
                        Cerrar Sesion
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>

                    <NavDropdown
                      title="Empresas"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      {typeof listCompaniesAll === "object"
                        ? listCompaniesAll.companies.map((company) => (
                            <NavDropdown.Item
                              key={company._id}
                              onClick={() => changeCompany(company)}
                            >
                              {company.nameCompany}
                            </NavDropdown.Item>
                          ))
                        : null}
                      <NavDropdown.Item as={Link} to="/addCompany">
                        Agregar Empresa
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Offcanvas.Body>
              )}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBarLat;
