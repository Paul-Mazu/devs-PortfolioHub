
import './App.css';
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import ProjectList from "./components/ProjectList/ProjectList";
import MyProfile from "./components/MyProfile/MyProfile";
import Footer from "./components/Footer/Footer";
import DeveloperList from './components/DeveloperList/DeveloperList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
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
