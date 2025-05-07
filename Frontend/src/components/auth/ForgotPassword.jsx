import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { forgotPasswordSchema } from "@/schemas/validation";
import useMutation from "@/hooks/useMutation";
import { USER_FORGOT_PASSWORD_REQUEST_OTP } from "@/imports/api";

// Validation schema

function ForgotPassword() {
  const navigate = useNavigate();
  const { mutate, loading } = useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Focus email input on component mount
  useEffect(() => {
    const emailInput = document.querySelector("[data-email-input]");
    if (emailInput) {
      emailInput.focus();
    }
  }, []);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    const response = await mutate({
      url: `${USER_FORGOT_PASSWORD_REQUEST_OTP}?email=${data.email}`,
      method: "POST",
    });
    // Add your password reset logic here
    // For demo purposes, we'll navigate to OTP verification
    if (response.success)
      navigate("/auth/reset-password", {
        state: { email: data.email, reset: true },
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg border shadow-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
                placeholder="you@example.com"
                data-email-input
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button loading={loading} type="submit" className="w-full">
              Send Reset Instructions
            </Button>
            <div className="text-center">
              <Link
                to="/auth/login"
                className="text-sm font-medium text-primary hover:text-primary/90"
              >
                Back to login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
