import React, { useEffect, useState } from "react";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_BASE}/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await response.json();
        if (response.ok) {
          setUser(userData.user);
        } else {
          console.log("Unauthorized");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  const isUserEmpty = Object.keys(user).length === 0;

  return (
    <div className=" fade-zoom-in flex justify-center items-center min-h-235 bg-background px-4">
      <div className="bg-primary shadow-2xl rounded-2xl p-12 w-full max-w-3xl text-center transition-transform duration-300 hover:scale-105">

        <h1 className="text-5xl font-bold text-text mb-10 border-b-4 border-zinc-600 pb-4">
          Profile
        </h1>
        {isUserEmpty ? (
          <h1 className="font-bol text-3xl text-error">
            Please Login to see Profile
          </h1>
        ) : (
          <div className="space-y-6 text-2xl text-text">
            <div>
              <span className="font-semibold">Name:</span> {user.name || "—"}
            </div>
            <div>
              <span className="font-semibold">Age:</span> {user.age || "—"}
            </div>
            <div>
              <span className="font-semibold">Mobile:</span>{" "}
              {user.mobile || "—"}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {user.email || "—"}
            </div>
            <div>
              <span className="font-semibold">CNIC:</span> {user.cnic || "—"}
            </div>
            <div>
              {user.role === "admin" ? (
                <span className="font-bold text-red-500">{user.role}</span>
              ) : (
                <span className="font-bold text-blue-600">
                  {user.role || "—"}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
