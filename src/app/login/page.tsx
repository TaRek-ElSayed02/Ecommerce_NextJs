"use client"; // Ensures the component is treated as a client-side component

import { FC, useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signIn, signOut, useSession } from "next-auth/react"; // Import useSession and signOut

const AuthPage: FC = () => {
  const { data: session } = useSession(); // Get session data from next-auth

  // Trigger sign-in with the specified provider (Google or Facebook)
  const handleSignIn = (provider: string) => {
    signIn(provider); 
  };

  // Trigger sign-out
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" }); 
  };

  if (session?.user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          bgcolor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Welcome, {session.user?.name}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{
            marginTop: "15px",
            width: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>
    );
  } else {
    // Show login page if user is not logged in
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          bgcolor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Log In
        </Typography>

        {/* Google Sign-In Button */}
        <Button
          variant="contained"
          color="error"
          sx={{
            marginBottom: "15px",
            width: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => handleSignIn("google")}
        >
          <GoogleIcon sx={{ marginRight: "10px" }} />
          Sign in with Google
        </Button>

        {/* Facebook Sign-In Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginBottom: "15px",
            width: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => handleSignIn("facebook")}
        >
          <FacebookIcon sx={{ marginRight: "10px" }} />
          Sign in with Facebook
        </Button>
      </Box>
    );
  }
};

export default AuthPage;
