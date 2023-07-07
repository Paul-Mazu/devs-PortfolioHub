import "./ProjectList.css";
import ImgMediaCard from "../Card/Card";


// The project list page should contain a gallery of card components that each show and link to a project.
// The top search bar should automatically switch to the project search mode.

export default function ProjectList() {
   return (
     <div className="herobg">
       <p className="description">Discover the best projects</p>
       <ImgMediaCard />
     </div>
  );
}