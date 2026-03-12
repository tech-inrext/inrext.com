"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Grid";

import useEmployeeData from "./useEmployeeData";
import VisitingCardSkeleton from "./VisitingCardSkeleton";
import ErrorDisplay from "./ErrorDisplay";
import VisitingCardContent from "./VisitingCardContent";

const VisitingCardPageClient = ({ id }: { id: string }) => {
  const router = useRouter();

  console.log("VisitingCardPageClient received ID:", id);

  const { user, loading, error } = useEmployeeData(id);

  useEffect(() => {
    console.log("Employee ID:", id);
    console.log("Loading:", loading);
    console.log("User Data:", user);
    console.log("Error:", error);
  }, [id, loading, user, error]);

  const handleRetry = () => {
    console.log("Retry clicked");
    window.location.reload();
  };

  const handleGoHome = () => {
    console.log("Redirecting to home");
    router.push("/");
  };

  if (loading) {
    console.log("Showing Skeleton Loader");
    return <VisitingCardSkeleton />;
  }

  if (error || !user) {
    console.log("Error or user not found:", error);
    return (
      <ErrorDisplay
        error={error || "User not found"}
        id={id}
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />
    );
  }

  console.log("Rendering VisitingCardContent with user:", user);

  return <VisitingCardContent user={user} />;
};

export default VisitingCardPageClient;