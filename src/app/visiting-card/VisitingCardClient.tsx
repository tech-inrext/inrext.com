"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import useEmployeeData from "./useEmployeeData";
import VisitingCardSkeleton from "./VisitingCardSkeleton";
import ErrorDisplay from "./ErrorDisplay";
import VisitingCardContent from "./VisitingCardContent";

interface Props {
  id: string;
}

const VisitingCardClient: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  const { user, loading, error } = useEmployeeData(id);

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
          minHeight: "100vh",
          bgcolor: "#242424",
          py: { xs: 2, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Paper elevation={8} sx={{ overflow: "hidden", borderRadius: 2 }}>
                <VisitingCardSkeleton />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

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
        <Grid container justifyContent="center">
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper elevation={8} sx={{ overflow: "hidden", borderRadius: 2 }}>
              <VisitingCardContent user={user} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisitingCardClient;