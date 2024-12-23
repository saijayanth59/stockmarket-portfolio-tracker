"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp, signIn } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function SignUpForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await signUp({ username, password, email });
      toast.success("Sign Up successful Logging in...");
      const userData = await signIn({ username, password });

      login(userData);
      onClose();
      console.log("Signed in successfully:", userData);
      router.push("/user/dashboard");
    } catch (error) {
      toast.error(error.message || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-950 p-8 rounded-lg w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Sign Up</Button>
          </CardFooter>
        </form>
      </div>
    </Card>
  );
}
