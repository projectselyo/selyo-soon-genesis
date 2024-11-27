"use client";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/constants/constants";
import Link from "next/link";
import { Mosaic } from "react-loading-indicators";

interface PollResultsData {
  [key: string]: number; // The keys are the poll options (e.g., 'lbank', 'coinex') and the values are the number of votes
}

const PollResults: React.FC = () => {
  const [handle, setHandle] = useState<string>(""); // To hold the handle input
  const [pollResults, setPollResults] = useState<PollResultsData | null>(null); // To hold poll results data
  const [error, setError] = useState<string | null>(null); // To handle any errors
  const [loading, setLoading] = useState<boolean>(false); // To track loading state

  // Function to fetch poll results based on the handle
  const fetchPollResults = async () => {
    if (!handle.trim()) {
      setError("Please enter a valid handle.");
      return;
    }

    setLoading(true); // Start loading
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/vote/get-polls/${handle}/results`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch poll results.");
      }
      const data = await response.json();
      setPollResults(data);
    } catch (err) {
      console.error("Error fetching poll results:", err);
      setError("Error fetching poll results. Please try again.");
      setPollResults(null);
    } finally {
      setLoading(false); // Stop loading after fetching is done
    }
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
          <Link
            className="text-white text-lg font-bold"
            href={"/dashboard/booth"}
          >
            Booth
          </Link>

          <div className="text-white underline text-lg font-bold">Poll</div>
        </div>
      </nav>

      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
          Poll Results
        </h2>

        {/* Input for handle and fetch button */}
        <div className="mb-4 flex gap-4 items-center">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter poll handle"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={fetchPollResults}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Poll Results"}
          </button>
        </div>

        {/* Error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center">
            <Mosaic color="#00ffff" size="large" text="" textColor="" />
          </div>
        )}

        {/* Display poll results */}
        {!loading && pollResults ? (
          <ul className="bg-white text-neutral-800 shadow rounded-md p-4">
            {Object.entries(pollResults)
              .sort(([, a], [, b]) => b - a) // Sort by the number of votes in descending order
              .map(([option, votes], index) => (
                <li
                  key={index}
                  className="border-b last:border-b-0 py-2 flex justify-between items-center"
                >
                  <div>{option}</div>
                  <div>{votes} votes</div>
                </li>
              ))}
          </ul>
        ) : (
          !loading && (
            <div className="text-gray-500">No poll results to display.</div>
          )
        )}
      </div>
    </div>
  );
};

export default PollResults;
