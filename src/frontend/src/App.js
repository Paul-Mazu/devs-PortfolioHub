
import './App.css';
import ResponsiveAppBar from "./components/Header/Header";
import ImgMediaCard from "./components/Card/Card";
import Footer from "./components/Footer/Footer";
import DeveloperList from './components/DeveloperList/DeveloperList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <ResponsiveAppBar />
          <br />
          <br />
          <br />
        </header>
        <Routes>
          <Route
            path="/"
            element={<p className="discription">Discover the best talents </p>}
          />
          <Route path="developers" element={<DeveloperList />} />
          <Route path="projects" element={<ImgMediaCard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}



export default App;
