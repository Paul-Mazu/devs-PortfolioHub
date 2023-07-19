import "./DeveloperDetail.css";

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
        <div>
            {isUser === true &&
                <p className="description">Welcome to your profile, {developer.name}</p>
            }
            {isUser === false &&
                <p className="description">Welcome to {developer.name}'s profile</p>
            }
            <h2>{developer.name}</h2>
            <h2>{developer.email}</h2>
            <h2>{developer.bio}</h2>
        </div>
    );
}