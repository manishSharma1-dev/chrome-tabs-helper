"use client"
import React,{ useState} from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FlowerIcon } from "lucide-react";
import { useForm,FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { searchSchema } from "@/Schema/searchSchema";
import { NextResponse } from "next/server";
import Link from "next/link";

export default function page(){
    const [isLoading,setIsloading] = useState(false)
    const [fetcheddata,setfetcheddata] = useState([])

    const form = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues : {
            tag : ""
        }
    })

    async function onSubmit(values: z.infer<typeof searchSchema>) {

        try {
            setIsloading(true)
    
            const response =  await fetch('http://localhost:3000/api/searchtabbytags',{
                method : 'POST',
                headers : { 
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(values)
            })
    
            if(!response.ok){
                setIsloading(false)
                return NextResponse.json(
                    {
                        success : false,
                        message : "response isn't valid"
                    },
                    {
                        status : 400
                    }
                )
            }
    
            const data = await response.json()
    
            if(!data){
                setIsloading(false)
                return NextResponse.json(
                    {
                        success : false,
                        message : "data isn't in json format"
                    },
                    {
                        status : 400
                    }
                )
            }
    
            setIsloading(false)
    
            setfetcheddata(data?.tabData)
            
        } catch (error) {
            return NextResponse.json(
                {
                    success : false,
                    message : "faied to search it",
                    error
                },
                {
                    status : 500   
                }
            )
        }
    }

    function makeparaShort(text : string,minlen : number){

        if(minlen >= text.length){
            return text
        }

        return text.slice(0,minlen)+"..."
    }

    return (
        <div className='mr-12 ml-12 mt-10 mb-2 w-full'>
            <h1 className="font-semibold font-sans pt-4 text-2xl">Search using keywords.</h1>
            <p className="text-sm opacity-60 pt-2">Enter tags you used to save the tag.</p>

            <div className="mt-8 flex justify-center items-center">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex justify-center gap-4  items-center">

                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <input placeholder="Enter tags" {...field} className='border-b shadow rounded text-xs pt-2 pb-2 pl-2 pr-2 focus:outline-none min-w-[15rem]' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                
          <button type="submit" className='text-xs pl-3 pr-3 pt-2 pb-2 bg-black text-white rounded shadow shadow-slate-400'>
            {
              isLoading === true ? <FlowerIcon size={12} className='text-white animate-spin' /> : "Submit"
            }
          </button>

                </form>
            </FormProvider>

            </div>

            {/* this for showing the result  */}

            {isLoading == true ? 
            (
            <div className='flex justify-center items-center'> 
                <FlowerIcon  size={20} className='animate-spin'/>
            </div>
            ) : 
            (
            <>
                { 
                    Array.isArray(fetcheddata) && fetcheddata.map((datafield : any, id) => (
                        
                    <div className='mt-8 gap-4 flex flex-col items-center'>

                        <div className='grid grid-cols-5 gap-10 font-semibold  opacity-85 text-sm'>
                        <p className='columns-2xl'>title</p>
                        <p className='columns-2xl'>keywords</p>
                        <p className='columns-2xl'>descriptions</p>
                        <p className='columns-2xl'>link</p>
                        <p className='columns-2xl'>created At</p> 
                        </div>

                        <div className='grid grid-cols-5 p-1 gap-10 border-b border-black text-xs opacity-70' key={id}>
                            <p className='columns-2xl'>{makeparaShort(datafield?.title,12)}</p>
                            <p className='columns-2xl'>{datafield?.keyword}</p>
                            <p className='columns-2xl'>{makeparaShort(datafield?.description,40)}</p>
                            <p><Link href={datafield?.link} className='columns-2xl text-blue-500'>{makeparaShort(datafield?.link,20)}</Link></p>
                            <p className='columns-2xl'>{datafield?.created_at}</p>
                        </div>
                    
                    </div>

                    )) 
                }
            </>
            )
            }
        </div>
    )
}