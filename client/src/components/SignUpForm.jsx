//Imports dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../stores/userStore.js';

const SignUpForm = () => {
  const store = userStore();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  //signs the user up when the form is submitted unless there is an error
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await store.signUp();
      setSuccess('Sign up successful! Head to the sign in page to log in.');
      console.log("Signed up")
    } catch (error) {
      console.log("Failed to sign up")
      setSuccess("");
      setError('Failed to sign up. Please check your details and try again.');
    }
  };
  //renders the sign up form
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                value={store.signUpForm.email}
                onChange={store.updateSignUpForm}
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
              <input
                type="password"
                value={store.signUpForm.password}
                onChange={store.updateSignUpForm}
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}
        </form>
      </div>
    </div>
  )
};

export default SignUpForm;
