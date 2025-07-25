import Link from "next/link";

const Profile = ({ onClose }) => {
  const logoutUser = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        localStorage.removeItem("token");
        alert("User logged out successfully");
        console.log("Token removed.");
        window.location.href = "/login";
      } else {
        alert("No user is logged in.");
      }
    } else {
      console.warn("Window is undefined. Cannot access localStorage.");
    }

    onClose(); // Close dropdown
  };

  return (
    <div className="absolute right-0 mt-2 w-40 border rounded-md shadow-md z-50 bg-primary border-gray-700 animate-dropdown">
      <ul className="flex flex-col">
        <li>
          <Link
            href="/userProfile"
            onClick={onClose}
            className="block px-4 py-2 transition-all duration-200 ease-in-out hover:bg-accent text-white hover:text-primary"
          >
            View Profile
          </Link>
        </li>
        <li>
          <Link
            href="/changePassword"
            onClick={onClose}
            className="block px-4 py-2 transition-all duration-200 ease-in-out hover:bg-accent text-red-600 hover:text-secondary"
          >
            Change Password
          </Link>
        </li>
        <li>
          <button
            onClick={logoutUser}
            className="w-full text-left px-4 py-2 transition-all duration-200 ease-in-out hover:bg-accent text-white hover:text-primary"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
