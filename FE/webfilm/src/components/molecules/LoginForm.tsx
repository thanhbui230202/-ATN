import React, { useState } from "react";
import { login } from "../../api/UserAPI.js";
import { Input } from "../astoms/input.js";
import { Button } from "../astoms/button.js";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Label } from "../astoms/label.js";
export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setError("");
    try {
      const response = await login(username, password);
      const { token, role } = response;
      localStorage.setItem("token", token); 
      alert("Login successful!");
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "CUSTOMER") {
        navigate("/");
      }   
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || "Failed to login";
        if (errorMessage === "Account is locked") {
          alert("Your account is locked. Please contact support.");
        } else {
          alert(errorMessage);
        }        
        setError(errorMessage);
      } else {
        const errorMessage = (err as Error).message || "An unknown error occurred";
        alert(errorMessage);
        setError(errorMessage); 
      }
    }
  }

  return (
    <div className="bg-zinc-900/90 p-8 rounded-lg shadow-lg backdrop-blur-sm">
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
            Sign In
          </Button>
        </div>
      </form>
      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      <div className="mt-4 text-center text-sm">
        <a href="#" className="text-zinc-400 hover:text-white">
          Forgot password?
        </a>
      </div>
      <div className="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <a href="/signup" className="text-white hover:underline">
          Sign up
        </a>
      </div>
    </div>
  );
}
