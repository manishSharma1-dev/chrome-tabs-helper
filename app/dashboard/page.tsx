"use client"
import React from 'react'

export default function page() {

  const handleuserdetail = async() => {
    const response = await fetch(`http://localhost:3000/api/getallTabs`)

    if(!response){
      console.log("failed to get the response")
    }

    const data = await response.json()

    if(!data){
      console.log("data not found")
    }

    console.log("data found",data)
  }


  return (
    <div className='mr-2 ml-12 mt-2 mb-2 w-full'>
      <h1 className='text-2xl font-sans pt-4 font-semibold'>All tabs.</h1>
      <p className='text-sm opacity-50'>Manage your tabs in one place.</p>
      <div className='mt-6 '>
        <div className='flex gap-28 opacity-70 text-sm'>
          <p>title</p>
          <p>keywords</p>
          <p>descriptions</p>
          <p>link</p>
          <p>image</p>
          <p>created At</p>
        </div>
        {/* this div below is the main div for all tabs  */}
        <div className='flex text-sm gap-10 flex-nowrap opacity-80'>
          <p>Message queue</p>
          <p>blog-dev</p>
          <p>i saved this blog for learning about message queue.</p>
          <p>http:www.google.com</p>
          <p>image link</p>
          <p>monday 20-20-2023</p>
        </div>
      </div>
      <button onClick={handleuserdetail}>fetch user detail</button>
    </div>
  )
}