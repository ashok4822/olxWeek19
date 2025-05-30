import React, { useEffect , useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import mobileApp from "../assests/phone-app.webp";
import appleStore from "../assests/appstore_2x.webp";
import playStore from "../assests/playstore_2x.webp";
import downArrow from "../assests/downarrow.png";
import "../App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProductContext } from "../context/productContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  
  const {setProduct,userEmail} = useProductContext();

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product/getproducts");
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  useEffect(() => {
      console.log(localStorage.getItem("token"));
      
      // if(localStorage.getItem("token")){
      //   navigate('/')
      // }
      // else{
      //   navigate('/signup')
      // }

      navigate('/')

    },[])

    const productDetail = (product) => {
      setProduct(product);
      navigate("/productdetail");
    }
  return (
    <div>
        <Header/>
      <div className="categories">
        <div className="allCategory">
          <button className="all-cateogy-btn">ALL CATEGORIES</button>
          <img src={downArrow} alt="" height={25} width={25} />
        </div>
        <div className="category-list">
          <ul className="category-list-list">
            <li className="category-listitem">Cars</li>
            <li className="category-listitem">Motorcycles</li>
            <li className="category-listitem">Mobile Phones</li>
            <li className="category-listitem">
              For Sale: Houses & Appartment
            </li>
            <li className="category-listitem">Comercial & Other Vehicles</li>
            <li className="category-listitem">
              For Rent: Houses and Appartments
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="space"></div> */}
      <div className="products-wrapper">
        <div className="title-wrapper">
          <h2 className="products-title">Fresh recommendations</h2>
        </div>
        <div className="products">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => (
              <Card
                key={product._id}
                sx={{
                  width: { xs: 300, sm: 400, md: 270 },
                  height: 400,
                  position: "relative",
                }}
                className="card"
                onClick={() => productDetail(product)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.image}
                    alt={product.name}
                  />
                  <button
                    onClick={() => console.log("Icon clicked")}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    <FavoriteBorderIcon style={{ color: "gray" }} />
                  </button>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {product.description}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold", marginTop: "8px" }}>
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </div>
        <div className="load-more-btn-wrapper">
          <button className="load-more-btn">Load more</button>
        </div>
      </div>
      <div className="try-olx-app-wrapper">
        <div className="olx-app-img-wrapper">
          <img src={mobileApp} alt="" />
        </div>
        <div className="middle">
          <h2 className="try-olx-app">Try the olx app</h2>
          <p className="try-olx-para">
            Buy, sell and find just about anything using the app on your mobile.
          </p>
        </div>
        <hr />
        <div className="end">
          <h3>Get your app today</h3>
          <div className="mobile-app-images">
            <img src={appleStore} alt="" width={130} />
            <img src={playStore} alt="" width={130} />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
