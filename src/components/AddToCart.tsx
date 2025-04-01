"use client";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

interface AddToCartButtonProps {
  productId: number;
  productImage: string;
  productTitle: string;
  productPrice: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  productId, 
  productImage, 
  productTitle ,
  productPrice
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id: productId, imageUrl: productImage, name: productTitle, price: productPrice }));
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={handleAddToCart}
      sx={{
        borderRadius: "6px",
        textTransform: "none",
        fontWeight: "bold",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        },
      }}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
