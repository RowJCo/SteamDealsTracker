import { useState } from "react";

const AuthForm = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    onSubmit({ user });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 bg-base-200 rounded-lg shadow-lg"
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary w-full">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
