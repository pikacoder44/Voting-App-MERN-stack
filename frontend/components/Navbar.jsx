import Link from "next/link";
import { useRouter } from "next/router";
import Profile from "./Profile";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Candidates", path: "/candidates" },
    { name: "Login/Signup", path: "/signup" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to close profile dropdown, passed to Profile component
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-5">
        <Link href="/" className="text-2xl font-semibold dark:text-white">
          GOVT VOTING
        </Link>

        <div className="hidden md:flex md:items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`py-2 px-3 rounded-sm ${
                currentRoute === item.path
                  ? "text-blue-700 font-semibold"
                  : "text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Profile Dropdown Trigger */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="py-2 px-3 rounded-sm text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
            >
              Profile ▾
            </button>
            {openProfile && <Profile onClose={handleCloseProfile} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
