import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import logo from "../assests/olxlogodark.png";
import search from "../assests/searchicon.png";
import downArrow from "../assests/downarrow.png";
import sell from "../assests/screenshot.PNG";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
   const[status,setStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(""); 
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Open and close modal handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenLogoutModal = () => setOpenLogoutModal(true);
  const handleCloseLogoutModal = () => setOpenLogoutModal(false);

  // Handle form submission with API call
  const handleAddProduct = async () => {
    handleCloseModal();
    const formData = {
      name: name,
      description: description,
      price: price,
      image: image,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/product/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSnackbar({
        open: true,
        message: "Product added successfully!",
        severity: "success",
      });

      console.log("Product added successfully:", response.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      handleOpenModal();
      setSnackbar({
        open: true,
        message: "All fields required",
        severity: "error",
      });
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
      setError("Failed to add product. Please try again.");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };



  useEffect(()=>{
      let res = localStorage.getItem("token");
      if(res){
        setStatus(true);
      }
    },[]);

  return (
    <div>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="Logo" height={50} width={50} />
        </div>
        <div className="inputs">
          <div className="state">
            <button className="header-transparant-btn-left">
              <img
                src={search}
                alt=""
                height={20}
                width={20}
                className="seatchImg"
              />
            </button>
            <input type="text" placeholder="India" className="searchstate" />
            <button className="header-transparant-btn-right">
              <img src={downArrow} alt="" height={25} width={25} />
            </button>
          </div>

          <div className="find-items">
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
              className="searchProducts"
            />
            <button className="search-btn">
              <img src={search} alt="" />
            </button>
          </div>
        </div>
        <div className="language">
          <button className="language-btn">English</button>
          <img src={downArrow} alt="Arrow" height={25} width={25} />
        </div>
        <div>{status?<div className="header-btns">
          <button className="logout-btn" onClick={handleOpenLogoutModal}>
            Logout
          </button>
          <button className="sell-btn" onClick={handleOpenModal}>
            <img src={sell} alt="Sell" height={50} width={110} />
          </button>
        </div>:<></>}</div>
        
        
      </div>

      {/* Modal for adding product */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Product
          </Typography>

          <TextField
            fullWidth
            label="Product Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            name="image"
            style={{ marginTop: "16px", marginBottom: "16px" }}
            required
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            fullWidth
          >
            Add Product
          </Button>
        </Box>
      </Modal>

      {/* Logout confirmation modal */}
      <Modal open={openLogoutModal} onClose={handleCloseLogoutModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Are you sure you want to logout?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ mr: 2 }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseLogoutModal}
          >
            No
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
