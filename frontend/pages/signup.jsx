import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Signup = () => {
  let [name, setName] = useState("");
  let [age, setAge] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [cnic, setCnic] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("voter");
  let [specialkey, setSpecialKey] = useState("");
  const router = useRouter();
  // Code to Register User:

  const registerUser = async () => {
    try {
      //POST:
      const payload = {
        name: name,
        age: age,
        email: email,
        mobile: mobile,
        cnic: cnic,
        password: password,
        role: role,
        ...(role === "admin" && { specialkey }),
      };

      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Account Created");
        console.log("✅ Signup Success:", data);
        // Assign a token
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
    <div className="animate-fade-in w-full min-h-236 bg-background flex justify-center items-center px-4 py-10">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-secondary rounded-lg shadow-lg overflow-hidden">
        {/* Left Image */}
        <div
          className="hidden lg:block lg:w-5/12 bg-cover"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_vector-1720757906257-6c7e2660a7ae?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>

        {/* Right Form */}
        <div className="w-full lg:w-7/12 p-8 flex flex-col justify-center items-center">
          <h3 className="py-4 text-2xl text-center text-text">
            Create an Account!
          </h3>
          <form className="w-full px-8 pt-6 pb-8 mb-4 bg-white text-heading rounded">
            {/* Row 1: Name and Age */}
            <div className="flex justify-between mb-4 gap-5">
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-bold text-heading"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-bold text-heading"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  required
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            {/* Row 2: CNIC and Mobile */}
            <div className="flex justify-between mb-4 gap-5">
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-bold text-heading"
                  htmlFor="cnic"
                >
                  CNIC
                </label>
                <input
                  id="cnic"
                  type="text"
                  required
                  placeholder="CNIC Number"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-bold text-heading"
                  htmlFor="mobile"
                >
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            {/* Row 3: Email and Password */}
            <div className="flex justify-between mb-4 gap-5">
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-bold text-heading"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-1/2">
                <label
                  className="block mb-2 text-sm font-bold text-heading"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="******************"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            {/* Admin Switch centered */}
            <div className="flex justify-center items-center mt-6 mb-6 gap-2">
              <label className="text-sm font-bold text-heading" htmlFor="admin">
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
                    if (!isAdmin) {
                      setSpecialKey(""); // Reset special key if user unchecks Admin
                    }
                  }}
                  className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                />
                <label
                  htmlFor="admin"
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                ></label>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  role === "admin"
                    ? "opacity-100 max-h-40 scale-100 mt-4 translate-y-0"
                    : "opacity-0 max-h-0 scale-95 -translate-y-2"
                } bg-success text-white p-2 rounded-md`}
              >
                {role === "admin" && (
                  <div
                    id="special"
                    className="bg-success text-white p-2 rounded-md"
                  >
                    <label htmlFor="spec_key">Enter Special Key: </label>
                    <input
                      className="bg-white rounded-md border border-black text-heading"
                      type="password"
                      name="spec_key"
                      id="spec_key"
                      value={specialkey}
                      onChange={(e) => setSpecialKey(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Register Button */}
            <div className="mb-6 text-center">
              <button
                className="w-full cursor-pointer px-4 py-2 font-bold text-text bg-button rounded-full hover:bg-accent hover:text-primary focus:outline-none focus:shadow-outline"
                type="button"
                onClick={registerUser}
              >
                Register Account
              </button>
              <div className="text-center">
                <Link
                  className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                  href="/login"
                >
                  Already have an account? Login!
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
