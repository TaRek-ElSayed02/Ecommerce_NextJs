'use client';

import { Box, Typography, IconButton, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, decrementQuantity } from "../redux/cartSlice";
import { RootState } from "../redux/store";

const ClientCart: React.FC = () => {    
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (item: { id: number; imageUrl: string; name: string; price: number }) => {
    dispatch(addToCart({ 
      id: item.id, 
      imageUrl: item.imageUrl, 
      name: item.name,
      price: item.price,
    }));
  };

  const handleDecreaseQuantity = (productId: number) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Box sx={{ padding: "20px", bgcolor: "#f5f5f5", borderRadius: "8px" }}>
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>Your Cart</Typography>

      {cartItems.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        cartItems.map((item) => (
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
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {/* Item Image */}
            <Box sx={{ width: "80px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Using next/image here */}
              <img src={item.imageUrl} alt={item.name} style={{ width: "100%", objectFit: "cover", borderRadius: "8px" }} />
            </Box>

            {/* Item Details */}
            <Box sx={{ flex: 1, marginLeft: "20px" }}>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">Product ID: {item.id}</Typography>
            </Box>

            {/* Quantity Control and Remove Button */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => handleDecreaseQuantity(item.id)} sx={{ color: "#888" }} disabled={item.quantity === 1}>
                -
              </IconButton>
              <Typography variant="body1" sx={{ margin: "0 10px" }}>{item.quantity}</Typography>
              <IconButton onClick={() => handleIncreaseQuantity(item)} sx={{ color: "#888" }}>
                +
              </IconButton>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginLeft: "10px" }}
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ClientCart;