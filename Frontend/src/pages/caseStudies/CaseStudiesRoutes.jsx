import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { lazy } from "react";
const CreateCaseStudies = lazy(() =>
  import("../../components/home/caseStudies/create/CreateCaseStudies")
);
const CaseStudiesTable = lazy(() =>
  import("../../components/home/caseStudies/CaseStudiesTable")
);
  const EditCaseStudy = lazy(() =>
  import("../../components/home/caseStudies/edit/EditCaseStudy")
);
function CaseStudiesRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="" element={<CaseStudiesTable />} />
        <Route path="create" element={<CreateCaseStudies />} />
        <Route path="edit" element={<EditCaseStudy />} />
        {/* <Route path="preview" element={<PreivewForm />} /> */}
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Suspense>
  );
}

export default CaseStudiesRoutes;
