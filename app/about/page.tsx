"use client"
import ValueCard from "@/components/valueCard";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const GoBeyondTechContent =
"Technology is only one tool we use in our greater mission for social impact. Technology alone is not enough. We learn from, work with, and are inspired by others who are tackling social problems using a multitude of tools.";
const EngYourComContent = "Our community makes us special. The strength of our community comes from the contributions of its members. We welcome new members with warmth, and we make the effort to know each other beyond superficial details.";
const DevWCareContent = "We build with others in mind. Empathy and compassion are crucial to serving our partner organizations and members. When we embark on projects, we work to deeply understand the people who we are helping."

const cardData = [
  {
    title: "Go Beyond Technology",
    content: GoBeyondTechContent,
    bg: "bg-[#F2594B]",
  },
  {
    title: "Engage Your Community",
    content: EngYourComContent,
    bg: "bg-[#0085FF]",
  },
  {
    title: "Develop With Care",
    content: DevWCareContent,
    bg: "bg-[#10B875]",
  },
  {
    title: "DUMMY CARD",
    content: "Dummy Content",
    bg: "bg-[#10B875]",
  },
  {
    title: "DUMMY CARD",
    content: "Dummy Content",
    bg: "bg-[#10B875]",
  },
  {
    title: "DUMMY CARD",
    content: "Dummy Content",
    bg: "bg-[#10B875]",
  },
];

const Carousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsPerView = 3;

  const handleCardClick = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
  
    const cards = container.querySelectorAll(".carousel-card");
    const card = cards[index] as HTMLElement;
    if (!card) return;
  
    const cardWidth = card.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
  
    // calculating visible ranges:
    const visibleStart = Math.floor(scrollLeft / cardWidth);
    const visibleEnd = visibleStart + cardsPerView - 1;
  
    // allow right scrolling if the next scroll doesn't exceed max
    if (index === visibleEnd && scrollLeft + cardWidth <= maxScrollLeft + 1) {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
    // allow left scrolling if not at start
    else if (index === visibleStart && scrollLeft > 0) {
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const [visibleRange, setVisibleRange] = useState({ start: 0, end: cardsPerView - 1 });

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
  
    const cards = container.querySelectorAll(".carousel-card") as NodeListOf<HTMLElement>;
    if (!cards.length) return;
  
    const cardWidth = cards[0].offsetWidth;
    const scrollLeft = container.scrollLeft;
  
    const visibleStart = Math.floor(scrollLeft / cardWidth);
    const visibleEnd = visibleStart + cardsPerView - 1;
  
    setVisibleRange({ start: visibleStart, end: visibleEnd });
  };
  
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const getCursorStyle = (index: number) => {
    if (index === visibleRange.end) {
      return { cursor: 'url("/ArrowRight.png"), auto' };
    } else if (index === visibleRange.start && index != 0) {
      return { cursor: 'url("/ArrowLeft.png"), auto' };
    } else {
      return {};
    }
  };

  return (
    <div className="w-full overflow-hidden h-full">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
      >
        {cardData.map((card, index) => {
          return (
            <div
              key={`card-${index}`}
              onClick={() => handleCardClick(index)}
              className={`carousel-card snap-start shrink-0 w-[32%] p-5`}
              style={getCursorStyle(index)}
            >
              <div className="p-2 w-[1300px]">
                <ValueCard
                  bg={card.bg}
                  color="text-[#FFF]"
                  title={card.title}
                  content={card.content}
                  footer=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function About() {
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
            <div>
              <Carousel/>
              </div>
            <h1 className="text-[48px] pt-10 font-bold">
              National Team
            </h1>
        
            <div className="w-full flex flex-wrap pt-10 justify-center gap-6 pb-10">
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