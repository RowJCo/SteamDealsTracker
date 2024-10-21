import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Header from "../components/HeaderHome.jsx";
import Footer from "../components/Footer.jsx";
import Content from "../components/Content.jsx";

const SignUpPage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (user) => {
      return fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    },
    onSuccess: () => {
      navigate("/sign-in");
    },
    onError: (error) => {
      console.error("Error signing up:", error.message);
    },
  });

  const handleSignUp = (user) => {
    mutation.mutate(user);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Content>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <AuthForm onSubmit={handleSignUp} buttonText="Sign Up" />
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default SignUpPage;
