import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "../components/navbar";
import { Button, Card, Spinner, Row, Col } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { UserContext } from "../App";

const Product = () => {
  const { setContext, like, setLike } = useContext(UserContext);
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const BASE_URL = `https://fakestoreapi.com/products/${product_id}`;
    try {
      const response = await axios.get(BASE_URL);
      const productData = response.data;
      console.log(productData);
      setProduct(productData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderStarRating = (rating) => {
    const roundedRating = Math.round(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push("⭐");
      } else {
        stars.push("");
      }
    }

    return stars.join(" ");
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
    console.log(productId);
  };

  const handleToggleLike = (productId, price, title, image) => {
    if (like[productId]) {
      const newLike = { ...like };
      delete newLike[productId];
      setLike(newLike);
    } else {
      setLike((prevLike) => ({
        ...prevLike,
        [productId]: { price, title, image },
      }));
    }
  };

  return (
    <>
      <NavbarComponent />
      <br />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Card style={{ margin: "0 auto", width: "95%" }}>
          <div
            style={{
              display: "flex",
              width: "99%",
              justifyContent: "end",
              position: "relative",
              top: "16px",
              right: "16px"
            }}
          >
            {like[product.id] ? (
              <HeartFill
                size={30}
                onClick={() =>
                  handleToggleLike(
                    product.id,
                    product.price,
                    product.title,
                    product.image
                  )
                }
                style={{ color: "#ff4d4d", cursor: "pointer" }}
              />
            ) : (
              <Heart
                size={30}
                onClick={() =>
                  handleToggleLike(
                    product.id,
                    product.price,
                    product.title,
                    product.image
                  )
                }
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          <Row>
            <Col md={4}>
              <Card.Img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  height: "350px",
                  padding: "10px",
                }}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Text>Product ID: {product.id}</Card.Text>
                <Card.Text className="h3">{product.title}</Card.Text>
                <br />
                <Card.Text className="h5">{product.description}</Card.Text>
                <br />
                <Card.Text className="h5">
                  Category: {product.category}
                </Card.Text>
                <Card.Text className="h4">Price: ${product.price}</Card.Text>
                {product.rating && (
                  <Card.Text>
                    Ratings: {product.rating.rate}
                    {renderStarRating(product.rating.rate)} (Rated by:{" "}
                    {product.rating.count} Users)
                  </Card.Text>
                )}

                <div className="d-grid row gy-3 mt-auto  w-100">
                  <Button style={{ width: "300px" }}>Buy Now</Button>
                  <Button
                    variant="warning"
                    style={{ width: "300px" }}
                    onClick={() =>
                      handleAddToCart(
                        product.id,
                        product.price,
                        product.title,
                        product.image
                      )
                    }
                  >
                    Add To Cart
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

export default Product;
