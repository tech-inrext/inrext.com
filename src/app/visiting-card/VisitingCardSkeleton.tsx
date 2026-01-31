"use client";

import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const VisitingCardSkeleton: React.FC = () => {
  return (
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
      {/* Background with Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(28, 79, 163, 0.8) 0%, rgba(11, 44, 102, 0.85) 40%, rgba(0, 0, 0, 0.95) 100%)",
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
        {/* Logo Skeleton */}
        <Box sx={{ pt: 4, px: 3, textAlign: "center" }}>
          <Box
            sx={{
              height: 25,
              width: 120,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              animation: "pulse 1.5s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 },
              },
            }}
          />
        </Box>

        {/* Profile Section */}
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
          {/* Avatar Skeleton */}
          <Box
            sx={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: "5px",
              bgcolor: "rgba(255, 255, 255, 0.05)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />

          {/* Name Skeleton */}
          <Box
            sx={{
              mt: 2,
              width: "60%",
              height: 20,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </Box>

        {/* Designation Section Skeleton */}
        <Box
          sx={{
            textAlign: "center",
            px: 3,
            mt: "-8rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: 18,
              mx: "auto",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              mb: 1,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <Divider
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              width: "65%",
              mx: "auto",
              height: "1px",
              my: 1,
            }}
          />
          <Box
            sx={{
              width: "45%",
              height: 18,
              mx: "auto",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </Box>

        {/* Contact Icons Skeleton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 5,
            px: 3,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "rgba(255, 255, 255, 0.2)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </Box>

        {/* Address Skeleton */}
        <Box
          sx={{
            mt: "auto",
            pb: 6,
            px: 3,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "70%",
              height: 14,
              mx: "auto",
              mb: 0.5,
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              width: "60%",
              height: 14,
              mx: "auto",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default VisitingCardSkeleton;