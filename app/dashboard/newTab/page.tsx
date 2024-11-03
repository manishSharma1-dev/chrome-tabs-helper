"use client"

import React, { useState } from 'react'
import { Asterisk } from 'lucide-react'
import { newTabSchema } from '@/Schema/newTabSchema'
import { useForm,FormProvider } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"

export default function page() {

    const [isLoading,setIsloading] = useState(false)

    const form = useForm<z.infer<typeof newTabSchema>>({
        resolver: zodResolver(newTabSchema),
        defaultValues : {
        title : "", 
        keyword : "",
        description : "",
        link : "",
        created_At : ""
        }
    })

    function onSubmit(values: z.infer<typeof newTabSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className='mr-2 ml-12 mt-10 mb-2 w-full'>
     <h1 className='text-2xl font-sans pt-4 font-semibold'>Add New tabs.</h1>
     <p className='text-xs opacity-50'>
       Follow the above direction to add tab.
     </p>

     <div className='mt-7'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-sm'>Title :</p>
                  <div className='text-xs opacity-50 flex gap items-center'>
                    <Asterisk size={12} className='text-red-600' />
                    <p className='italic'>Add title for distinguishing tabs without seeing description.</p>
                  </div>
                </div>
                <FormControl>
                  <input placeholder="shadcn" {...field} className='border-b text-sm p-1 w-auto focus:outline-none min-w-[15rem]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 

          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-sm'>Add tags :</p>
                  <div className='text-xs opacity-50 flex gap items-center'>
                    <Asterisk size={12} className='text-red-600' />
                    <p className='italic'>Add tags to differnetiate easily.</p>
                  </div>
                </div>
                <FormControl>
                <input placeholder="shadcn" {...field} className='border-b text-sm p-1 w-auto focus:outline-none min-w-[15rem]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-sm'>Description</p>
                  <div className='text-xs opacity-50 flex gap items-center'>
                    <p className='italic'>Write Description to get a better understanding for the reason you saved the tab for (optional)</p>.
                  </div>
                </div>
                <FormControl>
                <textarea placeholder="shadcn" rows={4} {...field} className='border-2 border-black rounded text-sm px-2 py-1 min-w-[30rem] focus:outline-none border-opacity-35' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-sm'>link :</p>
                  <div className='text-xs opacity-50 flex gap items-center'>
                    <Asterisk size={12} className='text-red-600' />
                    <p className='italic'>Link of the resource.</p>
                  </div>
                </div>
                <FormControl>
                <input placeholder="shadcn" {...field} className='border-b text-sm p-1 w-auto focus:outline-none min-w-[15rem]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 

          <button type="submit" className='text-xs px-3 py-1 min-w-[5rem] bg-black text-white rounded'>
            {
              isLoading === true ? <Loader2 size={12} className='text-white w-[5rem] animate-spin' /> : "Submit"
              
            }
          </button>
        </form>
      </FormProvider>
     </div>
   </div>
    )
}