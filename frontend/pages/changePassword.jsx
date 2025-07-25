import React, { useState } from "react";
import { useRouter } from "next/router"; 

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter(); 

  const updPassword = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:5000/user/profile/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword: oldPassword, newPassword }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Password Changed Successfully");
        setOldPassword("");
        setNewPassword("");
        router.push("/userProfile"); // ✅ Redirect after success
      } else {
        alert(data?.message || "Something went wrong");
      }
    } catch (err) {
      console.log("Error : ", err);
      alert("Error updating password");
    }
  };

  return (
    <div className="fade-zoom-in flex justify-center items-center min-h-235 bg-background px-4 py-12">
      <div className="bg-primary shadow-2xl rounded-2xl p-10 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-text mb-8 border-b-4 border-zinc-600 pb-4 text-center">
          Change Password
        </h1>

        <div className="space-y-6 text-left">
          <div>
            <label
              htmlFor="oldpassword"
              className="block mb-2 text-text font-semibold"
            >
              Old Password
            </label>
            <input
              id="oldpassword"
              type="password"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="newpassword"
              className="block mb-2 text-text font-semibold"
            >
              New Password
            </label>
            <input
              id="newpassword"
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={updPassword}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
