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
import { useEffect } from "react";

import { fetchUserById } from "./services/UserData";

const AppRender = () => {
  // console.log(localStorage.getItem("userData"));

  // let user_id = null;
  // try {
  //   const userDataString = localStorage.getItem("userData");
  //   if (userDataString) {
  //     const userData = JSON.parse(userDataString);
  //     user_id = userData.user_id;
  //     // console.log("userData");
  //     // console.log(userData);
  //     // console.log(user_id);
  //   }
  // } catch (error) {
  //   console.error("Error parsing token from localStorage:", error);
  // }

  // useEffect(() => {
  //   const loadUserDetails = async () => {
  //     try {
  //       const response = await fetchUserById(user_id);
  //       if (response.success && response.status === 200) {
  //         console.log(response.data);
  //       }
  //     } catch (error) {
  //       // console.log("Suma error");
  //       // console.error("Error fetching user:", error);
  //       // console.log("Suma error");
  //       // console.log("Error :", error);
  //     }
  //   };

  //   loadUserDetails();
  // }, [user_id]);

  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route exact path="/tasks/:projectId" element={<TaskDashboard />} />
        <Route exact path="/analytics/:projectId" element={<Analytics />} />
        <Route
          exact
          path="/project-calendar/:projectId"
          element={<ProjectCalendar />}
        />
        <Route path="/graph/:projectId" element={<Graph />} />
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
