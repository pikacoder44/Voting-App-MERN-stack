import React from "react";
import Link from "next/link";
import Image from "next/image";
const Index = () => {
  return (
    <div className="fade-zoom-in bg-background w-full min-h-235 flex flex-col justify-center items-center">
      <h1 className="text-6xl text-heading font-semibold mt-30">
        "Empowering Democracy, One Vote at a Time"
      </h1>
      <h3 className="text-3xl text-heading font-light mt-2">
        A secure and transparent way to cast your vote online. Join now and make
        your voice heard
      </h3>
      
      <button class="btn mt-4 relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-button rounded hover:bg-white group py-2.5 px-3.5">
        <span class="w-56 h-48 rounded bg-primary absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span class="relative w-full text-left text-text transition-colors duration-300 ease-in-out group-hover:text-blue-500">
          <Link href={"/signup"}> Login to Vote</Link>
        </span>
      </button>

      {/* Cards  */}
      <div className="flex flex-row justify-around gap-6 mt-10">
        {/* Card #1  */}
        <div
          className="group max-w-sm p-6 border text-text rounded-lg shadow-sm bg-secondary border-gray-700 
  flex flex-col justify-center items-center 
  transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
 
  hover:bg-zinc-300 hover:text-heading hover:border-transparent cursor-pointer"
        >
          <Image
            className="object-cover object-center transition-transform duration-300 hover:scale-110"
            src={"/log_in.svg"}
            width={250}
            height={250}
            alt="Image"
          ></Image>

          <div className="p-5 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:delay-100">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight   ">
                🛡️ Secure Voting System
              </h5>
            </a>
            <p className="mb-3 font-normal  ">
              Cast your vote with confidence using our encrypted, tamper-proof
              voting mechanism designed for transparency and trust.
            </p>
          </div>
        </div>
        {/* Card #2  */}
        <div
          className="group max-w-sm p-6 border text-text rounded-lg shadow-sm bg-secondary border-gray-700 
  flex flex-col justify-center items-center 
  transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
 
  hover:bg-zinc-300 hover:text-heading hover:border-transparent cursor-pointer"
        >
          <Image
            className="p-0 m-0 object-cover object-center transition-transform duration-300 hover:scale-110"
            src={"/verified_cand.svg"}
            width={250}
            height={250}
            alt="Image"
          ></Image>

          <div className="p-5 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:delay-100">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight  ">
                👥 View Verified Candidates
              </h5>
            </a>
            <p className="mb-3 font-normal ">
              Browse a list of officially verified candidates with complete
              profiles to make an informed voting decision.
            </p>
          </div>
        </div>
        {/* Card #3 */}
        <div
          className="group max-w-sm p-6 border text-text rounded-lg shadow-sm bg-secondary border-gray-700 
  flex flex-col justify-center items-center 
  transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
 
  hover:bg-zinc-300 hover:text-heading hover:border-transparent cursor-pointer"
        >
          <Image
            className=" p-0 m-0 object-cover object-center transition-transform duration-300 hover:scale-120 scale-110"
            src={"/vote-count.svg"}
            width={250}
            height={250}
            alt="Image"
          ></Image>

          <div className="p-5 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:delay-100">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight  ">
                📊 Real-Time Vote Count
              </h5>
            </a>
            <p className="mb-3 font-normal  ">
              Stay updated with live vote tracking and instant results — no
              delays, just transparency.
            </p>
          </div>
        </div>
        {/* Card #4 */}
        <div
          className=" group max-w-sm p-6 border text-text rounded-lg shadow-sm bg-secondary border-gray-700 
  flex flex-col justify-center items-center 
  transition-all duration-300 transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
 
  hover:bg-zinc-300 hover:text-heading hover:border-transparent cursor-pointer"
        >
          <Image
            className="object-cover object-center transition-transform duration-300 hover:scale-110"
            src={"/security.svg"}
            width={250}
            height={250}
            alt="Image"
          ></Image>

          <div className="p-5 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:delay-100">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight  ">
                🔐 Privacy Protected
              </h5>
            </a>
            <p className="mb-3 font-normal ">
              Your identity and vote remain fully anonymous through advanced
              privacy protocols and end-to-end encryption.
            </p>
          </div>
        </div>
      </div>
      {/* Instructions  */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-heading mb-10">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="group bg-secondary p-6 rounded-lg shadow transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-accent">
              <h4 className="text-2xl text-text font-bold uppercase mb-2">
                Step 1
              </h4>
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110"
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
              <h3 className="text-xl font-semibold text-text mb-2">
                Create Account / Login
              </h3>
              <p className="text-text">
                Sign up or log in to your secure account to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group bg-secondary p-6 rounded-lg shadow transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-accent">
              <h4 className="text-2xl  text-text font-bold uppercase mb-2">
                Step 2
              </h4>
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110"
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
              <h3 className="text-xl font-semibold  text-text mb-2">
                Compare Candidates
              </h3>
              <p className="text-text">
                View candidate profiles, agendas, and compare before voting.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group bg-secondary p-6 rounded-lg shadow transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:ring-2 hover:ring-accent">
              <h4 className="text-2xl  text-text font-bold uppercase mb-2">
                Step 3
              </h4>
              <div className="text-blue-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110"
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
              <h3 className="text-xl font-semibold  text-text mb-2">
                Cast Your Vote
              </h3>
              <p className="text-text">
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
