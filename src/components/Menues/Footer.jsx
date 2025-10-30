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
} from "../../reducer/actions/actionsCompany";
import { resetAllClients } from "../../reducer/actions/actionsClients";
import { resetGastosXanioandMesParam } from "../../reducer/actions/actionsGastos";
import { resetVentasXanioandMesParam } from "../../reducer/actions/actionsVentas";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./NavBarLat.css";
import "../../css/cssGeneral.css";
import { BiSupport } from "react-icons/bi";

function Footer({ listCompaniesAll }) {


    return (
        <>

            <Navbar className="bg-black mb-3 mt-3">
                <Container>
                    <Navbar.Brand className="w-100">
                        <div className="titGral text-center w-100">
                            <h3 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 500, margin: 0 }}>
                                PYMESYA
                            </h3>
                        </div>
                    </Navbar.Brand>
                </Container>
            </Navbar>

        </>
    );
}

export default Footer;

