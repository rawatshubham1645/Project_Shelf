import { Suspense } from "@/components/ui/suspense";
import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const FormTable = lazy(() =>
  import("../../components/home/form/formTable/FormTable")
);
const CreateForm = lazy(() =>
  import("../../components/home/form/createForm/CreateForm")
);
const EditForm = lazy(() =>
  import("../../components/home/form/editForm/EditForm")
);
const PreivewForm = lazy(() =>
  import("../../components/home/form/previewForm/PreivewForm")
);


function FormRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="" element={<FormTable />} />
        <Route path="create" element={<CreateForm />} />
        <Route path="edit" element={<EditForm />} />
        <Route path="preview" element={<PreivewForm />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Suspense>
  );
}

export default FormRoutes;
