import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    let userData = {
      "username": username,
      "email": email,
      "password": password,
      "confirmpassword": confirmPassword
    }
    axios.post('http://localhost:8080/api/user', userData)
    .then((res) => {
      setOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 1000); 
      console.log(res.data.token);
      localStorage.setItem("token",res.data.token);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response?.data?.message || "Invalid credentials!");
    })
  }

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    
    if(localStorage.getItem("token")){
      navigate('/')
    }
  },[])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Toast success */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Registered successful.
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography> 
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth   
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type='email'
                  name="email"
                  // autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
