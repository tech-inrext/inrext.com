"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../content/ThemeContext";

type CounterProps = {
  value: number;
  label: string;
  isDarkMode: boolean;
};

const CounterBox = React.memo(({ value, label, isDarkMode }: CounterProps) => (
  <p
    className={`border rounded-xl lg:py-8 py-4 flex flex-col justify-center items-center transition-all duration-300 ${
      isDarkMode ? "text-white border-gray-700" : "text-[#5c727d] border-gray-300"
    }`}
  >
    <span className="open-sans text-blue-500 font-bold lg:text-[1.3rem] text-[1.2rem]">
      {value}+
    </span>
    {label}
  </p>
));

const AboutHero = () => {
  const { isDarkMode } = useTheme();

  const statsRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [hasAnimated, setHasAnimated] = useState(false);

  const [counters, setCounters] = useState({
    yearsExp: 0,
    happyCustomers: 0,
    guides: 0,
  });

  // 🎯 Target values
  const targetCounters = {
    yearsExp: 12,
    happyCustomers: 1000,
    guides: 22,
  };

  // 🎬 Animation Function
  const animateCounters = useCallback(() => {
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCounters({
        yearsExp: Math.floor(progress * targetCounters.yearsExp),
        happyCustomers: Math.floor(progress * targetCounters.happyCustomers),
        guides: Math.floor(progress * targetCounters.guides),
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCounters(targetCounters);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // 👀 Intersection Observer
  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          setTimeout(() => {
            animateCounters();
          }, 200);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(statsRef.current);

    return () => {
      observer.disconnect();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateCounters, hasAnimated]);

  // 🔁 Fallback (production safe)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        animateCounters();
        setHasAnimated(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [animateCounters, hasAnimated]);

  return (
    <div
      className={`lg:h-screen h-full overflow-hidden flex justify-center items-center relative ${
        isDarkMode ? "bg-black" : "bg-blue-50"
      }`}
    >
      <div
        ref={statsRef}
        className={`overflow-hidden ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 max-w-7xl mx-auto lg:px-6 px-5 py-8 md:mt-20 mt-18 gap-14">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col lg:px-10 justify-center rounded-4xl bg-zinc-900 gap-y-8 lg:pt-12 lg:pb-8">

            <h1 className="dm-serif-display text-blue-500 font-normal lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
              Real Estate, <br /> Reimagined <br /> For You.
            </h1>

            <p
              className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-5 leading-[1.1rem] ${
                isDarkMode ? "text-white" : "text-gray-200"
              }`}
            >
              Inrext is where real estate meets vision. Driven by leaders with
              10–12+ years of industry expertise, we go beyond transactions to
              craft opportunities turning properties into powerful investments.
              <br />
              From residential retreats to commercial hubs, hospitality spaces
              to retail landmarks including office spaces, shops, kiosks, and
              restaurants Inrext empowers you with insights, trust, and tailored
              solutions.
              <br />
              At Inrext, we don’t just consult. We transform the way of
              investing.
            </p>

            <Link
              href="/"
              className="montserrat w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold transition"
            >
              EXPLORE OUR JOURNEY
            </Link>

            {/* COUNTERS */}
            <div className="grid grid-cols-3 gap-x-5 text-center">
              <CounterBox
                value={counters.yearsExp}
                label="Years Experience"
                isDarkMode={isDarkMode}
              />

              <CounterBox
                value={counters.happyCustomers}
                label="Happy Customers"
                isDarkMode={isDarkMode}
              />

              <CounterBox
                value={counters.guides}
                label="Professional Guides"
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:h-full h-[35vh]">
            <Image
              className="w-full rounded-4xl h-full object-cover"
              src="/images/about.webp"
              alt="About Us"
              width={800}
              height={400}
              priority
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutHero;