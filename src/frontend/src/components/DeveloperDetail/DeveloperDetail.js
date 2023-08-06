import "./DeveloperDetail.css";
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
  const listTags = tags.map((d, idx) => <h3 className="tag" key={idx}>{d.name}</h3>);

  return (
    <div className="container-main">
      {isUser === true &&
        <div>
          <p className="description">Welcome to your profile, {developer.name}</p>
          <a href="/profile/edit">Edit your profile</a>
          <a href="/">Add a project</a>
        </div>
      }
      {isUser === false &&
        <p className="description">Welcome to {developer.name}'s profile</p>
      }
      <img className={"profile-dev-pic " + developer.status_open_to_work} src={checkImageUrl(developer.profile_image)} alt="Developer profile"></img>
      <h2>Name: {developer.name}</h2>
      <h2>Email: {developer.email}</h2>
      <h3>Position: {checkPosition(developer)}</h3>
      <h3>Short Description: {developer.short_desc}</h3>
      <h3>{listTags}</h3>
      <p>Bio: {developer.bio}</p>
      <p>Highlighted Projects: </p>
      <a>See all Projects by {developer.name}</a>
      {(developer.github_link || developer.linkedin_link || developer.website_link) &&
        <p>Socials: </p>
      }
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
  );
}