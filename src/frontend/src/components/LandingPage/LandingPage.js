import "./LandingPage.css";
import LogoText from "../../images/text-gradient.png";
import LogoImg from "../../images/logo-gradpurple.png";

// The landing page should contain a simple one-sentence pitch describing the web app, show the logo etc. 
// and highlight the dev and project list

export default function LandingPage() {
  return (
    <div className="main">
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
          <a href="/developers">Discover our talents!</a>
        </p>
      </div>
    </div>
  );
}