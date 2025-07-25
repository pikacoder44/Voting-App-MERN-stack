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
            className="py-2 px-3 rounded-md bg-gray-600 text-white cursor-not-allowed"
          >
            Vote
          </button>

          {/* Tooltip */}
          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-64 text-sm  text-primaryray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible dark: text-primaryray-400 dark:border-gray-600 dark:bg-gray-800">
            <div className="px-3 py-2 border-b  rounded-t-lg border-gray-600 bg-primary">
              <h3 className="font-semibold   text-primaryray-900 text-error">
                Login Required
              </h3>
            </div>
            <div className="px-3 py-2 bg-primary text-background">
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
          className="py-2 px-3 rounded-md bg-gray-600 text-white cursor-not-allowed"
        >
          Voted
        </button>
      );
    } else {
      return (
        <button
          onClick={() => voteCast(props.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-md cursor-pointer"
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

  const Editing = (props) => {
    const userData = getUserFromToken();

    if (userData && userData.role === "admin") {
      return (
        <div className="flex flex-row justify-center items-center content-center gap-2 text-black">
          <Link
            href={`/candidates/${props.id}`}
            className="bg-success hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteCandidate(props.id)}
            className="bg-error hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      );
    }

    return null;
  };

  const deleteCandidate = async (id) => {
    if (!checkTokenExpiry()) {
      alert("Token is expired or invalid.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/candidate/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Delete failed.");
      } else {
        alert("Candidate deleted successfully!");

        // Refresh candidate list after deletion
        setCandidates((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting.");
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
      <div>
        <Link
          href="/addcandidate"
          className="bg-button text-text hover:text-primary cursor-pointer hover:bg-accent py-2 px-3 rounded-md disabled:bg-gray-600"
        >
          Add Candidates
        </Link>
      </div>
    );
  };

  return (
    <div className="animate-slide-fade-in bg-background flex flex-col justify-center items-center w-full min-h-235 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-8 text-primary">
          Candidates
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {candidates.map((item) => (
            <div
              key={item._id}
              className="bg-white text-primary p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer hover:bg-primary hover:text-text"
            >
              <h2 className="text-xl font-bold uppercase mb-2">{item.name}</h2>
              <p className="text-sm">Age: {item.age}</p>
              <p className="text-sm">Party: {item.party}</p>
              <p className="text-sm font-medium mt-1">
                Votes: {item.voteCount}
              </p>

              <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                <Vote id={item._id} />
                <Editing id={item._id} />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <AddCandidate />
        </div>

        <p className=" text-primaryray-600">
          Wanna Vote?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>{" "}
          to start voting!
        </p>
      </div>
    </div>
  );
};

export default Candidates;
