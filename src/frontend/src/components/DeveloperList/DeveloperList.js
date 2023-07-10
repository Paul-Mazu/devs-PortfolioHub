import "./DeveloperList.css";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { getAllDevelopers } from "../../api/developers.api";
import DeveloperCard from "../Card/Card";


// The developer list page should contain a gallery of card components that each show and link to a developer.
// The top search bar should automatically switch to the project search mode.
// API calls go to /api/user/users/ 

export default function DeveloperList() {
  // const getDevs = async () => {
  //   try {
  //     const foundDevs = await axios.get(
  //       "http://localhost:8000/api/user/users/"
  //     );
  //     return foundDevs;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [developers, setDevelopers] = useState([]);

  // const handleChange = async (terms) => {
  //   terms.length ? setLoading(true) : setLoading(false);
  //   const result = await getRemedyRecommendation(terms);
  //   const remediesToShow = result ? result.slice(0, 10) : [];
  //   console.log("Selected symptom(s)", terms);
  //   if (!terms.length) {
  //     setRemedies([]);
  //     console.log("no data found");
  //   } else {
  //     setRemedies(remediesToShow);
  //     setLoading(false);
  //   }
  //   console.log("Matching recommendations:", remediesToShow);
  // };

  // const handleChange = async () => {
  //   const result = await getAllDevelopers();
  //   setDevelopers(result);
  // };

  // useEffect(() => {
  //   const result = getAllDevelopers();
  //   console.log(result);
  //   console.log(result.state);
  //   setDevelopers(result.data);
  // }, [])
  
  // useEffect(() => {
  //   getAllDevelopers().then((value) => {
  //     setDevelopers(value.data);
  //   })
  // }, [])

  // this sends a million requests per second
  
  const result = getAllDevelopers()
  result.then((value) => {
    setDevelopers(value.data);
    console.log(value);
  }).catch(err => {
    console.log(err);
  });

  return (
    <div className="main">
      <p className="description">Discover the best developers</p>
      {developers.map((developer) =>
        <DeveloperCard
            developer={developer}
        />)
      }
    </div>
  );
}
