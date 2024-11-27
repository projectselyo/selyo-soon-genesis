"use client";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/constants/constants";
import Link from "next/link";
import { Mosaic } from "react-loading-indicators";
import { useSearchParams } from "next/navigation";

const BoothResults: React.FC = () => {
  const [boothIds, setBoothIds] = useState<string[]>([]);
  const [newBoothId, setNewBoothId] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useSearchParams()
  // const [booth, setBooth] = useState()

  useEffect(() => {
    const boothId = router.get('booth');
    if (boothId) {
      setBoothIds([boothId]);
    }
  }, [])

  console.log(router.get('booth'))
  const handleAddBoothId = () => {
    if (newBoothId && !boothIds.includes(newBoothId)) {
      setBoothIds([...boothIds, newBoothId]);
      setNewBoothId(""); // Reset the input field
    }
  };

  const handleRemoveBoothId = (id: string) => {
    setBoothIds(boothIds.filter((boothId) => boothId !== id));
  };

  const fetchEmailsByBoothIds = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${API_URL}/booth/collection-results/with-booths`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ booths: boothIds }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        const emailList: string[] = Array.isArray(data)
          ? data
          : data.emails || [];
        const uniqueEmails = Array.from(new Set(emailList)).filter(
          (email) => email && email !== "no@email.com"
        );

        setEmails(uniqueEmails);
      } else {
        throw new Error("Failed to fetch emails");
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      setErrorMessage("Error fetching emails. Please try again.");
      setEmails([]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const copyEmailsToClipboard = () => {
    if (emails.length === 0) {
      setErrorMessage("No emails to copy.");
      return;
    }

    const emailText = emails.join("\n");
    navigator.clipboard
      .writeText(emailText)
      .then(() => {
        setErrorMessage("Emails copied to clipboard!");
      })
      .catch(() => {
        setErrorMessage("Failed to copy emails.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-sky-600 to-emerald-300 p-4">
        <div className="container mx-auto flex justify-start gap-5 items-center">
          <Link
            className="text-white text-lg font-bold"
            href={"/dashboard/attendees"}
          >
            Attendees
          </Link>
          <div className="text-white underline text-lg font-bold">Booth</div>
          <Link
            className="text-white text-lg font-bold"
            href={"/dashboard/poll-results"}
          >
            Poll
          </Link>
        </div>
      </nav>

      <div className="container mx-auto py-8 flex">
        <div className="w-1/2 p-4 bg-white shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
            Add Booth IDs
          </h2>

          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={newBoothId}
              onChange={(e) => setNewBoothId(e.target.value)}
              className="px-4 py-2 rounded-md focus:outline-none text-neutral-800 w-full focus:ring-2 focus:ring-sky-600"
              placeholder="Enter Booth ID"
            />
            <button
              onClick={handleAddBoothId}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          <ul className="bg-white text-neutral-800 shadow rounded-md p-4">
            {boothIds.length > 0 ? (
              boothIds.map((id, index) => (
                <li
                  key={index}
                  className="border-b last:border-b-0 py-2 flex justify-between items-center"
                >
                  <div>{id}</div>
                  <button
                    onClick={() => handleRemoveBoothId(id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500 py-2">No booth IDs added.</li>
            )}
          </ul>

          <div className="mt-4">
            <button
              onClick={fetchEmailsByBoothIds}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full"
              disabled={boothIds.length === 0 || loading} // Disable while loading
            >
              {loading ? "Fetching..." : "Fetch Emails"}
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        </div>

        <div className="w-1/2 p-4 bg-gray-100 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
            Emails
          </h2>
          <ul className="bg-white text-neutral-800 shadow rounded-md p-4">
            {loading ? (
              <div className="flex justify-center items-center">
                <Mosaic color="#00ffff" size="large" text="" textColor="" />
              </div> // Show loading message
            ) : emails.length > 0 ? (
              emails.map((email, index) => (
                <li
                  key={index}
                  className="border-b last:border-b-0 py-2 flex justify-between items-center"
                >
                  <div>{email}</div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 py-2">No emails found.</li>
            )}
          </ul>

          <div className="mt-4">
            <button
              onClick={copyEmailsToClipboard}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 w-full"
              disabled={emails.length === 0 || loading} // Disable while loading
            >
              Copy Emails to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoothResults;
