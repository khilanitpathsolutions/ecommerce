import React from 'react';
import NavbarComponent from '../components/navbar';
import ImageSwiper from '../components/swiper';
import ProductCard from '../components/productCard';
import { Button } from 'react-bootstrap';

const Home = () => {
  return (
    <>
     <NavbarComponent />
     <ImageSwiper />
     <h3 style={{justifyContent: "center", display: "flex", fontFamily: 'cursive'}}>Products Cards</h3>
     <ProductCard />
     <div style={{display:"flex",justifyContent:"end",margin: "5px"}}>
     <Button onClick={()=>window.scrollTo({top: 0, behaviour: "smooth"})}>↑</Button>
     </div>
     <hr></hr>
    </>
  );
};

export default Home;
