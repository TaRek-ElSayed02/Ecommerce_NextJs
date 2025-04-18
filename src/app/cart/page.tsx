"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Typography, IconButton } from "@mui/material";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../../redux/cartSlice";
import Link from "next/link";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (productId: number) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: number) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + ((item.price || 0) * item.quantity);
  }, 0);

  const formatPrice = (price: number | undefined): string => {
    return (price || 0).toFixed(2);
  };

  return (
    <Box sx={{ padding: "20px", bgcolor: "#f5f5f5", borderRadius: "8px" }}>
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>Your Cart</Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          bgcolor: '#f8f9fa', 
          borderRadius: 2,
          border: '1px dashed #ddd' 
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#888', maxWidth: '400px', mx: 'auto' }}>
            Add items to your cart to proceed with your purchase
          </Typography>
          <Link href="/products" passHref>
            <Box 
              component="a"
              sx={{ 
                display: 'inline-block',
                bgcolor: '#ffcc00', 
                color: '#000', 
                padding: '12px 24px',
                borderRadius: '2px',
                fontWeight: 'bold',
                textAlign: 'center',
                textDecoration: 'none',
                '&:hover': { bgcolor: '#e6b800' }
              }}
            >
              Explore Products
            </Box>
          </Link>
        </Box>
      ) : (
        <>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              {/* Item Image */}
              <Box sx={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: "100%", objectFit: "cover", borderRadius: "8px" }} />
              </Box>

              {/* Item Details */}
              <Box sx={{ flex: 1, marginLeft: "20px" }}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">Product ID: {item.id}</Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
                  ${formatPrice(item.price)} each
                </Typography>
              </Box>

              {/* Price and Quantity Control */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: "10px" }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  ${(item.price || 0) * item.quantity}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  ${formatPrice(item.price)} × {item.quantity}
                </Typography>
              </Box>

              {/* Quantity Control and Remove Button */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => handleDecreaseQuantity(item.id)} sx={{ color: "#888" }} disabled={item.quantity === 1}>
                  -
                </IconButton>
                <Typography variant="body1" sx={{ margin: "0 10px" }}>{item.quantity}</Typography>
                <IconButton onClick={() => handleIncreaseQuantity(item.id)} sx={{ color: "#888" }}>
                  +
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="error"
                  sx={{ marginLeft: "10px" }}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </IconButton>
              </Box>
            </Box>
          ))}
        </>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}
      >
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Cart;
