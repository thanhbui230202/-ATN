import { Label } from "../astoms/label"
import { Input } from "../astoms/input"
import { Button } from "../astoms/button"
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { register } from "../../api/UserAPI.js";
import axios from "axios";
export function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget as HTMLFormElement;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await register(username,email,password)
      console.log('Registration successful:', response.data);
      alert('Account created successfully!');
      navigate('/login');
    } catch (error) {
      console.log('Caught error:', error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Registration failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  }
  return (
    <div className="bg-zinc-900/90 p-8 rounded-lg shadow-lg backdrop-blur-sm">
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">Username</Label>
            <Input id="username" placeholder="Choose a username" type="text" className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input id="password" type="password" className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
            <Input id="confirmPassword" type="password" className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
            Create Account
          </Button>
        </div>
      </form>
      <div className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <a href="/login" className="text-white hover:underline">
          Log in
        </a>
      </div>
    </div>
  );
}

