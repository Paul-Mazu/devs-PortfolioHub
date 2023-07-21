// import "./DeveloperProfile.css";
import DeveloperDetail from "../DeveloperDetail/DeveloperDetail";
import { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { getDeveloperById } from "../../api/developers.api";
import { getFilteredDevelopers } from "../../api/developers.api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function DeveloperProfile() {
  const [developer, setDeveloper] = useState(false);

  // this approach requires users to always access the profile from the developer list but never by just typing the slug directly 
  // (as doing so will result in a null state)  
  // this simply returns the first one, should check if len more than one 
  // even faulty inputs return a match, e.g. "a" will find the first matching user that has a name starting with an "a"

  //   const { userId } = useLocation().state
  //   console.log(userId)

  //   useEffect(() => {
  //     getDeveloperById(userId)
  //     .then((response) => setDeveloper(response.data))
  //     .catch(e => setDeveloper([]));
  //   }, []);


  let { id } = useParams();

  useEffect(() => {
    getDeveloperById(id)
      .then((response) => setDeveloper(response.data))
      .catch(e => setDeveloper(false));
  }, []);

  // alternative: do not give users the option to access a profile through typing in URL (then can also simply pass userId/developer to component)
  // makes it impossible to bookmark a profile

  return (
    <div className="main">
      {developer !== false &&
        <DeveloperDetail
          isUser={false}
          developer={developer}
        />
      }  
      {!developer &&
        <ErrorMessage
          e={
            {
              code: 404,
              message: "The requested developer was not found."
            }
          }
        />
      }
    </div>
  );
}
