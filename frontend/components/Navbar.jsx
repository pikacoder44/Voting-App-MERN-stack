// Navbar.jsx
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Candidates", path: "/candidates" },
    { name: "Login/Signup", path: "/signup" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-5">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            GOVT VOTING
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    currentRoute === item.path
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
