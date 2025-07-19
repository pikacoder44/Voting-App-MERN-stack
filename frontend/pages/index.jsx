import React from "react";
import Link from "next/link";
import Image from "next/image";
const Index = () => {
  return (
    <div className="bg-white w-full min-h-235 flex flex-col justify-center items-center">
      <h1 className="text-6xl font-semibold mt-30">
        "Empowering Democracy, One Vote at a Time"
      </h1>
      <h3 className="text-3xl font-light mt-2">
        A secure and transparent way to cast your vote online. Join now and make
        your voice heard
      </h3>
      <button className="text-white bg-blue-500 p-2 cursor-pointer hover:bg-blue-700 mt-6 rounded-md">
        {" "}
        <Link href={"/signup"}> Login to Vote</Link>
      </button>

      {/* Cards  */}
      <div className="flex flex-row justify-around gap-6 mt-10">
        {/* Card #1  */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
          <Image
            className="object-cover object-center"
            src={"/log_in.svg"}
            width={250}
            height={250}
          ></Image>

          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                🛡️ Secure Voting System
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Cast your vote with confidence using our encrypted, tamper-proof
              voting mechanism designed for transparency and trust.
            </p>
          </div>
        </div>
        {/* Card #2  */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
          <Image
            className="p-0 m-0"
            src={"/verified_cand.svg"}
            width={250}
            height={250}
          ></Image>

          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                👥 View Verified Candidates
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Browse a list of officially verified candidates with complete
              profiles to make an informed voting decision.
            </p>
          </div>
        </div>
        {/* Card #3 */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
          <Image
            className=" p-0 m-0 object-cover scale-110"
            src={"/vote-count.svg"}
            width={250}
            height={250}
          ></Image>

          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                📊 Real-Time Vote Count
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Stay updated with live vote tracking and instant results — no
              delays, just transparency.
            </p>
          </div>
        </div>
        {/* Card #4 */}
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
          <Image src={"/security.svg"} width={250} height={250}></Image>

          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                🔐 Privacy Protected
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Your identity and vote remain fully anonymous through advanced
              privacy protocols and end-to-end encryption.
            </p>
          </div>
        </div>
      </div>
      {/* Instructions  */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-2xl text-white font-bold uppercase mb-2">Step 1</h4>
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Create Account / Login
              </h3>
              <p className="text-gray-200">
                Sign up or log in to your secure account to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-2xl text-white font-bold uppercase mb-2">Step 2</h4>
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Compare Candidates
              </h3>
              <p className="text-gray-200">
                View candidate profiles, agendas, and compare before voting.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-2xl text-white font-bold uppercase mb-2">Step 3</h4>
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2l4 -4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Cast Your Vote
              </h3>
              <p className="text-gray-200">
                Make your choice and submit your vote securely and easily.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
