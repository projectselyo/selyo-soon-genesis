"use client";
import debounce from "debounce";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants/constants";

interface User {
  id: string;
  name: string;
  email: string;
  publicKey: string;
  uid: string;
}

const UserList: React.FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      alert("You need to log in to access this page.");
      router.push("/api/auth/login");
    }
  }, [user, isLoading, router]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUid, setNewUid] = useState<string>("");

  const openModal = (user: User) => {
    setCurrentUser(user);
    setNewUid(user.uid);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleSave = async () => {
    if (currentUser) {
      try {
        // Split the id to remove the 'users:' prefix if it exists
        const userId = currentUser.id.includes("users:")
          ? currentUser.id.split("users:")[1]
          : currentUser.id;

        const response = await fetch(`${API_URL}/user/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: newUid }),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === currentUser.id ? { ...user, uid: newUid } : user
            )
          );
          closeModal();
        } else {
          console.error("Failed to update user:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const fetchUsers = async (email: string) => {
    try {
      const response = await fetch(`${API_URL}/user/search?email=${email}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };
  const debouncedFetchUsers = debounce(fetchUsers, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setSearchTerm(email);
    debouncedFetchUsers(email);
  };

  useEffect(() => {
    fetchUsers("");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-sky-600 to-emerald-300 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">Device Management</div>
        </div>
      </nav>
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">
          Devices
        </h2>
        <input
          type="text"
          className="px-4 py-2 rounded-md focus:outline-none text-neutral-800 mb-4 focus:ring-2 focus:ring-sky-600 min-w-full"
          placeholder="Search devices by id..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul className="bg-white text-neutral-800 shadow rounded-md p-4">
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user.id}
                className="border-b last:border-b-0 py-2 flex justify-between items-center"
              >
                <div>
                  <div>Name: {user.name}</div>
                  <div>Email: {user.email}</div>
                  <div>PublicKey: {user.publicKey}</div>
                  <div>
                    {!user.uid ? (
                      <span className="text-red-500">UID: Not set</span>
                    ) : (
                      `UID: ${user.uid}`
                    )}
                  </div>
                </div>
                <button
                  onClick={() => openModal(user)}
                  className="ml-4 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 focus:outline-none"
                >
                  Edit
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500 py-2">No users found.</li>
          )}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-neutral-100 p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-neutral-900 ">
              Edit UID
            </h2>
            <input
              type="text"
              className="px-4 py-2 rounded-md focus:outline-none text-neutral-800 mb-4 focus:ring-2 focus:ring-sky-600 w-full bg-white shadow"
              placeholder="Enter UID"
              value={newUid}
              onChange={(e) => setNewUid(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-4 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
