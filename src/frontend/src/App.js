import "./App.css";
import HeroImage from "./components/HeroImage/HeroImage";

import Navbar from "./components/Header/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import ProjectList from "./components/ProjectList/ProjectList";
import DeveloperList from "./components/DeveloperList/DeveloperList";
import MyProfile from "./components/MyProfile/MyProfile";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <HeroImage/>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="developers" element={<DeveloperList />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="my-profile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
