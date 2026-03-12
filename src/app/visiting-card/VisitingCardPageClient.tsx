"use client";

import React from "react";
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
  const { user, loading, error } = useEmployeeData(id);

  const handleRetry = () => window.location.reload();
  const handleGoHome = () => router.push("/");

  if (loading) {
    return <VisitingCardSkeleton />;
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

  return <VisitingCardContent user={user} />;
};

export default VisitingCardPageClient;