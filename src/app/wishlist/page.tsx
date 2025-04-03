'use client';

import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Container, Grid, Card, CardContent, Button, IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToCartButton from "../../components/AddToCart";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import { useEffect } from "react";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    console.log("Wishlist items:", wishlistItems);
  }, [wishlistItems]);

  const handleRemoveFromWishlist = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ 
          mb: 4, 
          fontWeight: 'bold', 
          color: '#333', 
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: '60px',
            height: '3px',
            backgroundColor: '#ffcc00',
            margin: '10px auto 0'
          }
        }}
      >
        My Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          bgcolor: '#f8f9fa', 
          borderRadius: 2,
          border: '1px dashed #ddd' 
        }}>
          <Box sx={{ mb: 3 }}>
            <FavoriteIcon sx={{ fontSize: 60, color: '#ddd' }} />
          </Box>
          <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#888', maxWidth: '400px', mx: 'auto' }}>
            Add items to your wishlist to keep track of products you love
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href="/products"
            sx={{ 
              bgcolor: '#ffcc00', 
              color: '#000', 
              '&:hover': { bgcolor: '#e6b800' },
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold'
            }}
          >
            Explore Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {wishlistItems.filter(item => item.id && item.image && item.title && item.price).map((item) => (
            <Grid item key={item.id}>
              <Card
                sx={{ 
                  width: 280,  
                  height: 400, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)' 
                  } 
                }}
              >
                <Box sx={{ position: 'relative', height: 220 }}>  
                  <Link href={`/product-details/${item.id}`} style={{ textDecoration: 'none' }}>
                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                      <Image
                        src={item.image || "/placeholder.jpg"} 
                        alt={item.title || "Product Image"}
                        fill
                        style={{ objectFit: 'contain', padding: '20px' }}
                        priority
                      />
                    </Box>
                  </Link>
                  
                  <Tooltip title="Remove from wishlist">
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        '&:hover': { 
                          bgcolor: 'rgba(255,255,255,1)',
                          transform: 'scale(1.1)' 
                        },
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <CardContent sx={{ 
                  flexGrow: 1, 
                  textAlign: 'center', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2,
                  height: 100 
                }}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#333',
                        height: '40px',  
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.2
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 2, 
                        color: '#333', 
                        fontWeight: 'bold',
                        fontSize: '1.4rem',
                        height: '1px'  
                      }}
                    >
                      ${item.price}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <AddToCartButton
                      productId={item.id}
                      productImage={item.image}
                      productTitle={item.title}
                      productPrice={item.price}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}