import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const Addcandidate = () => {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  const regUser = async () => {
    const payload = { name, party, age };
    try {
      const result = await fetch(`${API_BASE}/candidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // Response in any case:
      if (result.ok) {
        console.log("Candidate Registered Successfully!");
        alert("Candidate Registered Successfully!");
        router.push("/candidates");
      } else {
        console.log("Something went wrong");
        alert("Something went wrong");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem-5rem)]  w-full bg-background flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-lg  bg-secondary shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center  text-text mb-6">
          Add Candidate
        </h2>

        <form className="space-y-5">
          {/* Name OF CANDIDATE */}
          <div className="flex flex-col justify-between gap-2 ">
            <label
              htmlFor="name"
              className="block text-m font-semibold  text-text m-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter candidate's name"
              className="w-full px-4 py-2 text-text placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Party OF CANDIDATE */}
            <label
              htmlFor="party"
              className="block text-m font-semibold text-text m-2"
            >
              Party
            </label>
            <input
              id="party"
              type="text"
              placeholder="Enter candidate's party"
              className="w-full px-4 py-2 text-text placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            />
            <label
              className="block text-m font-semibold  text-text m-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              className="w-full px-4 py-2 text-text placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                className="w-40 cursor-pointer px-4 py-2 text-text hover:text-primary bg-button rounded-md hover:bg-accent font-semibold transition"
                onClick={regUser}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addcandidate;
