import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaChartLine } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { signOut } from "@firebase/auth";
import { auth } from "../../hooks/configFirebase";
import { functionCompanySelected } from "../../reducer/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function NavBarLat({ userLogin, listCompaniesAll, stateCompanyGralNav }) {
  const dispatch = useDispatch();
  const companySelected = useSelector((state) => state.companySelected);

  const [stateCompanySelectedMenu, setCompanySelectedMenu] = useState();

  useEffect(() => {
    if (companySelected) {
      setCompanySelectedMenu(companySelected);
    }
  }, []);

  const onCloseSesion = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const listCompanies = () => {};

  const changeCompany = (company) => {
    setCompanySelectedMenu(company);
    dispatch(functionCompanySelected(company));
  };

  const [stateStatus,setStatus]=useState(false)
  const closeMenuLat = () => {
    setStatus(!stateStatus);
  };

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
              <Offcanvas.Header closeButton onClick={closeMenuLat}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  MENU
                </Offcanvas.Title>
                {stateCompanySelectedMenu  && 'nameCompany' in stateCompanySelectedMenu ? (
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    {stateCompanySelectedMenu.nameCompany}
                  </Offcanvas.Title>
                ) : null}
              </Offcanvas.Header>

              {/* <FaCogs className="mx-4" /> */}
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="./listVentas">
                    <FaChartLine className="mx-4" />
                    Informes
                  </Nav.Link>

                  <NavDropdown
                    title={userLogin}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item onClick={onCloseSesion}>
                      Cerrar Sesion
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    {/* <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item> */}
                  </NavDropdown>

                  <NavDropdown
                    title="Empresas"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    {typeof listCompaniesAll === "object"
                      ? listCompaniesAll.companies.map((company) => (
                          //console.log(company.nameCompany)
                          <NavDropdown.Item
                            key={company._id}
                            onClick={() => changeCompany(company)}
                          >
                            {company.nameCompany}
                          </NavDropdown.Item>
                        ))
                      : null}
                    {/* <Nav.Link href="./listCompanies">
                      <FaChartLine className="mx-4" />
                      Listado de Empresas
                    </Nav.Link> */}
                    {/* <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item onClick={onCloseSesion}>
                      Cerrar Sesion
                    </NavDropdown.Item> */}
                    {/* <NavDropdown.Divider /> */}
                    {/* <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item> */}
                  </NavDropdown>
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBarLat;
