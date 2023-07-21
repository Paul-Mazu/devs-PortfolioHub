import "./DeveloperDetail.css";

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

    return (
        <div className="container-main">
            {isUser === true &&
                <p className="description">Welcome to your profile, {developer.name}</p>
            }
            {isUser === false &&
                <p className="description">Welcome to {developer.name}'s profile</p>
            }
            <img src={developer.profile_image} alt="Developer profile"></img>
            <h2>Name: {developer.name}</h2>
            <h2>Email: {developer.email}</h2>
            <h3>Position: {developer.title} {developer.working_at}</h3>
            <h3>Short Description: {developer.short_desc}</h3>
            {/* <h3>{developer.tags}</h3> */}
            <p>Bio: {developer.bio}</p>

            {/* code for social media links */}
            <p>Socials: </p>
        </div>
    );
}