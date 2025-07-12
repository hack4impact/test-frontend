import ValueCard from "@/components/valueCard";
import Image from "next/image";

function About() {
  const GoBeyondTechContent = "Technology is only one tool we use in our greater mission for social impact. Technology alone is not enough. We learn from, work with, and are inspired by others who are tackling social problems using a multitude of tools.";
  const EngYourComContent = "Our community makes us special. The strength of our community comes from the contributions of its members. We welcome new members with warmth, and we make the effort to know each other beyond superficial details.";
  const DevWCareContent = "We build with others in mind. Empathy and compassion are crucial to serving our partner organizations and members. When we embark on projects, we work to deeply understand the people who we are helping."

  return (
    <div>
      <div className="px-10 w-screen min-h-screen">
        <main className="pt-20 size-full flex flex-col min-w-[300px]">
          <div className="w-full h-svh flex flex-col">
            <h1 className="text-[48px] font-bold pt-10">
              About Us
            </h1>
            <div className="flex flex-row gap-10 justify-between pt-10">
                <Image src="/blank.png" alt="INSERT PIC" width={650} height={500} className="border-3 border-[#0085FF] rounded-sm" />
                <Image src="/blank.png" alt="INSERT PIC" width={650} height={500} className="border-3 border-[#0085FF] rounded-sm" />
            </div>
            <h1 className="text-[48px] pt-10 font-bold">
              Our Mission
            </h1>
            <div className="flex flex-row gap-10 justify-between pt-10">
                <p className="h-3/5 text-[20px]">To empower engineers, designers, activists, and humanitarians to create lasting and impactful social change, fostering the wider adoption of software as a tool for social good.</p>
            </div>
            <h1 className="text-[48px] pt-10 font-bold">
              Our Values
            </h1>
            <div className="w-full flex flex-row gap-6 pt-10">
              <ValueCard bg="bg-[#F2594B]" color="text-[#FFF]" title="Go Beyond Technology" content={GoBeyondTechContent} footer={""}/>
              <ValueCard bg="bg-[#0085FF]" color="text-[#FFF]" title="Engage Your Community" content={EngYourComContent} footer={""}/>
              <ValueCard bg="bg-[#10B875]" color="text-[#FFF]" title="Develop With Care" content={DevWCareContent} footer={""}/>
            </div>
            <h1 className="text-[48px] pt-10 font-bold">
              National Team
            </h1>
        
            <div className="w-full flex flex-wrap pt-10 justify-center gap-6">
              {/* later replace with a looping code for members */}
              {[...Array(6)].map((_, index) => (
                <div key={`dummy${index + 1}`} id={`dummy${index + 1}`} className="basis-[calc(25%-1.5rem)]">
                  <Image
                    src="/blank.png"
                    alt="INSERT PIC"
                    width={315}
                    height={250}
                    className="border-3 border-[#0085FF] rounded-sm"
                  />
                </div>
            ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default About;