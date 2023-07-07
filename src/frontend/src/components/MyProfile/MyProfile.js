import "./MyProfile.css";

// The my profile page should automatically GET /api/user/me/ and display its data as a developer profile component.

export default function MyProfile() {
   return (
     <div className="herobg">
       <p className="description">This is your profile</p>
     </div>
  );
}