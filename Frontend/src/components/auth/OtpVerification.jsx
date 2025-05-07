import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { USERS_REGISTER, USERS_REGISTER_REQUEST_OTP } from "@/imports/api";
import useMutation from "@/hooks/useMutation";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/features/user/userSlice";

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { mutate, loading } = useMutation();
  const otpInputRef = useRef(null);

  // Focus input on component mount
  useEffect(() => {
    if (otpInputRef.current) {
      otpInputRef.current.focus();
    }
    if (!email) {
      navigate("/auth/login");
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    
    // Only allow digits and limit to 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      
      // Clear error when user starts typing
      if (error) setError("");
      
      // Auto-submit when 6 digits are entered
      if (value.length === 6) {
        const verifyButton = document.querySelector("[data-verify-button]");
        if (verifyButton) {
          verifyButton.focus();
        }
      }
    }
  };
  
  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    const digits = pasteData.replace(/\D/g, "").slice(0, 6);
    
    if (digits) {
      setOtp(digits);
      
      // Clear error when user pastes valid data
      if (error) setError("");
      
      // Auto-submit when 6 digits are pasted
      if (digits.length === 6) {
        const verifyButton = document.querySelector("[data-verify-button]");
        if (verifyButton) {
          verifyButton.focus();
        }
      }
    }
  };
  
  // Handle key press
  const handleKeyDown = (e) => {
    // If Enter is pressed and OTP is 6 digits, submit form
    if (e.key === "Enter" && otp.length === 6) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    // Add your OTP verification logic here
    console.log("Verifying OTP:", otp);
    const response = await mutate({
      url: USERS_REGISTER + `?otp=${otp}`,
      method: "POST",
      data: { ...location.state },
      skipToken: true,
    });
    if (response.success) {
      // Save user data and token to Redux store
      dispatch(setUser({ ...response?.data?.data?.userDto }));
      dispatch(setToken({ token: response?.data?.data?.token }));
      navigate("/home");
    } else {
      setError(
        response.data?.message || "Failed to verify OTP. Please try again."
      );
    }
  };

  const handleResend = async () => {
    await mutate({
      url: USERS_REGISTER_REQUEST_OTP,
      method: "POST",
      data: { ...location.state },
      skipToken: true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg border shadow-md border-primary/20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gradient">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            We've sent a verification code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Label htmlFor="otp-input">Enter verification code</Label>
      
            <div>
              <Input
                ref={otpInputRef}
                type="text"
                inputMode="numeric"
                className="w-full h-12 text-center text-lg tracking-widest font-semibold border border-primary/50 bg-background shadow-sm focus-visible:ring-primary/70 transition-all"
                value={otp}
                placeholder="Enter 6-digit OTP"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                maxLength={6}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              loading={loading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium transition-all"
              onClick={handleSubmit}
              data-verify-button
            >
              Verify Email
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleResend}
                className="flex-1 border-primary/30 text-primary hover:bg-primary/10 transition-all"
              >
                Resend Code
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/auth/register")}
                className="flex-1 border-primary/30 text-primary hover:bg-primary/10 transition-all"
              >
                Change Email
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
