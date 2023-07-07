import "./DeveloperList.css";
import axios from "axios";
import ImgMediaCard from "../Card/Card";


// The developer list page should contain a gallery of card components that each show and link to a developer.
// The top search bar should automatically switch to the project search mode.
// API calls go to /api/user/users/ 

export default function DeveloperList() {
  const getDevs = async () => {
    try {
      const foundDevs = await axios.get(
        "http://localhost:8000/api/user/users/"
      );
      return foundDevs;
    } catch (error) {
      console.log(error);
    }
  };

  return(
         <div className="herobg">
       <p className="description">Discover the best developers</p>
       <ImgMediaCard />
     </div>
  );
}
