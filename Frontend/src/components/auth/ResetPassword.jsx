import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useMutation from "@/hooks/useMutation";
import { USER_FORGOT_PASSWORD_RESET } from "@/imports/api";
import { passwordSchema } from "@/schemas/validation";

const resetPasswordSchema = yup.object().shape({
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const { mutate, loading } = useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Focus first input on component mount
  useEffect(() => {
    const firstInput = document.querySelector('[data-otp-input="0"]');
    if (firstInput) {
      firstInput.focus();
    }
    if (!email) {
      navigate("/auth/login");
    }
  }, []);

  // Handle input paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
    const numbers = pasteData.split("").filter((char) => !isNaN(char));

    setOtp((prev) => {
      const newOtp = [...prev];
      numbers.forEach((num, idx) => {
        if (idx < 6) newOtp[idx] = num;
      });
      return newOtp;
    });

    // Focus the next empty input or the last input
    const inputs = Array.from(e.target.parentNode.children);
    const nextEmptyIndex = numbers.length < 6 ? numbers.length : 5;
    if (inputs[nextEmptyIndex]) {
      inputs[nextEmptyIndex].focus();
    }
  };

  // Handle all keyboard input
  const handleKeyDown = (e, index) => {
    const key = e.key;

    // Prevent default behavior for all keys we handle
    if (key === "Backspace" || /^[0-9]$/.test(key)) {
      e.preventDefault();
    }

    // Handle backspace
    if (key === "Backspace") {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = "";
        return newOtp;
      });

      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
      return;
    }

    // Handle number inputs (0-9)
    if (/^[0-9]$/.test(key)) {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = key;
        return newOtp;
      });

      // Move to next input if available, or focus verify button if it's the last input
      if (index === 5) {
        // Find and focus the password input field
        const passwordInput = document.getElementById("password");
        if (passwordInput) {
          passwordInput.focus();
        }
      } else if (e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    }
  };

  // Add input change handler to handle mobile input and pasting single digits
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only process if it's a single digit
    if (/^[0-9]$/.test(value)) {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = value;
        return newOtp;
      });

      // Move to next input if available
      if (index < 5 && e.target.nextSibling) {
        e.target.nextSibling.focus();
      } else if (index === 5) {
        // Focus the password input when the last digit is filled
        const passwordInput = document.getElementById("password");
        if (passwordInput) {
          passwordInput.focus();
        }
      }
    }
  };

  const onSubmit = async (data) => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await mutate({
        url: `${USER_FORGOT_PASSWORD_RESET}?email=${email}&otp=${otpValue}&newPassword=${data.password}`,
        method: "POST",
      });

      // On successful password reset, redirect to login
      if (response.success) {
        navigate("/auth/login", {
          state: {
            message:
              "Password has been successfully reset. Please login with your new password.",
          },
        });
      }
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg border shadow-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Please enter your new password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="flex gap-2 justify-center">
              {otp.map((data, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className="w-12 h-12 text-center text-lg"
                  value={data}
                  data-otp-input={index}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onChange={(e) => handleChange(e, index)}
                  onPaste={handlePaste}
                />
              ))}
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-destructive" : ""}
                placeholder="Enter your new password"
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-destructive" : ""}
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <Button loading={loading} type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
