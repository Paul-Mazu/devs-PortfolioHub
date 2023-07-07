import "./DeveloperList.css";
import axios from "axios";

export default function DeveloperList() {
  const getDevs = async () => {
    try {
      const foundDevs = await axios.get(
        "http://localhost:8000/api/user/users/"
      );
      return foundDevs;
    } catch (error) {
      console.log(error);
    }
  };
  return(
    <h1>Hi</h1>
  );
}
