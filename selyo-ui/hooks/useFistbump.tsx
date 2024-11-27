import React, { useEffect, useState } from "react"

export default function useFistbump({ uid }: { uid: string | undefined }) {
  const [code, setCode] = useState<string | null>(null)

  const fetchFistbump = async () => {
    if (!uid) return;
    const response = await fetch(
      `https://api.zelyo.quest/user/${uid}/fistbump`,
      {
        method: "POST",
      }
    )
    const data = await response.json()
    setCode(data.code)
  }

  // create a function to fetch the fistbumps nfts
  const fetchFistbumpsNfts = async (pubkey: string) => {
    const response = await fetch(
      `https://api.zelyo.quest/user/assets/${pubkey}`,
      {
        method: "GET",
      }
    )
    const data = await response.json()
    return data;
  }

  useEffect(() => {
    fetchFistbump()
  }, [uid])

  return { code, fetchFistbumpsNfts }
}
