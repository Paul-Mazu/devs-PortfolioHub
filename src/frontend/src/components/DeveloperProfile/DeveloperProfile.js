// import "./DeveloperProfile.css";
import DeveloperDetail from "../DeveloperDetail/DeveloperDetail";
import { useEffect, useState } from 'react';
import { useParams , useLocation} from "react-router-dom";
import { getDeveloperById } from "../../api/developers.api";
import { getFilteredDevelopers } from "../../api/developers.api";

export default function DeveloperProfile() {
  const [developer, setDeveloper] = useState([]);

  // this approach requires users to always access the profile from the developer list but never by just typing the slug directly 
  // (as doing so will result in a null state)  

//   const { userId } = useLocation().state

//   console.log(userId)

//   useEffect(() => {
//     getDeveloperById(userId)
//     .then((response) => setDeveloper(response.data))
//     .catch(e => setDeveloper([]));
//   }, []);

  // alternative: filter by getting the name params, but issues with duplicate names?

  let { name } = useParams();

  let queryName = name.replace("-", " ");

  console.log(name);
  console.log(queryName);

  // this simply returns the first one, should check if len more than one (probably: just "a" would return first match)

  useEffect(() => {
    getFilteredDevelopers(queryName)
    .then((response) => setDeveloper(response.data[0]))
    .catch(e => setDeveloper([]));
  }, []);

  // alternative: do not give users the option to access a profile through typing in URL (then can also simply pass userId/developer to component)
  // makes it impossible to bookmark a profile

  return (
    <div className="main">
      <h2>Example for isUser=false (i.e. the profile of somebody else, but not the current user). Obviously, the route should be different:</h2>
            <DeveloperDetail 
                isUser={false}
                developer={developer}
            />
    </div>
  );
}
