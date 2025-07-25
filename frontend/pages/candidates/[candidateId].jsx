import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const CandidatePage = () => {
  const router = useRouter();
  const { candidateId } = router.query;

  const [candidate, setCandidate] = useState(null);
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");

  // Fetch candidate by ID
  useEffect(() => {
    if (candidateId) {
      fetch(`${API_BASE}/candidate/${candidateId}`)
        .then((res) => res.json())
        .then((data) => {
          setCandidate(data.response);
          setName(data.response.name);
          setParty(data.response.party);
          setAge(data.response.age);
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [candidateId]);

  // Update handler
  const updateCandidate = async () => {
    const token = localStorage.getItem("token");
    const payload = { name, party, age };

    try {
      const res = await fetch(`${API_BASE}/candidate/${candidateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Candidate updated successfully");
        router.push("/candidates");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!candidate) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className=" flex flex-col min-h-[calc(100vh-4rem-5rem)]  bg-background">
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-lg bg-secondary shadow-md rounded-lg p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-text mb-6">
            Edit Candidate
          </h2>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              updateCandidate();
            }}
          >
            <div className="flex flex-col gap-4">
              <label className="text-text font-medium">
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter candidate's name"
                  className="mt-1 w-full px-4 py-2 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="text-text font-medium">
                Party
                <input
                  type="text"
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                  placeholder="Enter candidate's party"
                  className="mt-1 w-full px-4 py-2 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="text-text font-medium">
                Age
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="mt-1 w-full px-4 py-2 bg-transparent border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <button
                type="submit"
                className="mt-4 w-full bg-button text-text hover:bg-accent hover:text-primary font-semibold py-2 rounded-md transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </main>

    </div>
  );
};

export default CandidatePage;
