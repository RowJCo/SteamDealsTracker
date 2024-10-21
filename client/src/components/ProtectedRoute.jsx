import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ProtectedRoute = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    data: isAuthenticated,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("/api/auth/check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("User not authenticated");
      }
      const data = await response.json();
      return data.isAuthenticated;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
