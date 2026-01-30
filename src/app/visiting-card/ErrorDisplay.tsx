"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Refresh, Home } from "@mui/icons-material";

interface ErrorDisplayProps {
  error: string;
  id: string;
  onRetry: () => void;
  onGoHome: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  id,
  onRetry,
  onGoHome,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || "User not found"}
        </Alert>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Employee ID: <strong>{id}</strong>
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            onClick={onRetry}
            startIcon={<Refresh />}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            onClick={onGoHome}
            startIcon={<Home />}
          >
            Go Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorDisplay;