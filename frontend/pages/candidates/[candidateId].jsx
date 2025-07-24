import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CandidatePage = () => {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();
  const { candidateId } = router.query;
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    if (candidateId) {
      fetch(`http://localhost:5000/candidate/${candidateId}`)
        .then((res) => res.json())
        .then((data) => setCandidate(data.response))
        .catch((err) => console.error(err));
    }
  }, [candidateId]);

  useEffect(() => {
    if (candidate) {
      setName(candidate.name);
      setAge(candidate.age);
      setParty(candidate.party);
    }
  }, [candidate]);

  const updateUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const payload = { name, party, age };
      const response = await fetch(
        `http://localhost:5000/candidate/${candidateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Candidate Updated Successfully");
        alert("Candidate Updated Successfully");
        router.push("/candidates");
      } else {
        console.log("Something went wrong");
        alert("Something went wrong");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  if (!candidate) return <p>Loading...</p>;

  return (
    <div className="min-h-236 w-full bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Edit Candidate
        </h2>

        <form className="space-y-5">
          {/* Name OF CANDIDATE */}
          <div className="flex flex-col justify-between gap-2 ">
            <label
              htmlFor="name"
              className="block text-m font-semibold text-gray-700 dark:text-white m-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter candidate's name"
              className="w-full px-4 py-2 text-white placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Party OF CANDIDATE */}
            <label
              htmlFor="party"
              className="block text-m font-semibold text-gray-700 dark:text-white m-2"
            >
              Party
            </label>
            <input
              id="party"
              type="text"
              placeholder="Enter candidate's party"
              className="w-full px-4 py-2 text-white placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={party}
              onChange={(e) => setParty(e.target.value)}
            />
            <label
              className="block text-m font-semibold text-gray-700 dark:text-white m-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              className="w-full px-4 py-2 text-white placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                onClick={updateUser}
                type="button"
                className="w-40 cursor-pointer px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 font-semibold transition"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidatePage;
