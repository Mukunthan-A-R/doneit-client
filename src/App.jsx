import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import TaskDashboard from "./pages/TaskDashboard";

function App() {
  return (
    <Router>
      {/* <Header />{" "} */}
      {/* You can put common components like Header and Footer here */}
      <NavBar></NavBar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/tasks" element={<TaskDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<NotFound />} />
      </Routes>
      {/* <Footer />  */}
      {/* Footer will be displayed on all pages */}
    </Router>
  );
}

export default App;
