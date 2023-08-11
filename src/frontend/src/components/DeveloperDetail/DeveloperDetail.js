import "./DeveloperDetail.css";
import { Link } from 'react-router-dom';
import placeholderImage from "../../images/Drawing.png";


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

// The developer detail page should automatically GET /api/user/me/ and display its data as a developer profile component.

export default function DeveloperDetail({ developer, isUser }) {

  // const checkUserStatus = (isUser) => {
  //     if (isUser) {
  //         return `Welcome to your profile, ${developer.name}`
  //     } else {
  //         return `Welcome to ${developer.name}'s profile`
  //     }
  // };

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
  const listTags = tags.map((d, idx) => <h3 className="detail-tag" key={idx}>{d.name}</h3>);

  return (
    <div className="main">
      <div className="detail-body">
        {isUser === true &&
          <div>
            <div className="detail-heading font-jost">
              <h2 className="">Welcome to your profile, <span className="highlight-cyan">{developer.name}</span>!</h2>
              <div className="detail-links">
                <Link className="weight-extra-bold" to="/profile/edit">Edit your profile</Link>
                <Link className="weight-extra-bold" to="/">Add a project</Link>
              </div>
            </div>
          </div>
        }
        {isUser === false &&
          <div className="detail-heading font-jost">
            <h2 className="">Welcome to <span className="highlight-cyan">{developer.name}</span>'s profile!</h2>
          </div>
        }
        <div className="detail-header">
          <img className={"detail-dev-pic " + developer.status_open_to_work} src={checkImageUrl(developer.profile_image)} alt="Developer profile"></img>
          <div className="detail-info">
            <h2 className="font-jost weight-normal">Hi, my name's <span className="highlight-cyan">{developer.name}</span>.</h2>
            <h3 className="font-jost weight-normal">I'm a <span className="highlight-cyan">{checkPosition(developer)}</span>!</h3>
            <p className="font-sen weight-extra-bold">{developer.short_desc}</p>
          </div>
        </div>
        <div className="detail-tags font-sen weight-semi-bold">{listTags}</div>
        <div className="detail-bio font-sen weight-bold">
          <p>{developer.bio}</p>
        </div>
        <div className="detail-projects">
          <p>Highlighted Projects: </p>
          <a>See all Projects by {developer.name}</a>
        </div>
        {(developer.github_link || developer.linkedin_link || developer.website_link) &&
          <div className="detail-socials">
            <p>Socials: </p>
            <ul>
              {developer.github_link &&
                <li>{developer.github_link}</li>
              }
              {developer.linkedin_link &&
                <li>{developer.linkedin_link}</li>
              }
              {developer.website_link &&
                <li>{developer.website_link}</li>
              }
            </ul>
          </div>
        }
      </div>
    </div>
  );
}