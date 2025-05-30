import React from "react";
import "../styles/productDetail.css";
import { useProductContext } from "../context/productContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductDetailPage = () => {
  const { product } = useProductContext();

  if (!product) {
    return (
      <div>
        No product selected. Please select a product from the home page.
      </div>
    );
  }

  return (
    <>
    <Header/>
      <div className="product-detail-page">
        <div className="product-images">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p>Price: ₹{product.price}</p>
          <p>Description: {product.description}</p>

          <div className="contact-seller">
            <h3>Contact Seller</h3>
            <button>Send Message</button>
            <button>Call Seller</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductDetailPage;
