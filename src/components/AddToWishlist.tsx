import { useEffect, useState } from "react";
import { IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";

interface AddToWishlistProps {
  productId: number;
  productTitle: string;
  productImage: string;
  productPrice: number;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
}

export default function AddToWishlist({ 
  productId, 
  productTitle, 
  productImage, 
  productPrice,
  size = "medium",
  color = "primary"
}: AddToWishlistProps) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const exists = wishlist.some((item) => item.id === productId);
    setIsWishlisted(exists);
  }, [wishlist, productId]);

  const handleToggleWishlist = (event: React.MouseEvent) => {
    // Prevent event bubbling to parent elements (like Link components)
    event.stopPropagation();
    event.preventDefault();
    
    try {
      if (isWishlisted) {
        dispatch(removeFromWishlist(productId));
        setSnackbarMessage("Item removed from wishlist");
      } else {
        // Validate product data before adding
        if (!productId || !productTitle || !productImage || productPrice === undefined) {
          console.error("Invalid product data:", { productId, productTitle, productImage, productPrice });
          setSnackbarMessage("Could not add to wishlist: Missing product data");
        } else {
          dispatch(addToWishlist({ 
            id: productId, 
            title: productTitle, 
            image: productImage, 
            price: productPrice 
          }));
          setSnackbarMessage("Added!");
        }
      }
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setSnackbarMessage("Error updating wishlist");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Tooltip title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}>
        <IconButton 
          onClick={handleToggleWishlist} 
          color={isWishlisted ? color : "default"}
          size={size}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          sx={{
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={isWishlisted ? "error" : "success"} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}