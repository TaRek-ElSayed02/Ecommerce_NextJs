'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import AddToCartButton from '@/components/AddToCart';
import ReadMore from '@/components/ReadMore'; // Import ReadMore component

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" color="error">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mt: 5 }}>
        {/* Product Image */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Image 
            src={product.image} 
            alt={product.title} 
            width={300} 
            height={300} 
            style={{ objectFit: 'contain', borderRadius: '8px' }}
            priority 
          />
        </Box>

        {/* Product Details */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {product.title}
          </Typography>

          {/* Use ReadMore Component */}
          <ReadMore text={product.description} />

          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
            ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ color: '#777', mb: 2 }}>
            Rating: ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </Typography>

          {/* Add to Cart Button */}
          <AddToCartButton 
            productId={product.id} 
            productImage={product.image} 
            productTitle={product.title} 
            productPrice={product.price} 
          />
        </Box>
      </Box>
    </Container>
  );
}
