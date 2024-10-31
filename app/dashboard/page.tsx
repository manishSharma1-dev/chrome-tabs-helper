"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()
  return (
    <div>
        <button onClick={() => router.push("/")} >move to home</button>
      this route will handle dashboard part
    </div>
  )
}
