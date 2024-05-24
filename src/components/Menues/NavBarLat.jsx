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

function NavBarLat({ userLogin,companies}) {

  // if(typeof companies==="object"){
  //   companies.companies[0]
  // }

  const onCloseSesion = async () => {
   
    try {
      // Swal.fire({
      //   title: "Are you sure?",
      //   text: "You won't be able to revert this!",
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonColor: "#3085d6",
      //   cancelButtonColor: "#d33",
      //   confirmButtonText: "Yes, delete it!",
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     Swal.fire({
      //       title: "Deleted!",
      //       text: "Your file has been deleted.",
      //       icon: "success",
      //     });
      //     signOut(auth);
      //     window.location.href = "/login";
      //   }
      // });
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
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
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  MENU
                </Offcanvas.Title>
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
                    {typeof companies==="object" ? companies.companies.map(company=>
                     //console.log(company.nameCompany)
                     <NavDropdown.Item key={company._id} href="#action3">{company.nameCompany}</NavDropdown.Item>
                    ):null}

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
