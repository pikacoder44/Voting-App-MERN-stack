import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("voter");
  const [specialkey, setSpecialKey] = useState("");
  const router = useRouter();

  const registerUser = async () => {
    try {
      const payload = {
        name,
        age,
        email,
        mobile,
        cnic,
        password,
        role,
        ...(role === "admin" && { specialkey }),
      };

      const response = await fetch(`${API_BASE}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account Created");
        if (typeof window !== "undefined" && data.token) {
          localStorage.setItem("token", data.token);
        }
        router.push("/candidates");
      } else {
        alert("❌ Signup failed");
        console.error("Server Error:", data);
      }
    } catch (err) {
      alert("❌ Network error");
      console.error("Error:", err);
    }
  };

  return (
    <div className="animate-fade-in w-full min-h-[calc(100vh-4rem)] bg-background flex justify-center items-center px-4 py-10">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-secondary rounded-lg shadow-lg overflow-hidden">
        {/* Left Image */}
        <div
          className="hidden lg:block lg:w-5/12 bg-cover"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_vector-1720757906257-6c7e2660a7ae?q=80&w=701&auto=format&fit=crop')",
          }}
        ></div>

        {/* Right Form */}
        <div className="w-full lg:w-7/12 p-8 flex flex-col justify-center items-center">
          <h3 className="py-4 text-2xl text-center text-text">
            Create an Account!
          </h3>
          <form className="w-full px-4 pt-6 pb-8 mb-4 bg-white text-heading rounded">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row justify-between gap-5 mb-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-2 text-sm font-bold" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                  placeholder="Full Name"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-2 text-sm font-bold" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                  placeholder="Age"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row justify-between gap-5 mb-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-2 text-sm font-bold" htmlFor="cnic">
                  CNIC
                </label>
                <input
                  id="cnic"
                  type="text"
                  required
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                  placeholder="CNIC Number"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-2 text-sm font-bold" htmlFor="mobile">
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                  placeholder="Mobile Number"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row justify-between gap-5 mb-4">
              <div className="w-full md:w-1/2">
                <label className="block mb-2 text-sm font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block mb-2 text-sm font-bold" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                  placeholder="******************"
                />
              </div>
            </div>

            {/* Admin Toggle */}
            <div className="flex justify-center items-center mt-6 mb-6 gap-2">
              <label htmlFor="admin" className="text-sm font-bold">
                Admin
              </label>
              <div className="relative inline-block w-11 h-5">
                <input
                  id="admin"
                  type="checkbox"
                  checked={role === "admin"}
                  onChange={(e) => {
                    const isAdmin = e.target.checked;
                    setRole(isAdmin ? "admin" : "voter");
                    if (!isAdmin) setSpecialKey("");
                  }}
                  className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                />
                <label
                  htmlFor="admin"
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                ></label>
              </div>
            </div>

            {/* Special Key */}
            {role === "admin" && (
              <div className="transition-all duration-500 bg-success text-white p-3 rounded mb-6">
                <label htmlFor="spec_key">Enter Special Key: </label>
                <input
                  id="spec_key"
                  type="password"
                  value={specialkey}
                  onChange={(e) => setSpecialKey(e.target.value)}
                  className="ml-2 px-2 py-1 bg-white text-heading border border-black rounded"
                />
              </div>
            )}

            {/* Button + Link */}
            <div className="mb-4">
              <button
                type="button"
                onClick={registerUser}
                className="w-full px-4 py-2 font-bold text-text bg-button rounded-full hover:bg-accent hover:text-primary focus:outline-none"
              >
                Register Account
              </button>
            </div>
            <div className="text-center">
              <Link
                href="/login"
                className="inline-block text-sm text-blue-500 hover:text-blue-800"
              >
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
