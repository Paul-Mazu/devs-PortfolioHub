import "./ProjectList.css";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { getFilteredProjectsBasic, getFilteredProjectsAdvanced, getAllProjects } from "../../api/projects.api";
import { ProjectCard } from "../Card/Card";

// import { ProjectCard } from "../Card/Card";


// The project list page should contain a gallery of card components that each show and link to a project.
// The top search bar should automatically switch to the project search mode.

// The developer list page should contain a gallery of card components that each show and link to a developer.
// The top search bar should automatically switch to the project search mode.
// API calls go to /api/user/users/ 

export default function ProjectList() {

  const [projects, setProjects] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      const queryValue = queryParams.get('q');
      getFilteredProjectsBasic(queryValue)
        .then((response) => setProjects(response))
        .catch(e => setProjects([]));
    } else {
      getAllProjects()
        .then((response) => setProjects(response))
        .catch((e) => setProjects([]));
    };
  }, []
  );
  console.log(projects)

  return (
    <div className="main">
      <div className="list-body">
        <div className="list-heading">
          <h2 className="font-jost">Discover the best projects<span className="highlight-cyan">!</span></h2>
        </div>
        <div className="card-gallery">
          {projects.map((project) =>
            <ProjectCard
              project={project}
            />)
          }
        </div>
      </div>
    </div>
  );
}

