import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import TaskDashboard from "./pages/TaskDashboard";
import Analytics from "./pages/Analytics";
import Graph from "./pages/Graph";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/UserDashboard";
import ProjectCalendar from "./pages/ProjectCalendar";
import Settings from "./pages/Settings";
import AddProjectUser from "./pages/AddProjectUser";
import ResetPassword from "./pages/ResetPassword";
import SessionTimeout from "./components/SessionTimeout";
import TaskListView from "./pages/TaskListView";
import HeatMapPage from "./pages/HeatMapPage";
import TransactionHistory from "./pages/TransactionHistory";
import TransactionAnalytics from "./pages/TransactionAnalytics";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./components/layouts/DashboardLayout";
import TaskboardLayout from "./components/layouts/TaskboardLayout";
import { ToastContainer, Slide } from "react-toastify";

function App() {
  return (
    <Router>
      <SessionTimeout />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route element={<TaskboardLayout />}>
          <Route exact path="/tasks/:projectId" element={<TaskDashboard />} />
          <Route exact path="/analytics/:projectId" element={<Analytics />} />
          <Route exact path="/list/:projectId" element={<TaskListView />} />
          <Route
            exact
            path="/project-calendar/:projectId"
            element={<ProjectCalendar />}
          />
          <Route
            exact
            path="/transaction/:projectId"
            element={<TransactionHistory />}
          />
          <Route
            exact
            path="/transaction-analytics/:projectId"
            element={<TransactionAnalytics />}
          />
          <Route path="/graph/:projectId" element={<Graph />} />
          <Route path="/heat-map/:projectId" element={<HeatMapPage />} />
          <Route path="/adduser/:projectId" element={<AddProjectUser />} />
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
