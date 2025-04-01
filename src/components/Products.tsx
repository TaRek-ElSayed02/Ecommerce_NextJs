'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, Typography, Box, Grid, Container } from "@mui/material";
import AddToCartButton from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "40px",
            fontWeight: "bold",
            color: '#333',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}
        >
          Our Collection
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    width: '250px',
                    height: '450px',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "15px",
                    bgcolor: '#ffffff',
                    color: '#333',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  <Box sx={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mb: 1
                  }}>
                    <AddToWishlist productId={product.id}
                      productTitle={product.title}
                      productImage={product.image}
                      productPrice={product.price} />
                  </Box>
                  <Link href={`/product-details/${product.id}`} passHref style={{ textDecoration: 'none' }}>
                    <Box sx={{
                      width: '220px',
                      height: '220px',
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      mb: 2,
                      bgcolor: '#fff',
                      cursor: 'pointer'
                    }}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={150}
                        height={150}
                        style={{
                          objectFit: "contain",
                          borderRadius: '8px',
                          width: '100%',
                          height: '100%'
                        }}
                        priority
                      />
                    </Box>
                  </Link>
                  <CardContent sx={{ textAlign: "center", width: '100%', p: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: '#333',
                        mb: 2,
                        height: '50px',
                        overflow: 'hidden'
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "18px",
                        color: '#333',
                        fontWeight: 'bold',
                        mb: 2
                      }}
                    >
                      ${product.price}
                    </Typography>
                    <AddToCartButton productId={product.id} productImage={product.image} productTitle={product.title} productPrice={product.price} />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
