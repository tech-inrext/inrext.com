"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

<<<<<<< HEAD
=======
import useEmployeeData from "../useEmployeeData";
import VisitingCardSkeleton from "../VisitingCardSkeleton";
>>>>>>> 5d57175fde2c8850d9a320ce510187e316660df5
import ErrorDisplay from "../ErrorDisplay";
import VisitingCardContent from "../VisitingCardContent";

interface Props {
  id: string;
}

<<<<<<< HEAD
const dummyUser = {
  name: "Prince Ojha",
  email: "princeojha783@gmail.com",
  phone: "7991961411",
  altPhone: "",
  designation: "SDE-1",
  photo: "https://i.postimg.cc/GhvkLtbT/Whats-App-Image-2026-03-13-at-17-54-31.jpg",
  specialization: "Software Development",
  company: "Inrext",
};

const VisitingCardClient: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  const user: typeof dummyUser = dummyUser;
  const error: string | null = null;
=======
const VisitingCardClient: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  const { user, loading, error } = useEmployeeData(id);
>>>>>>> 5d57175fde2c8850d9a320ce510187e316660df5

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    router.push("/");
  };

<<<<<<< HEAD
=======
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
          <Box display="flex" justifyContent="center">
            <Box width={{ xs: "100%", md: "50%", lg: "33%" }}>
              <Paper elevation={8} sx={{ overflow: "hidden", borderRadius: 2 }}>
                <VisitingCardSkeleton />
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

>>>>>>> 5d57175fde2c8850d9a320ce510187e316660df5
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
<<<<<<< HEAD
             <VisitingCardContent user={user as any} />
=======
              <VisitingCardContent user={user} />
>>>>>>> 5d57175fde2c8850d9a320ce510187e316660df5
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default VisitingCardClient;