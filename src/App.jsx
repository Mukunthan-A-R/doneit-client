import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import DashboardLayout from "./components/layouts/DashboardLayout";
import TaskboardLayout from "./components/layouts/TaskboardLayout";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import AddProjectUser from "./pages/AddProjectUser";
import Analytics from "./pages/Analytics";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Graph from "./pages/Graph";
import HeatMapPage from "./pages/HeatMapPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProjectCalendar from "./pages/ProjectCalendar";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import SignupPage from "./pages/SignupPage";
import TaskDashboard from "./pages/TaskDashboard";
import TaskListView from "./pages/TaskListView";
import TermsOfService from "./pages/TermsOfService";
import TransactionAnalytics from "./pages/TransactionAnalytics";
import TransactionHistory from "./pages/TransactionHistory";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route element={<TaskboardLayout />}>
            <Route path="/tasks/:projectId" element={<TaskDashboard />} />
            <Route path="/tasks-beta/:projectId" element={<TasksPage />} />
            <Route path="/analytics/:projectId" element={<Analytics />} />
            <Route path="/list/:projectId" element={<TaskListView />} />
            <Route
              path="/project-calendar/:projectId"
              element={<ProjectCalendar />}
            />
            <Route
              path="/transaction/:projectId"
              element={<TransactionHistory />}
            />
            <Route
              path="/transaction-analytics/:projectId"
              element={<TransactionAnalytics />}
            />
            <Route path="/graph/:projectId" element={<Graph />} />
            <Route path="/heat-map/:projectId" element={<HeatMapPage />} />
            <Route path="/adduser/:projectId" element={<AddProjectUser />} />
          </Route>
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-serivce" element={<TermsOfService />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <Route path="/forgot-password/:token" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        transition={Slide}
        pauseOnFocusLoss
        hideProgressBar
      />
    </Router>
  );
}

export default App;
