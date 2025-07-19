import React, { useEffect, useState } from "react";
import Link from "next/link";
const Candidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch("http://localhost:5000/candidate/");
        const data = await response.json();
        console.log(data);
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidate();
  }, []);

  return (
    <div className="bg-amber-50 w-full min-h-235 flex flex-col justify-center text-center ">
      <h1 className="text-6xl font-bold text-center">Candidates</h1>
      <div className="flex flex-row justify-center content-center">
        {candidates.map((item) => {
          return (
            <div
              key={item._id}
              className="bg-orange-500 text-white m-5 w-60 rounded-md p-10 text-center"
            >
              <h2 className="font-bold uppercase ">{item.name}</h2>
              <p>Age: {item.age}</p>
              <p>Party: {item.party}</p>
              <p>Vote Count: {item.voteCount}</p>
             <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 py-1 px-3 rounded-md" >Vote</button>
            </div>
          );
        })}
      </div>
      <p className="inline">

      Wanna Vote? <Link href="/signup" className="text-blue-500 font-bold hover:text-blue-700 ">Sign up</Link> to start voting
      </p>


    </div>
  );
};

export default Candidates;
