import React, { useState } from "react";

const Login = () => {
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("voter");
  const [specialkey, setSpecialKey] = useState("");

  // Login Function:
  const loginUser = async () => {
    try {
      const payload = { cnic, password, role, specialkey };
      if (role === "admin") payload.specialkey = specialkey;

      const result = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      if (result.ok) {
        alert("✅ Login Successful");
        if (typeof window !== "undefined" && data.token) {
          localStorage.setItem("token", data.token);
        }
      } else {
        alert(`❌ Login Failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.log("Login Error: ", err);
    }
  };

  return (
    <div className="min-h-236 w-full bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-5">
          {/* CNIC */}
          <div>
            <label
              htmlFor="cnic"
              className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
            >
              CNIC
            </label>
            <input
              id="cnic"
              type="text"
              placeholder="Enter your CNIC"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="w-full px-4 py-2 text-white placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-white placeholder-gray-400 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Admin Toggle & Special Key */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="admin-cb"
              className="text-sm font-semibold text-gray-700 dark:text-white"
            >
              Admin
            </label>
            <div className="relative inline-block w-11 h-5">
              <input
                id="admin-cb"
                type="checkbox"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.checked ? "admin" : "voter")}
                className="peer placeholder-gray-400  appearance-none w-11 h-5 bg-slate-200 rounded-full checked:bg-blue-600 cursor-pointer transition"
              />
              <label
                htmlFor="admin-cb"
                className="absolute top-0 left-0 w-5 h-5 bg-white border border-gray-300 rounded-full shadow transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-600"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-500 overflow-hidden ${
              role === "admin" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-2">
              <label
                htmlFor="spec_key"
                className="block text-sm font-semibold text-gray-700 dark:text-white mb-1"
              >
                Enter Special Key
              </label>
              <input
                id="spec_key"
                type="password"
                placeholder="Admin special key"
                value={specialkey}
                onChange={(e) => setSpecialKey(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={loginUser}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 font-semibold transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
