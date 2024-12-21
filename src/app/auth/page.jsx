"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SignInForm } from "@/components/auth/sign-in-form";
import { AnonymousDialog } from "@/components/auth/anonymous-dialog";
import { BarChart, TrendingUp, Eye, Newspaper } from "lucide-react";

export default function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showAnonymousDialog, setShowAnonymousDialog] = useState(false);

  const features = [
    { icon: BarChart, text: "Real-time market data" },
    { icon: TrendingUp, text: "Buy and sell stocks" },
    { icon: Eye, text: "Customizable watchlists" },
    { icon: Newspaper, text: "Latest financial news" },
    { icon: TrendingUp, text: "Buy and sell stocks" },
    { icon: Eye, text: "Customizable watchlists" },
    { icon: Newspaper, text: "Latest financial news" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="w-full shadow-xl bg-white dark:bg-gray-950">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              StockTracker
            </CardTitle>
            <CardDescription className="text-xl text-gray-600 dark:text-gray-300">
              Your Personal Stock Market Command Center
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Start Your Investment Journey Today
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <feature.icon className="h-6 w-6 text-green-500 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <Button
                onClick={() => setShowSignUp(true)}
                className="w-full text-lg py-6 bg-green-500 text-white hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500"
                size="lg"
              >
                Sign Up for Free
              </Button>
              <Button
                onClick={() => setShowSignIn(true)}
                variant="outline"
                className="w-full text-lg py-6 border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-200"
                size="lg"
              >
                Sign In
              </Button>
              <Button
                onClick={() => setShowAnonymousDialog(true)}
                variant="ghost"
                className="w-full text-lg py-6 text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100"
                size="lg"
              >
                Try Demo
              </Button>
              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Why Sign Up?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get personalized stock recommendations, set price alerts, and
                  track your portfolio performance over time. Join thousands of
                  successful investors today!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center text-sm text-gray-500 dark:text-gray-400">
            StockTracker © 2024 | All rights reserved
          </CardFooter>
        </Card>
      </div>

      {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} />}
      {showSignIn && <SignInForm onClose={() => setShowSignIn(false)} />}
      <AnonymousDialog
        open={showAnonymousDialog}
        onClose={() => setShowAnonymousDialog(false)}
      />
    </div>
  );
}
