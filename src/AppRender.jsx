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

const AppRender = () => {
  return (
    <Router>
      <SessionTimeout />
      <NavBar></NavBar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
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
        <Route exact path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRender;
