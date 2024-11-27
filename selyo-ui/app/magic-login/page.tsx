"use client"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { API_URL } from "@/constants/constants";

export default function MagicLogin() {
  const searchParams = useSearchParams()
  const router = useRouter();

  const code = searchParams.get('code')
  const email = searchParams.get('email')

  const claimCode = async () => {
    const httpResponse = await fetch(
      `${API_URL}/user/magic-login/claim`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        })
      }
    )
    const response: { session: string; } = await httpResponse.json();
    if (response.session && email) {
      localStorage.setItem('selyo:session', response.session);
      localStorage.setItem('selyo:email', email);
    }
  }

  useEffect(() => {
    try {
      claimCode()
      router.push(`/${email}`)
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div></div>
  )
}