import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderHome.jsx";
import Footer from "../components/Footer.jsx";
import Content from "../components/Content.jsx";

const SignOutPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to sign out");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries("auth");
      navigate("/sign-in");
    },
    onError: (error) => {
      console.error("Error signing out:", error.message);
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Content>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Signed Out.</h1>
          </div>
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default SignOutPage;
