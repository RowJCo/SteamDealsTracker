"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "../actions/userController.js";

export default function SignUpForm() {
  const [formState, formAction] = useFormState(signUp, {});
  console.log(formState);

  return (
    <form action={formAction} className="max-w-xs mx-auto">
      <div className="mb-3">
        <input
          name="email"
          autoComplete="off"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="mb-3">
        <input
          name="password"
          autoComplete="off"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary">Create Account</button>
      </div>
    </form>
  );
}
