import "./LandingPage.css";
import { Link } from "react-router-dom";
import LogoText from "../../images/text-gradient.png";
import LogoImg from "../../images/logo-gradpurple.png";

// The landing page should contain a simple one-sentence pitch describing the web app, show the logo etc. 
// and highlight the dev and project list

// search devs or just simple button to /developers?
// login element?
// check login status to redirect/show different landing page?

export default function LandingPage() {
  return (
    <div className="main font-jost weight-bold">
      <div className="landing-header">
        <img className="landing-header-logo" src={LogoImg} alt="Logo"></img>
        <img className="landing-header-logo" src={LogoText} alt="Text Logo reading CoderVerse"></img>
      </div>
      <div className="landing-container">
        <img className="landing-logo animate-spin" src={LogoImg} alt="Logo"></img>
        <img className="landing-logo" src={LogoText} alt="Text Logo reading CoderVerse"></img>
        <p className="landing-text">The best place to unleash your creative prowess,
          where you can proudly display your portfolio, forge dynamic collaborations with other talents,
          and curate your profile within a vibrant and secure environment.
        </p>
        <p className="landing-text landing-action">
          <Link to="/developers">Discover our talents!</Link>
        </p>
      </div>
    </div>
  );
}