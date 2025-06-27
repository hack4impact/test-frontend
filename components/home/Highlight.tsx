'use client'

import { Button } from "../ui/button";

export default function Highlight() {

  return (
    <div className="w-full h-svh flex flex-row gap-x-30">
      <div className="w-1/2 h-full flex items-center pb-30">

        <div className="w-full h-fit max-h-[500px]">
          <h1 className="text-[50px] leading-none">
            We are
          </h1>
          <div>
            <h1 className="text-[75px] font-bold text-[#0085FF] leading-none ">
              Designers
            </h1>
          </div>
          <h1 className="text-[60px] font-bold leading-none mb-5">
            for social change
          </h1>
          <h2 className="text-[35px]/10 mb-10">
            Building powerful nonprofit software as a tool for social good
          </h2>
          <Button className="w-2/5 min-w-[250px] h-[50px] text-2xl font-medium text-[#FFF] bg-[#0085FF] hover:scale-105 rounded-sm">
            Work with us
          </Button>
        </div>

      </div>
      <div className="w-1/2 h-full flex items-center pb-30">
        <div className="border-3 border-[#0085FF] rounded-sm w-full h-[500px]">
        </div>
      </div>
    </div>
  )
};
