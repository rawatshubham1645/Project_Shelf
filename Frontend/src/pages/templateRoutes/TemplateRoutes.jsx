import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const TemplateTable = lazy(() => import("../../components/home/template/TemplateTable"));
const TemplatePreview = lazy(() => import("../../components/home/template/preview/TemplatePreview"));

function TemplateRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<TemplateTable />} />
        <Route path="preview/:templateId" element={<TemplatePreview />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Suspense>
  );
}

export default TemplateRoutes;
