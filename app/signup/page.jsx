import React from "react";
import SignUpForm from "../../components/SignUpForm";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl text-center py-2">
        Create an account <strong>here</strong>.
      </h1>
      <SignUpForm />
    </div>
  );
}
