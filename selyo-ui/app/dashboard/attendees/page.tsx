"use client";

import React, { useEffect, useState } from "react";
import { API_URL } from "@/constants/constants";
import Link from "next/link";
import { Mosaic } from "react-loading-indicators";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [copySuccess, setCopySuccess] = useState<string>("");

  const fetchEmails = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch(`${API_URL}/timestamp?csv=1`);
      const data = await response.text();
      // Split the response by newlines and filter out "no@email.com" and duplicates
      const emailList = data
        .split("\n")
        .map((email) => email.trim())
        .filter((email) => email !== "no@email.com" && email !== "")
        .filter((email, index, self) => self.indexOf(email) === index); // Remove duplicates
      setUsers(emailList);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setUsers([]);
    }
    setLoading(false); // Set loading to false after fetching data
  };

  const copyToClipboard = () => {
    const emailString = users.join("\n"); // Join emails with new lines
    navigator.clipboard.writeText(emailString).then(
      () => {
        setCopySuccess("Copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000); // Reset the success message after 2 seconds
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-sky-600 to-emerald-300 p-4">
        <div className="container mx-auto flex justify-start gap-5 items-center">
          <div className="text-white underline text-lg font-bold">
            Attendees
          </div>
          <Link
            className="text-white text-lg font-bold"
            href={"/dashboard/booth"}
          >
            Booth
          </Link>
          <Link
            className="text-white text-lg font-bold"
            href={"/dashboard/poll-results"}
          >
            Poll
          </Link>
        </div>
      </nav>
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
          {users.length} Attendees
        </h2>

        {/* Copy All Button */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            disabled={loading} // Disable button while loading
          >
            Copy All
          </button>
          {copySuccess && (
            <span className="text-green-600 text-sm">{copySuccess}</span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <Mosaic color="#00ffff" size="large" text="" textColor="" />
            {/* Loading indicator */}
          </div>
        ) : (
          <ul className="bg-white text-neutral-800 shadow rounded-md p-4">
            {users.length > 0 ? (
              users.map((email, index) => (
                <li
                  key={index}
                  className="border-b last:border-b-0 py-2 flex justify-between items-center"
                >
                  <div>{email}</div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 py-2">No users found.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;
