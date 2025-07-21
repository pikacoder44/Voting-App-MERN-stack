// pages/_app.js
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiryTime = decoded.exp * 1000; // Convert to ms
        const now = Date.now();
        const timeout = expiryTime - now;

        if (timeout > 0) {
          const timer = setTimeout(() => {
            localStorage.removeItem("token");
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }, timeout);

          return () => clearTimeout(timer);
        } else {
          // Token already expired
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
};

export default MyApp;
