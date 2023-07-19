import "./Card.css"
import * as React from "react";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import placeholderImage from "../../images/contemplative-reptile.jpg";

// for reference: format of developer profile

// {
//   "id": 0,
//   "email": "user@example.com",
//   "profile_image": "string",
//   "name": "string",
//   "short_desc": "string",
//   "tags": [
//     {
//       "name": "string"
//     }
//   ],
//   "bio": "string",
//   "title": "string",
//   "address": "string",
//   "working_at": "string",
//   "status_open_to_work": true,
//   "github_link": "string",
//   "linkedin_link": "string",
//   "website_link": "string",
//   "xing_link": "string",
//   "whatsapp": "string",
//   "messenger": "string"
// }

export function DeveloperCard({ developer }) {

  const checkImageUrl = (image) => {
    if (image === null) {
      return placeholderImage
    } else {
      return image
    }
  };

  const checkPosition = (developer) => {
    if (developer.working_at != null) {
      return `${developer.title} at ${developer.working_at}`;
    } else {
      return developer.title;
    }
  }

  const tags = developer.tags;
  const listTags = tags.map((d, idx) => <h3 className="tag" key={idx}>{d.name}</h3>);

  return (
    // for now: developers/:id to make profiles accessible through URL and give option to bookmark them
    // <Link to={"/developers/" + slugify(developer.name)} state={{userId: developer.id}}>
    <Link to={"/developers/" + developer.id }>
      <div className="card-main">
        <div className="card-header">
          <img className={"card-dev-pic " + developer.status_open_to_work} src={checkImageUrl(developer.profile_image)} alt="Developer profile"></img>
          <div className="card-header-titles">
            <h2 className="card-title">{developer.name}</h2>
            <h3 className="card-title">{checkPosition(developer)}</h3>
            <div className="tag-list">
              {listTags}
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{developer.short_desc}</p>
        </div>
      </div>
    </Link>
  );
}
