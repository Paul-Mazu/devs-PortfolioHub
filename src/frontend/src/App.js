import "./App.css";
import HeroImage from "./components/HeroImage/HeroImage";
import Navbar from "./components/Header/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import ProjectList from "./components/ProjectList/ProjectList";
import DeveloperList from "./components/DeveloperList/DeveloperList";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LogInForm from "./components/LogIn/LogIn";
import MyProfile from "./components/MyProfile/MyProfile";
import DeveloperProfile from "./components/DeveloperProfile/DeveloperProfile";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeroImage />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="developers" element={<DeveloperList />} />
          <Route path="developers/:name" element={<DeveloperProfile />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="login" element={<LogInForm />} />
          <Route path="profile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
