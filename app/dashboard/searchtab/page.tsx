"use client"
import React,{ useState} from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Asterisk, Loader2 } from "lucide-react";
import { useForm,FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { searchSchema } from "@/Schema/searchSchema";

export default function page(){
    const [isLoading,setIsloading] = useState(false)

    const form = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
        defaultValues : {
            tag : ""
        }
    })

    function onSubmit(values: z.infer<typeof searchSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className='mr-2 ml-12 mt-10 mb-2 w-full'>
            <h1 className="font-semibold font-sans pt-4 text-2xl">Search using keywords.</h1>
            <p className="text-sm opacity-60 pt-2">Enter tags you used to save the tag.</p>

            <div className="mt-8">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex justify-center gap-4  items-center">

                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <input placeholder="shadcn" {...field} className='border-b shadow rounded text-sm px-1 py-1 w-auto focus:outline-none min-w-[15rem]' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                
          <button type="submit" className='text-xs px-3 py-2 min-w-[5rem] bg-black text-white rounded'>
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