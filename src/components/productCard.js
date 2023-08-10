import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../App";
import { HeartFill, Heart } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setContext, like, setLike } = useContext(UserContext);
  console.log(like);

  const MyStyles = {
    img: {
      height: "200px",
      width: "200px",
    },
  };
  const navigate = useNavigate();

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
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

  const fetchData = async () => {
    const BASE_URL = "https://fakestoreapi.com/products";
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
  }, []);
  ///////////////////////////////////////////////////// Star Rating
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
  ////////////////////////////////////////////////////// Star Rating
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Container>
          <Row className="row gy-4">
            {product.map((pro) => (
              <Col key={pro.id} xs={12} sm={6} md={3}>
                <Card
                  className="d-flex align-items-center h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewProduct(pro.id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      width: "96%",
                      position: "relative",
                      top: "10px",
                      right: "10px"
                    }}
                  >
                    {like[pro.id] ? (
                      <HeartFill
                        size={30}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleLike(
                            pro.id,
                            pro.price,
                            pro.title,
                            pro.image
                          );
                        }}
                        style={{ color: "#ff4d4d", cursor: "pointer" }}
                      />
                    ) : (
                      <Heart
                        size={30}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleLike(
                            pro.id,
                            pro.price,
                            pro.title,
                            pro.image
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>

                  <Card.Img
                    variant="top"
                    src={pro.image}
                    className="img-fluid"
                    style={MyStyles.img}
                  />

                  <Card.Body className="d-flex flex-column w-100">
                    <Card.Title className="text-truncate">
                      {pro.title}
                    </Card.Title>
                    <Card.Text className="text-truncate">
                      {pro.description}
                    </Card.Text>
                    <h5>Category: {pro.category}</h5>
                    <h6>
                      Ratings: {pro.rating.rate}
                      {renderStarRating(pro.rating.rate)}
                    </h6>
                    <h6>Rated By: ({pro.rating.count} Users)</h6>
                    <h3>Price: ${pro.price}</h3>
                    <div
                      className="d-grid row gy-3 mt-auto"
                      style={{ padding: "5px" }}
                    >
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(
                            pro.id,
                            pro.price,
                            pro.title,
                            pro.image
                          );
                        }}
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
      )}
    </>
  );
};

export default ProductCard;
