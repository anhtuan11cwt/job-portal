import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import "./App.css";

const Home = lazy(() => import("./components/pages/Home"));
const Jobs = lazy(() => import("./components/pages/Jobs"));
const Browse = lazy(() => import("./components/pages/Browse"));
const Profile = lazy(() => import("./components/pages/Profile"));
const JobDescription = lazy(() => import("./components/pages/JobDescription"));
const PrivacyPolicy = lazy(() => import("./components/pages/PrivacyPolicy"));
const TermsServices = lazy(() => import("./components/pages/TermsServices"));
const Login = lazy(() => import("./components/authentication/Login"));
const Register = lazy(() => import("./components/authentication/Register"));
const Companies = lazy(() => import("./components/admin/Companies"));
const CompanyCreate = lazy(() => import("./components/admin/CompanyCreate"));
const CompanySetup = lazy(() => import("./components/admin/CompanySetup"));
const AdminJobs = lazy(() => import("./components/admin/AdminJobs"));
const PostJob = lazy(() => import("./components/admin/PostJob"));
const Applicants = lazy(() => import("./components/admin/Applicants"));

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="p-6 text-center">Đang tải...</div>}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Jobs />} path="/jobs" />
            <Route element={<Browse />} path="/browse" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<JobDescription />} path="/description/:id" />
            <Route element={<PrivacyPolicy />} path="/privacy" />
            <Route element={<TermsServices />} path="/terms" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route
              element={
                <ProtectedRoute>
                  <Companies />
                </ProtectedRoute>
              }
              path="/admin/companies"
            />
            <Route
              element={
                <ProtectedRoute>
                  <CompanyCreate />
                </ProtectedRoute>
              }
              path="/admin/companies/create"
            />
            <Route
              element={
                <ProtectedRoute>
                  <CompanySetup />
                </ProtectedRoute>
              }
              path="/admin/companies/:id"
            />
            <Route
              element={
                <ProtectedRoute>
                  <AdminJobs />
                </ProtectedRoute>
              }
              path="/admin/jobs"
            />
            <Route
              element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              }
              path="/admin/jobs/create"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Applicants />
                </ProtectedRoute>
              }
              path="/admin/jobs/:id/applicants"
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
