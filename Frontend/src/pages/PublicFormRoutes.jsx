import { Suspense } from "@/components/ui/suspense";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const PublicForm = lazy(() =>
  import("../components/pubicForm/form/PublicForm")
);

function PublicFormRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/:id" element={<PublicForm />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Suspense>
  );
}

export default PublicFormRoutes;
