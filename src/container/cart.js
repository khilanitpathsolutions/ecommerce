import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import NavbarComponent from "../components/navbar";

const CartItems = () => {
  const { context, setContext } = useContext(UserContext);
  const [toggle, setToggle] = useState(true);

  const cartItems = Object.entries(context);
  console.log(cartItems);

  const handleQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      const updatedCart = { ...context };
      delete updatedCart[productId];
      setContext(updatedCart);
    } else {
      setContext((prevValue) => ({
        ...prevValue,
        [productId]: {
          ...prevValue[productId],
          quantity: newQuantity,
        },
      }));
    }
  };

  const calculateSubtotal = () => {
    const subtotalValues = cartItems.map(
      ([productId, item]) => item.price * item.quantity
    );
    const subtotal = subtotalValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return subtotal;
  };

  const gstTotal = () => {
    const sub = calculateSubtotal();
    const totalTax = sub * 0.18;
    return totalTax;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = gstTotal();
    const total = subtotal + taxAmount + 10;
    return total;
  };

  const MyStyles = {
    btn: {
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
      width: "98.5%",
      margin: "5px",
    },
    rightSection: {
      backgroundColor: "#f0f0f0",
      padding: "30px",
    },
    delete: {
      display: "flex",
      justifyContent: "end",
      width: "98.5%",
      margin: "5px",
    },
  };

  return (
    <>
      <NavbarComponent />
      <Container>
        <h2>Items in Cart</h2>
        <Row>
          <Col md={8} xs={12}>
            {cartItems.length > 0 ? (
              cartItems.map(([productId, item]) => (
                <Card
                  key={productId}
                  className="w-100 mb-3"
                  style={{ padding: "10px" }}
                >
                  <Row>
                    <Col md={4}>
                      <Card.Img
                        src={item.image}
                        alt="error"
                        style={{ width: "200px", height: "200px" }}
                      />
                    </Col>
                    <Col md={8} xs={12}>
                      <Card.Body>
                        <Card.Text>Product ID: {productId}</Card.Text>
                        <Card.Text>Title: {item.title}</Card.Text>
                        <Card.Text className="h3">
                          Price: ${item.price}
                        </Card.Text>
                        <Card.Text className="h5">
                          Quantity: {item.quantity}
                        </Card.Text>
                        <Card.Text className="h6">
                          Total Amount: $
                          {(item.price * item.quantity).toFixed(2)}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                  <div style={MyStyles.btn}>
                    <Button
                      onClick={() =>
                        handleQuantity(productId, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <span style={{ fontSize: "x-large", padding: "8px 8px" }}>
                      {item.quantity}
                    </span>
                    <Button
                      onClick={() =>
                        handleQuantity(productId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      variant="danger"
                      style={{ width: "100px" }}
                      onClick={() => handleQuantity(productId, 0)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <h5>Cart is empty...</h5>
            )}
          </Col>
          <Col md={4} xs={12}>
            <div style={MyStyles.rightSection}>
              <h5>Sub-Total: ${calculateSubtotal().toFixed(2)}</h5>
              <br></br>
              <h5>GST: ${gstTotal().toFixed(2)}</h5>
              <br></br>
              <h5>Delivery Charges: $10</h5>
              <br></br> <hr></hr>
              <h3>Total: ${calculateTotal().toFixed(2)}</h3>
              <br></br>
              <Button variant="success" onClick={() => setToggle(!toggle)}>
                {toggle ? (
                  "Check Out"
                ) : (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </div>
          </Col>
        </Row>
        <Link to="/">
          <Button variant="warning" style={{ width: "150px" }}>
            Home
          </Button>
        </Link>
        <hr></hr>
      </Container>
    </>
  );
};

export default CartItems;
