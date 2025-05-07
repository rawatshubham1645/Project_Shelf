import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "../components/ui/suspense";
import Signup from "@/components/auth/signup";
import OtpVerification from "@/components/auth/OtpVerification";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";

const Login = lazy(() => import("../components/auth/Login"));

function AuthRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="" element={<Navigate replace to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="verify" element={<OtpVerification />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Suspense>
  );
}

export default AuthRoutes;
