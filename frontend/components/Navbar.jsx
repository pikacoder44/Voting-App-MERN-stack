import Link from "next/link";
import { useRouter } from "next/router";
import Profile from "./Profile";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Install react-icons if not already

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [openProfile, setOpenProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Candidates", path: "/candidates" },
    { name: "Login/Signup", path: "/signup" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-primary">
      <div className="flex flex-wrap items-center justify-between mx-auto p-5">
        <Link href="/" className="text-2xl font-semibold dark:text-white">
          GOVT VOTING
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
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
                  : "text-white hover:text-accent hover:scale-105"
              }
              before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 hover:before:w-full before:bg-orange-500 before:transition-all before:duration-300`}
            >
              {item.name}
            </Link>
          ))}

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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="w-full mt-4 flex flex-col space-y-4 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-4 rounded-md text-sm font-medium transition duration-300 ${
                  currentRoute === item.path
                    ? "text-orange-500 font-semibold"
                    : "text-white hover:text-orange-400"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="relative px-4" ref={profileRef}>
              <button
                onClick={() => setOpenProfile((prev) => !prev)}
                className="text-white py-2"
              >
                Profile ▾
              </button>
              {openProfile && <Profile onClose={handleCloseProfile} />}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
