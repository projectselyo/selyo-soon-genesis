"use client";
import React, { useState } from "react";
import Image from "next/image";
import { API_URL } from "@/constants/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // New state for the message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      entity: email,
    };

    try {
      const response = await fetch(`${API_URL}/user/magic-login/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Login link sent successfully!");
      } else {
        setMessage("Failed to send login link.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the login link.");
    }
  };

  return (
    <div className="video-background flex flex-col items-center p-6 bg-gray-100 min-h-screen mokoto">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg">
        {/* -------------PROFILE SECTION------------- */}
        <div className="flex flex-col items-center p-6 bg-gradient-to-r from-sky-600 to-emerald-300 rounded-t-lg">
          <div className="w-24 h-24 rounded-full border-2 border-white mb-4 overflow-hidden">
            <Image
              src="/quest-logo.png"
              alt="Quest Logo"
              width={96}
              height={96}
            />
          </div>
        </div>
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-md p-2 bg-neutral-100 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="p-2 bg-purple-500 rounded-md hover:bg-purple-700 mt-4 text-white"
            >
              Send Login Link
            </button>
          </div>
          {message && (
            <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
