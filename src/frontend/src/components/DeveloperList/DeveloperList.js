import "./DeveloperList.css";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllDevelopers, getFilteredDevelopersBasic } from "../../api/developers.api";
import { DeveloperCard } from "../Card/Card";


// The developer list page should contain a gallery of card components that each show and link to a developer.
// The top search bar should automatically switch to the project search mode.
// API calls go to /api/user/users/ 

export default function DeveloperList() {

  const [developers, setDevelopers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      const queryValue = queryParams.get('q');
      getFilteredDevelopersBasic(queryValue)
        .then((response) => setDevelopers(response))
        .catch(e => setDevelopers([]));
    } else {
      getAllDevelopers()
        .then((response) => setDevelopers(response))
        .catch(e => setDevelopers([]));
    };
  }, []
  );

  return (
    <div className="main">
      <p className="description">Discover the best developers</p>
      <div className="card-gallery">
        {developers.map((developer) => (
          // this removes Pawel's currently empty superuser profile
          developer.id !== 2 ? (
            <DeveloperCard
              developer={developer}
            />
          ) : null
        ))}
      </div>
    </div>
  );
}
