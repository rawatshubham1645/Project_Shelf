import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "../components/ui/suspense";
import Topbar from "../components/home/Topbar";
import NavigationBar from "../components/home/NavigationBar";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const Dashboard = lazy(() => import("../components/home/dashboard/dashboard"));
const CaseStudiesRoutes = lazy(() => import("./caseStudies/CaseStudiesRoutes"));
const TemplateRoutes = lazy(() => import("./templateRoutes/TemplateRoutes"));
const PreviewTemplate = lazy(() => import("../components/home/preview/previewTemplate/PreviewTemplate"));
const CaseStudyPreview = lazy(() => import("../components/home/preview/CaseStudyPreview"));
  const Profile = lazy(() => import("../components/home/profile/Profile"));
function HomeRoutes() {
  return (
    <ProtectedRoute>
      <Suspense>
        <div className="min-h-screen bg-background">
          {/* <NavigationBar /> */}
          <div >
            <Topbar />
            <main className="container mx-auto py-6 px-4 lg:px-6">
              <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="case-studies/*" element={<CaseStudiesRoutes />} />
                <Route path="templates/*" element={<TemplateRoutes />} />
                <Route path="preview" element={<PreviewTemplate />} />
                <Route path="preview/case" element={<CaseStudyPreview />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Suspense>
    </ProtectedRoute>
  );
}

export default HomeRoutes;
