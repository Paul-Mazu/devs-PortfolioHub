import "./MyProfile.css";
import DeveloperDetail from "../DeveloperDetail/DeveloperDetail";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useEffect, useState } from 'react';
import { getCurrentUser } from "../../api/users.api";
import { getToken } from "../../helpers/helpers.js";

export default function MyProfile() {
  const [activeUser, setActiveUser] = useState(false);

  const userToken = getToken();

  useEffect(() => {
    getCurrentUser(userToken)
      .then((response) => setActiveUser(response.data))
      .catch(e => setActiveUser(false));
  }, []);

  return (
    <div className="main">
      {activeUser &&
        <DeveloperDetail
          isUser={true}
          developer={activeUser}
        />
      }
      {!activeUser &&
        <ErrorMessage
          e={
            {
              code: 401,
              message: "You are not allowed to view this page without logging in."
            }
          }
        />
      }
    </div>
  );
}