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
    <nav className="bg-white border-gray-200 dark:bg-primary">
      <div className="flex flex-wrap items-center justify-between mx-auto p-5">
        <Link href="/" className="text-2xl font-semibold dark:text-white">
          GOVT VOTING
        </Link>

        <div className="hidden md:flex md:items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`py-2 px-3 rounded-sm hover:bg-gray-800
 relative transition-all duration-300 ease-in-out transform
    ${
      currentRoute === item.path
        ? "text-orange-500 font-semibold"
        : " text-white  hover:text-accent hover:scale-105"
    } 
    before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 hover:before:w-full before:bg-orange-500 before:transition-all before:duration-300`}
            >
              {item.name}
            </Link>
          ))}

          {/* Profile Dropdown Trigger */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="py-2 px-3 rounded-sm text-white hover:text-accent transition-all duration-300 hover:scale-105"
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
