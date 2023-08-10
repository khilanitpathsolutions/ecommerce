import React, { useContext } from "react";
import NavbarComponent from "../components/navbar";
import { UserContext } from "../App";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";

const Wishlist = () => {
  const { like, setLike, setContext } = useContext(UserContext);
  const wishListItem = Object.entries(like);
  console.log(wishListItem);

  const handleToggleLike = (productID) => {
    const newLike = { ...like };
    delete newLike[productID];
    setLike(newLike);
  };

  const handleAddToCart = (productId, price, title, image) => {
    setContext((prevValue) => ({
      ...prevValue,
      [productId]: {
        quantity: (prevValue[productId]?.quantity || 0) + 1,
        price,
        title,
        image,
      },
    }));
  };

  return (
    <>
      <NavbarComponent />
      {wishListItem.length > 0 ? (
        <Container>
          <Row className="row gy-4">
            <h2>Items in WishList</h2>
            {wishListItem.map(([productId, item]) => (
              <Col key={productId} xs={12} sm={6} md={3}>
                <Card className="d-flex align-items-center h-100">
                  <div
                    style={{
                      width: "96%",
                      display: "flex",
                      justifyContent: "end",
                      margin: "7px",
                    }}
                  >
                    {like[productId] ? (
                      <HeartFill
                        size={30}
                        onClick={() => handleToggleLike(productId)}
                        style={{ color: "#ff4d4d", cursor: "pointer" }}
                      />
                    ) : (
                      <Heart
                        size={30}
                        onClick={() => handleToggleLike(productId)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    className="img-fluid"
                    style={{ height: "200px", width: "200px" }}
                  ></Card.Img>
                  <Card.Body className="d-flex flex-column w-100">
                    <Card.Text>Product ID: {productId}</Card.Text>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text className="h4">Price: ${item.price}</Card.Text>
                    <div
                      className="d-grid row gy-3 mt-auto"
                      style={{ padding: "5px" }}
                    >
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={() =>
                          handleAddToCart(
                            productId,
                            item.price,
                            item.title,
                            item.image
                          )
                        }
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4>WishList is Empty ...</h4>
        </div>
      )}
      <hr></hr>
    </>
  );
};

export default Wishlist;
