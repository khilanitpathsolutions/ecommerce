import React, { useContext } from "react";
import { Container, Navbar, Form, Badge, Nav } from "react-bootstrap";
import { Cart, Person, Heart, Bell } from "react-bootstrap-icons";
import logo from "../assets/ecommerce.svg";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const { context, like } = useContext(UserContext);

  const getTotalItemsInCart = () => {
    const cartItems = Object.values(context);
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getTotalItemsInWishList = () => {
    const wishListCount = Object.keys(like).length;
    return wishListCount;
  };

  const MyStyles = {
    badge: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      fontSize: "12px",
      color: "white",
      fontWeight: "bold",
      padding: "4px 8px",
    },
    search: {
      maxWidth: "400px",
      height: "43px",
      borderRadius: "16px",
      fontSize: "20px",
    },
    icon: {
      textDecoration: "none",
      color: "black",
      position: "relative",
    },
  };

  return (
    <>
      <Navbar bg="secondary" variant="dark" expand="md" className="sticky-top">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <Link to="/">
              <img alt="error" src={logo} width="60" height="60" />
            </Link>
            &nbsp;
            <Navbar.Brand style={{ fontFamily: "cursive", cursor: "pointer" }}>
              E-Zone
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="d-flex flex-grow-1 justify-content-center">
              <Form.Control
                className="mx-auto"
                type="text"
                style={MyStyles.search}
                placeholder="Search..."
              />
            </div>
            <br />

            <Nav className="ml-auto" style={{ gap: "20px", cursor: "pointer" }}>
              <Link to="/cart" style={MyStyles.icon}>
                <Cart size={25} />
                {getTotalItemsInCart() > 0 && (
                  <Badge bg="danger" pill style={MyStyles.badge}>
                    {getTotalItemsInCart()}
                  </Badge>
                )}
              </Link>

              <Link to="/wishlist" style={MyStyles.icon}>
                <Heart size={25} />
                {getTotalItemsInWishList() > 0 && (
                  <Badge bg="danger" pill style={MyStyles.badge}>
                    {getTotalItemsInWishList()}
                  </Badge>
                )}
              </Link>

              <Person size={25} />
              <Bell size={25} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
