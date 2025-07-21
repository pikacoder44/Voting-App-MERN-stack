import React, { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [token, setToken] = useState(null); // Store token after checking window

  const router = useRouter();
  useEffect(() => {
    // This will only run on client
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }

    const fetchCandidate = async () => {
      try {
        const response = await fetch("http://localhost:5000/candidate/");
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidate();
  }, []);

  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token is missing");
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      const isExpired = decoded.exp < now;

      console.log("Token decoded:", decoded);
      console.log("Now:", now, "Exp:", decoded.exp, "Expired:", isExpired);

      return !isExpired;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const voteCast = async (id) => {
    if (!checkTokenExpiry()) {
      alert("Token is expired or invalid.");
      return;
    }

    console.log("Token sent in vote:", token);
    try {
      const res = await fetch(`http://localhost:5000/candidate/vote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Voting failed");
      } else {
        alert("Vote cast successfully!");
      }

      router.refresh();
    } catch (error) {
      console.error("Vote error:", error);
      alert("An error occurred while voting.");
    }
  };

  return (
    <div className="bg-amber-50 w-full min-h-235 flex flex-col justify-center text-center ">
      <h1 className="text-6xl font-bold text-center">Candidates</h1>
      <div className="flex flex-row justify-center content-center">
        {candidates.map((item) => (
          <div
            key={item._id}
            className="bg-orange-500 text-white m-5 w-60 rounded-md p-10 text-center"
          >
            <h2 className="font-bold uppercase ">{item.name}</h2>
            <p>Age: {item.age}</p>
            <p>Party: {item.party}</p>
            <p>Vote Count: {item.voteCount}</p>

            <button
              onClick={() => voteCast(item._id)}
              disabled={!checkTokenExpiry()}
              className="bg-blue-500 cursor-pointer hover:bg-blue-700 py-1 px-3 rounded-md disabled:bg-gray-600 "
            >
              Vote
            </button>
          </div>
        ))}
      </div>
      <p className="inline">
        Wanna Vote?{" "}
        <Link
          href="/signup"
          className="text-blue-500 font-bold hover:text-blue-700 "
        >
          Sign up
        </Link>{" "}
        to start voting
      </p>
    </div>
  );
};

export default Candidates;
