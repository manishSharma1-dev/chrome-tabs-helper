"use client"

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <main>
      <div className="flex flex-col gap-3 mt-4">
        <h1 className="text-4xl text-center pt-2">Chrome-tabs-helper</h1>
        <div className="flex justify-center items-center mt-2">
          <p   className="py-1">Why should you use it?</p>
        </div>

        <div className="mt-1 flex flex-col ml-64 mr-64 justify-center items-center">
          <div className="flex flex-col gap-2">
            <p>Problem : </p>
            <ul className="flex flex-col gap-2">
              <li>when using chrome in mobile , i have many tabs open in background  - which could be of blogs , an usefull website or others , which maybe needed later - 
              </li>
              <li>too many tabs open in background</li>
              <li>Hard to remember, why you saved the tab for ?</li>
              <li>Consume a lot of space also</li>
            </ul>
          </div>
        </div>

        <div className="mt-1 flex flex-col ml-64 mr-64 ">
          <div>
            <p className="py-1">Solution : </p>
            <p className="py-1">Use it 🐱‍🏍</p>
            <button className="bg-black  shadow-lg shadow-zinc-400 text-sm text-white inline pl-3 pr-3 pt-1 rounded pb-1 my-2" onClick={() => router.push("/dashboard")}>Dashboard 🐱‍🏍</button>
          </div>
        </div>
      </div>
    </main>    
  );
}
