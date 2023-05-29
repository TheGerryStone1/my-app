import React, { useState, Fragment  } from "react";
import Image from "next/image";
import { Navbar, Nav, Button, Modal, NavDropdown, Container} from "react-bootstrap";
//import Container from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
//import logoBtn from "src/images/logoSearch.jpg";
import styles from "src/components/Menu.module.css";

interface MenuProps {
  titulo: string;
  descripcion: string;
}

const Menu = (props: MenuProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    window.location.href = "/";
  };

  return (
    <>
      {/* Navbar component */}
      <Navbar className="border-bottom">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {/* Navigation links */}
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
              </Nav.Link>
              <Nav.Link
                className="text-dark"
                style={{
                  fontSize: "17px",
                  fontWeight: "semi-bold",
                  marginRight: "20px",
                }}
              >
              </Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Content */}
      <div className="container pt-4 pb-2">
        <h1 className="mb-3">{props.titulo}</h1>
        <p>{props.descripcion}</p>
      </div>
    </>
  );
};

export default Menu;
