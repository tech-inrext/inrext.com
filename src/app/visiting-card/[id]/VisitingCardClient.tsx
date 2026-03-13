"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import ErrorDisplay from "../ErrorDisplay";
import VisitingCardContent from "../VisitingCardContent";

interface Props {
  id: string;
}

const dummyUser = {
  name: "Prince Ojha",
  email: "princeojha783@gmail.com",
  phone: "7991961411",
  altPhone: "",
  designation: "SDE-1",
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
  specialization: "Software Development",
  company: "Inrext",
};

const VisitingCardClient: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  const [user] = useState(dummyUser);
  const [error] = useState<string | null>(null);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (error || !user) {
    return (
      <ErrorDisplay
        error={error || "User not found"}
        id={id}
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />
    );
  }

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
        <Box display="flex" justifyContent="center">
          <Box width={{ xs: "100%", md: "50%", lg: "33%" }}>
            <Paper elevation={8} sx={{ overflow: "hidden", borderRadius: 2 }}>
              <VisitingCardContent user={user} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default VisitingCardClient;