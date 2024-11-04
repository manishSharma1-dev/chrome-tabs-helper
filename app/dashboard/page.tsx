"use client"

import { FlowerIcon } from 'lucide-react'
import Link from 'next/link'
import { NextResponse } from 'next/server'
import React,{ useEffect, useState } from 'react'

export default function page() {

  const [refresh,setrefresh] = useState(false)
  const [loading,setloading] = useState(true)
  const [fetcheddata,setfetcheddata] = useState([])

  useEffect(() => {
    const fetchAllTabs = async() => {
      const response = await fetch(`http://localhost:3000/api/getallTabs`)

      if(!response.ok){
        return NextResponse.json({
          success : false,
          message : "Response isn't valid"
        },{ status : 200})
      }

      const data = await response.json()

      setloading(false)
      setfetcheddata(data?.alltabofUser)

    }
    fetchAllTabs()
  },[refresh])

  function makeparaShort(text : string,minlen : number){

    if(minlen >= text.length){
      return text
    }

    return text.slice(0,minlen)+"..."
  }

  return (
   
    <div className='mr-12 ml-12 mt-2 mb-2 w-full'>
      <h1 className='text-2xl font-sans pt-4 font-semibold'>All tabs.</h1>
      <p className='text-sm opacity-50'>Manage your tabs in one place.</p>
      <div className='mt-8 gap-4 flex flex-col items-center'>

        <div className='grid grid-cols-5 gap-10 font-semibold  opacity-85 text-sm'>
          <p className='columns-2xl'>title</p>
          <p className='columns-2xl'>keywords</p>
          <p className='columns-2xl'>descriptions</p>
          <p className='columns-2xl'>link</p>
          <p className='columns-2xl'>created At</p> 
        </div>
        {/* this div below is the main div for all tabs   */}

        {loading == true ? 
        (
          <div className='flex justify-center items-center'> 
            <FlowerIcon  size={20} className='animate-spin'/>
          </div>
        ) : 
        (
          <>
            { 
            Array.isArray(fetcheddata) && fetcheddata.map((datafield : any, id) => (
                <div className='grid grid-cols-5 p-1 gap-10 border-b border-black text-xs opacity-70' key={id}>
                    <p className='columns-2xl'>{makeparaShort(datafield?.title,12)}</p>
                    <p className='columns-2xl'>{datafield?.keyword}</p>
                    <p className='columns-2xl'>{makeparaShort(datafield?.description,40)}</p>
                    <p><Link href={datafield?.link} className='columns-2xl text-blue-500'>{makeparaShort(datafield?.link,20)}</Link></p>
                    <p className='columns-2xl'>{datafield?.created_at}</p>
                </div>
            )) 
           }
          </>
        )
        }

        </div>
     </div> 
  )
}
