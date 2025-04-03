"use client";

import { Provider } from "react-redux";
import store from "../redux/store";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import CartIcon from "@/components/cartIcon";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/category" },
  { label: "Wish List", href: "/wishlist" },
];

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping Info", href: "/shipping" },
];

export default function ClientWrapper({ children, session }: { children: React.ReactNode; session: any }) {
  const nav = [...navLinks];

  if (session?.user) nav.push({ label: "Logout", href: "/login" });
  else nav.push({ label: "Login", href: "/login" });

  return (
    <Provider store={store}>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Navbar */}
        <AppBar position="static" sx={{ bgcolor: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold", color: "#333", letterSpacing: "1px" }}>
              FashionHub
            </Typography>
            {nav.map(({ label, href }) => (
              <Button key={href} color="inherit" component={Link} href={href} sx={{ color: "#333", "&:hover": { color: "#666" } }}>
                {label}
              </Button>
            ))}

            {session?.user?.image && (
              <Image 
                src={session.user.image} 
                alt="User Profile" 
                width={30} 
                height={30} 
                style={{ borderRadius: "50%" }} 
                priority 
              />
            )}

            <CartIcon />
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
        <Box component="footer" sx={{ bgcolor: "#ffffff", color: "#333", py: 4, mt: "auto", boxShadow: "0 -2px 4px rgba(0,0,0,0.1)" }}>
          <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
              <Typography variant="body2">© {new Date().getFullYear()} FashionHub. All rights reserved.</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {footerLinks.map(({ label, href }) => (
                  <Typography key={href} variant="body2" component={Link} href={href} sx={{ color: "#333", textDecoration: "none", "&:hover": { color: "#666" } }}>
                    {label}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Provider>
  );
}
