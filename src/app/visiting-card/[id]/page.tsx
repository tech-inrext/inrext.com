"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// MUI Imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid2 from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import {
  Email,
  Phone,
  WhatsApp,
  Language,
  BusinessCenter,
  Refresh,
  Home,
} from "@mui/icons-material";

interface User {
  _id: string;
  name: string;
  designation?: string;
  photo?: string;
  email?: string;
  phone?: string;
  altPhone?: string;
  specialization?: string;
}

const VisitingCardPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  
  const id = params?.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("🔄 Component mounted with ID:", id);
    
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          setError("No employee ID provided");
          return;
        }

        // Use relative path - this will use the same origin as the frontend
        const apiUrl = `/api/v0/public/employee/${id}`;
        console.log(`📡 Fetching from: ${apiUrl}`);
        
        const response = await axios.get(apiUrl, {
          timeout: 10000,
        });

        console.log("📥 API Response:", response.data);

        if (response.data.success && response.data.data) {
          setUser(response.data.data);
        } else {
          setError(response.data.error || "Employee not found");
        }
      } catch (error: any) {
        console.error("❌ Fetch error:", error);
        setError(error.message || "Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    } else {
      setError("Please provide an employee ID in the URL");
      setLoading(false);
    }
  }, [id]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body1" color="text.secondary">
          Loading visiting card...
        </Typography>
      </Box>
    );
  }

  if (error || !user) {
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
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              onClick={handleRetry}
              startIcon={<Refresh />}
            >
              Try Again
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleGoHome}
              startIcon={<Home />}
            >
              Go Home
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  const whatsappNumber = user?.altPhone || user?.phone;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#242424",
        py: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container justifyContent="center">
          <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper
              elevation={8}
              sx={{
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <Box id="visiting-card">
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "auto",
                    aspectRatio: "9 / 16",
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: "#1a1a1a",
                    color: "white",
                  }}
                >
                  {/* Background Image with Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundImage: "url(https://inrext.s3.ap-south-1.amazonaws.com/Static+Assets/digital-visiting-card_BG.jpg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(180deg, rgba(28, 79, 163, 0.8) 0%, rgba(11, 44, 102, 0.85) 40%, rgba(0, 0, 0, 0.95) 100%)",
                      },
                    }}
                  />

                  {/* Content Container */}
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {/* Logo */}
                    <Box
                      sx={{
                        pt: 4,
                        px: 3,
                        textAlign: "center",
                        zIndex: 2,
                      }}
                    >
                      <img
                        src="/images/inrext-white-logo.png"
                        alt="Inrext Logo"
                        style={{ height: 25 }}
                      />
                    </Box>

                    {/* Inverted Triangle Section with Profile */}
                    <Box
                      sx={{
                        position: "relative",
                        height: 480,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        pt: 4,
                      }}
                    >
                      {/* Inverted Triangle Background */}
                      <Box
                        sx={{
                          position: "absolute",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 0,
                          height: 0,
                          borderLeft: "450px solid transparent",
                          borderRight: "450px solid transparent",
                          borderTop: "520px solid rgba(28, 79, 163, 0.35)",
                          filter: "drop-shadow(0 10px 42px rgba(0,0,0,0.65))",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            left: "-440px",
                            top: "-510px",
                            width: 0,
                            height: 0,
                            borderLeft: "440px solid transparent",
                            borderRight: "440px solid transparent",
                            borderTop: "510px solid rgba(28, 79, 163, 0.35)",
                          },
                        }}
                      />

                      {/* Profile Image */}
                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          borderRadius: "50%",
                          border: "1px solid #ffffff",
                          padding: "5px",
                        }}
                      >
                        <Avatar
                          src={user?.photo || ""}
                          sx={{
                            width: 120,
                            height: 120,
                            "& img": {
                              objectFit: "cover",
                              objectPosition: "top",
                            },
                          }}
                        >
                          {!user?.photo && user?.name?.[0]}
                        </Avatar>
                      </Box>

                      {/* Name */}
                      <Typography
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          mt: 2,
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          px: 2,
                          textAlign: "center",
                          whiteSpace: "pre-line",
                          lineHeight: 1.2,
                        }}
                      >
                        {user?.name
                          ?.split(" ")
                          .map((word, i) => (i === 2 ? `\n${word}` : word))
                          .join(" ")}
                      </Typography>
                    </Box>

                    {/* Designation Section */}
                    <Box
                      sx={{
                        textAlign: "center",
                        px: 3,
                        mt: "-8rem",
                      }}
                    >
                      {/* Designation with Briefcase Icon */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <BusinessCenter
                          sx={{
                            fontSize: "1.1rem",
                            opacity: 0.9,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "1.05rem",
                            fontWeight: 400,
                          }}
                        >
                          {user?.designation || "Professional"}
                        </Typography>
                      </Box>

                      {/* Horizontal Divider */}
                      <Divider
                        sx={{
                          bgcolor: "rgba(255,255,255,0.35)",
                          width: "65%",
                          mx: "auto",
                          height: "1px",
                          my: 0.8,
                        }}
                      />

                      {/* Specialization with Briefcase Icon */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "1.05rem",
                            fontWeight: 400,
                          }}
                        >
                          {user?.specialization || "Expert"}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Contact Icons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        mt: 5,
                        px: 3,
                      }}
                    >
                      {user?.phone && (
                        <IconButton
                          component="a"
                          href={`tel:${user?.phone}`}
                          sx={{
                            bgcolor: "white",
                            color: "#333",
                            width: 50,
                            height: 50,
                            "&:hover": {
                              bgcolor: "rgba(255, 255, 255, 0.9)",
                              transform: "translateY(-3px)",
                            },
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
                          }}
                        >
                          <Phone sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                      )}

                      {whatsappNumber && (
                        <IconButton
                          component="a"
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            bgcolor: "white",
                            color: "#333",
                            width: 50,
                            height: 50,
                            "&:hover": {
                              bgcolor: "rgba(255, 255, 255, 0.9)",
                              transform: "translateY(-3px)",
                            },
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
                          }}
                        >
                          <WhatsApp sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                      )}

                      {user?.email && (
                        <IconButton
                          component="a"
                          href={`mailto:${user?.email}`}
                          sx={{
                            bgcolor: "white",
                            color: "#333",
                            width: 50,
                            height: 50,
                            "&:hover": {
                              bgcolor: "rgba(255, 255, 255, 0.9)",
                              transform: "translateY(-3px)",
                            },
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
                          }}
                        >
                          <Email sx={{ fontSize: "1.5rem" }} />
                        </IconButton>
                      )}

                      <IconButton
                        component="a"
                        href="https://www.inrext.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          bgcolor: "white",
                          color: "#333",
                          width: 50,
                          height: 50,
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.9)",
                            transform: "translateY(-3px)",
                          },
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <Language sx={{ fontSize: "1.5rem" }} />
                      </IconButton>
                    </Box>

                    {/* Address */}
                    <Box
                      sx={{
                        mt: "auto",
                        pb: 6,
                        px: 3,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          opacity: 0.9,
                          fontSize: "0.875rem",
                          lineHeight: 1.2,
                          letterSpacing: "0.02em",
                        }}
                      >
                        3rd Floor, D4, Block-D, Sector 10,
                        <br />
                        Noida, Uttar Pradesh-201301
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default VisitingCardPage;
