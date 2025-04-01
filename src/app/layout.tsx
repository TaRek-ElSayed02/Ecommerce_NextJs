"use client";

import { Provider } from "react-redux";
import store from "../redux/store";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from "@mui/material";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import CartIcon from "@/components/cartIcon";
import { metadata } from "@/app/metadata"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <html lang="en" dir="ltr">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Navbar */}
            <AppBar position="static" sx={{ bgcolor: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, fontWeight: "bold", color: "#333", letterSpacing: "1px" }}
                >
                  FashionHub
                </Typography>
                <Button color="inherit" component={Link} href="/" sx={{ color: "#333", "&:hover": { color: "#666" } }}>
                  Home
                </Button>
                <Button color="inherit" component={Link} href="/products" sx={{ color: "#333", "&:hover": { color: "#666" } }}>
                  Shop
                </Button>
                <Button color="inherit" component={Link} href="/category" sx={{ color: "#333", "&:hover": { color: "#666" } }}>
                  Categories
                </Button>
                <Button color="inherit" component={Link} href="/wishlist" sx={{ color: "#333", "&:hover": { color: "#666" } }}>
                  Wish List
                </Button>
                <CartIcon /> {/* ✅ Cart Badge */}
                <IconButton color="inherit" component={Link} href="/account" sx={{ color: "#333" }}>
                  <PersonIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container component="main" sx={{ flex: 1, py: 4 }}>
              {children}
            </Container>

            {/* Footer */}
            <Box
              component="footer"
              sx={{
                bgcolor: "#ffffff",
                color: "#333",
                py: 4,
                mt: "auto",
                boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Container>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Typography variant="body2">© {new Date().getFullYear()} FashionHub. All rights reserved.</Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      variant="body2"
                      component={Link}
                      href="/about"
                      sx={{ color: "#333", textDecoration: "none", "&:hover": { color: "#666" } }}
                    >
                      About Us
                    </Typography>
                    <Typography
                      variant="body2"
                      component={Link}
                      href="/contact"
                      sx={{ color: "#333", textDecoration: "none", "&:hover": { color: "#666" } }}
                    >
                      Contact
                    </Typography>
                    <Typography
                      variant="body2"
                      component={Link}
                      href="/shipping"
                      sx={{ color: "#333", textDecoration: "none", "&:hover": { color: "#666" } }}
                    >
                      Shipping Info
                    </Typography>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
        </body>
      </html>
    </Provider>
  );
}
