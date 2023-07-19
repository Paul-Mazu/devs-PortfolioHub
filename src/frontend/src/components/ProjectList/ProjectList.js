import "./ProjectList.css";
import React, { useEffect, useState } from 'react';
import { getAllProjects } from "../../api/projects.api";
import { ProjectCard } from "../Card/Card";

// import { ProjectCard } from "../Card/Card";


// The project list page should contain a gallery of card components that each show and link to a project.
// The top search bar should automatically switch to the project search mode.

// The developer list page should contain a gallery of card components that each show and link to a developer.
// The top search bar should automatically switch to the project search mode.
// API calls go to /api/user/users/ 

export default function ProjectList() {

  const [projects, setProjects] = useState([]);  
  useEffect(() => {
    getAllProjects()
      .then((response) => setProjects(response.data))
      .catch((e) => setProjects([]));
  }, []);

  return (
    <div className="main">
      <p className="description">Discover the best projects</p>
      <div className="card-gallery">
        {projects.map((project) =>
          <ProjectCard
            project={project}
          />)
        }
      </div>
    </div>
  );
}
