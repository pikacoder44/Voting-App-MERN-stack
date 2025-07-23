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

  // checkTokenExpiry = true --> means token exist
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

  const Vote = (props) => {
    const userData = getUserFromToken();
    if (!checkTokenExpiry()) {
      return (
        <div className="relative group inline-block">
          <button
            disabled
            className="py-1 px-3 rounded-md bg-gray-600 cursor-not-allowed"
          >
            Vote
          </button>

          {/* Tooltip */}
          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Login Required
              </h3>
            </div>
            <div className="px-3 py-2">
              <p>
                You need to sign in to cast your vote. Please log in or sign up
                to continue.
              </p>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 rotate-45 border-l border-b border-gray-200 dark:border-gray-600"></div>
          </div>
        </div>
      );
    } else if (userData.isVoted) {
      return (
        <button
          disabled
          className=" disabled:cursor-not-allowed py-1 px-3 rounded-md disabled:bg-gray-600 "
        >
          Voted
        </button>
      );
    } else {
      return (
        <button
          onClick={() => voteCast(props.id)}
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 py-1 px-3 rounded-md disabled:bg-gray-600 "
        >
          Vote
        </button>
      );
    }
  };

  const getUserFromToken = () => {
    if (typeof window === "undefined") return null; // Prevent SSR crash

    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);

      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const AddCandidate = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.role === "admin") {
            setIsAdmin(true);
          }
        } catch (err) {
          console.error("Invalid token", err);
        }
      }
    }, []);

    if (!isAdmin) return null;

    return (
      <Link
        href="/addcandidate"
        className="bg-blue-500 hover:text-white cursor-pointer hover:bg-blue-700 py-2 px-3 rounded-md disabled:bg-gray-600"
      >
        Add Candidates
      </Link>
    );
  };

  return (
    <div className="bg-amber-50 w-full min-h-235 flex flex-col justify-center items-center text-center ">
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

            <Vote id={item._id} />
          </div>
        ))}
      </div>
      <AddCandidate />
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
      <p className="text-red-500 ">
        Candidate Edit and Delete Feature...pending
      </p>
    </div>
  );
};

export default Candidates;
