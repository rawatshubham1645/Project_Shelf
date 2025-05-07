import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./components/sections/NotFound";
import InvalidPage from "./components/sections/InvalidPage";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { Toaster } from "sonner";
import "./styles/globals.css";
import { lazy } from "react";
import HomePage from "./components/homePage/HomePage";

const AuthRoutes = lazy(() => import("./pages/AuthRoutes"));
const HomeRoutes = lazy(() => import("./pages/homeRoutes"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const CaseStudy = lazy(() => import("./components/portfolio/CaseStudy"));

function App() {
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();
  return (
    <ThemeProvider defaultTheme="light" storageKey="masai-theme">
      <Toaster position="top-right" expand={true} richColors />
      <div className="min-h-screen bg-background text-foreground">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="user/:id" element={<Portfolio />} />
            <Route path="user/:id/:caseId" element={<CaseStudy />} />
            <Route path="auth/*" element={<AuthRoutes />} />
            <Route path="home/*" element={<HomeRoutes />} />
            <Route path="404" element={<NotFound />} />
            <Route path="invalid" element={<InvalidPage />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
