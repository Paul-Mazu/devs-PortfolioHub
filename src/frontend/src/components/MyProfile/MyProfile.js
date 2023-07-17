import "./MyProfile.css";
import DeveloperDetail from "../DeveloperDetail/DeveloperDetail";
import { useEffect, useState } from 'react';
import { getCurrentDeveloper } from "../../api/developers.api";
import { getToken } from "../../helpers/helpers.js"

// The my profile page should automatically GET /api/user/me/ and display its data as a developer profile component.

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

export default function MyProfile() {
  const [developer, setDeveloper] = useState([]);

  const userToken = getToken();

  useEffect(() => {
    getCurrentDeveloper(userToken)
    .then((response) => setDeveloper(response.data))
    .catch(e => setDeveloper([]));
  }, []);

  return (
    <div className="main">
      {/* <h2>Example for isUser=false (i.e. the profile of somebody else, but not the current user). Obviously, the route should be different:</h2>
            <DeveloperDetail 
                isUser={false}
                developer={dummyDeveloper}
            /> */}
      <DeveloperDetail
        isUser={true}
        developer={developer}
      />
    </div>
  );
}