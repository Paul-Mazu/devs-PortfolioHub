// import React from "react";   
import { useLocation } from "react-router-dom";
import "./HeroImage.css";

// The HeroImage component changes the background image depending on the current route .

export default function HeroImage() {
    const path = useLocation().pathname;
    const location = path.split("/")[1];
  
    return (
      <div className={"heroimage " + location}>
      </div>
    );
}