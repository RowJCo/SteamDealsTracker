"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "../actions/userController.js";

export default function SignInForm() {
  const [formState, formAction] = useFormState(signIn, {});
  console.log(formState);

  return (
    <>
      <h1 className="text-2xl text-center py-6">
        Already got an account, <strong>sign in here</strong>.
      </h1>
      <form action={formAction} className="max-w-xs mx-auto">
        <div className="mb-3">
          <input
            name="email"
            autoComplete="off"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
          {formState.errors?.email && (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{formState.errors?.email}</span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
            name="password"
            autoComplete="off"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
          {formState.errors?.password && (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{formState.errors?.password}</span>
            </div>
          )}
        </div>
        <div className="mb-3 flex justify-center">
          <button className="btn btn-primary">Sign In</button>
        </div>
        {formState.errors?.overall && (
          <div role="alert" class="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formState.errors?.overall}</span>
          </div>
        )}
      </form>
    </>
  );
}
