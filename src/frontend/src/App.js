
import './App.css';
import ResponsiveAppBar from "./components/Header/Header";
import ImgMediaCard from "./components/Card/Card";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ResponsiveAppBar />
        <br />
        <br />
        <br />
        <ImgMediaCard />
        <p className='discription'>Discover the best talents </p>
      </header>
      <Footer/>
    </div>
  );
}

export default App;
