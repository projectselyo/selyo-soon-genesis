import { useState, useEffect } from "react";
import { API_URL } from "@/constants/constants";

interface Metadata {
  name: string;
  symbol: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

interface Item {
  id: string;
  collectionKey: string;
  metadata: Metadata;
}

interface User {
  email: string;
  name: string;
  publicKey: string;
  uid: string;
}

interface Socials {
  [key: string]: any; // Define specific fields if structure is known
}

interface UserData {
  user: User;
  items: Item[];
  socials: Socials;
}

export function useUserData(uid: string) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/user/${uid}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
          setError("User not found");
          setUserData(null);
        } else {
          setUserData({
            user: data.user,
            items: data.items || [],
            socials: data.socials || {},
          });
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An error occurred while fetching user data");
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  return { userData, error, isLoading };
}
