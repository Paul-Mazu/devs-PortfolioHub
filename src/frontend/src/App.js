
import './App.css';
import ResponsiveAppBar from "./components/Header/Header";
import ImgMediaCard from "./components/Card/Card";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ResponsiveAppBar />
        <br />
        <br />
        <br />
        <ImgMediaCard />
        <p></p>
      </header>
    </div>
  );
}

export default App;
