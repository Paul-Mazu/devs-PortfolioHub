// import "./DeveloperProfile.css";
import DeveloperDetail from "../DeveloperDetail/DeveloperDetail";
import { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { getDeveloperById } from "../../api/developers.api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function DeveloperProfile() {

  const [developer, setDeveloper] = useState(false);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  useEffect(() => {
    getDeveloperById(id)
      .then((response) => setDeveloper(response.data))
      .then(() => setLoading(false))
      .catch(e => setDeveloper(false))
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="main">
      {loading && 
        <p>LOADING...</p>      
      }
      {!loading && developer &&
        <DeveloperDetail
          isUser={false}
          developer={developer}
        />
      }  
      {!loading && !developer &&
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
