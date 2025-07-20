import React from "react";

const login = () => {
  return (
    <div className="w-full min-h-236 bg-white flex justify-center items-center px-4 py-10">
      <div className="flex flex-col h-100 justify-center lg:flex-row w-full max-w-2xl bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="w-full p-4 m-0 flex flex-col justify-center items-center">
          <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
            Login Account!
          </h3>
          <form className="w-full p-4 mb-3 bg-white text-black rounded">
            <div className="flex flex-col justify-around gap-2 h-50 w-full">
              <label
                className="block mb-2 text-sm font-bold text-black"
                htmlFor="cnic"
              >
                CNIC
              </label>
              <input
                id="cnic"
                type="text"
                placeholder="CNIC Number"
                className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
              />
              <label
                className="block mb-2 text-sm font-bold text-black"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="******************"
                className="w-full px-3 py-2 text-sm border rounded shadow focus:outline-none focus:shadow-outline"
              />
              <div className="flex justify-center  w-full">
                <button
                  className="w-20 cursor-pointer px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
