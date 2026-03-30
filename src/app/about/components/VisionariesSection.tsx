"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "../../content/ThemeContext";
import { fetchPillarsByCategory } from "../../../services/pillarService";
import { FaTelegram } from "react-icons/fa";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function getImageSrc(member: any) {
  if (Array.isArray(member?.profileImages) && member.profileImages.length > 0) {
    const img = member.profileImages[0];

    if (typeof img === "object" && img.url) return img.url;
    if (typeof img === "string") return img;
  }

  if (member?.image) return member.image;

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    member?.name || "User"
  )}`;
}

const VisionariesSection = () => {
  const { isDarkMode } = useTheme();
  const [visionaries, setVisionaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadVisionaries = async () => {
      try {
        const res = await fetchPillarsByCategory("the-visionaries");

        let members: any[] = [];

        // Normalize API response
        if (Array.isArray(res)) members = res;
        else if (Array.isArray(res?.data)) members = res.data;
        else if (Array.isArray(res?.data?.data)) members = res.data.data;

        // ✅ Only Featured Members
        const featuredMembers = members.filter(
          (member) => member?.isFeatured === true
        );

        // ✅ Remove duplicates
        const normalize = (str: string) =>
          (str || "").trim().toLowerCase();

        const uniqueMembers = featuredMembers.filter(
          (v, i, a) =>
            a.findIndex(
              (x) =>
                normalize(x.name) === normalize(v.name) &&
                normalize(x.category) === normalize(v.category)
            ) === i
        );

        if (isMounted) setVisionaries(uniqueMembers);
      } catch (err) {
        console.error("Failed to fetch visionaries:", err);
        if (isMounted) setVisionaries([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadVisionaries();

    return () => {
      isMounted = false;
    };
  }, []);

  const settings = {
    dots: false,
    infinite: visionaries.length > 1,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: visionaries.length > 1,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return null;
  if (!visionaries.length) return null;

  return (
    <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 pt-[5rem] pb-[3rem] flex flex-col justify-center items-center">
        <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] capitalize">
          The
          <span
            className={`cormorant-garamond ps-3 pe-3 ${
              isDarkMode ? "text-white" : "text-blue-500"
            }`}
          >
            Visionaries
          </span>
        </h1>
      </div>

      {/* Desktop Grid */}
      <div className="max-w-7xl mx-auto lg:px-0 mb-[0rem] hidden lg:block">
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-2 gap-4">
            {visionaries.map((member) => (
              <div key={member._id} className="px-[0.6rem]">
                <Link href={`/team/${encodeURIComponent(member.name)}`}>
                  <div
                    className={`h-full flex flex-col justify-center items-center px-5 rounded-xl cursor-pointer ${
                      isDarkMode
                        ? "border border-gray-500/30"
                        : "border-2 border-blue-500"
                    }`}
                  >
                    <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                      <Image
                        className="w-full h-full object-contain bg-white rounded-xl"
                        src={getImageSrc(member)}
                        alt={member.name}
                        width={240}
                        height={192}
                        priority
                      />
                    </div>

                    <div className="flex flex-col py-5 w-full text-center items-center">
                      <h1 className="text-blue-500 font-semibold uppercase text-[1rem]">
                        {member.name}
                      </h1>

                      <p
                        className={`capitalize text-[0.9rem] ${
                          isDarkMode ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {member.position || member.designation}
                      </p>

                      <button
                        className="mt-5 w-full flex justify-between items-center text-white px-4 py-2 rounded-full bg-blue-500"
                        tabIndex={-1}
                      >
                        Say Hello 👋
                        <FaTelegram className="text-[1.5rem]" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Slider */}
      <div className="lg:hidden max-w-6xl mx-auto overflow-x-auto">
        <Slider
          {...settings}
          className="overflow-hidden pb-[0rem] lg:h-[26rem] h-[26rem]"
        >
          {visionaries.map((member) => (
            <div key={member._id} className="px-[0.6rem]">
              <Link href={`/team/${encodeURIComponent(member.name)}`}>
                <div className="h-full flex flex-col justify-center items-center px-12 mx-5 rounded-xl border-2 border-blue-500">
                  <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                    <Image
                      className="w-full h-full object-contain bg-white rounded-xl"
                      src={getImageSrc(member)}
                      alt={member.name}
                      width={240}
                      height={192}
                      priority
                    />
                  </div>

                  <div className="flex flex-col py-5 w-full text-center items-center">
                    <h1 className="text-blue-500 font-semibold uppercase text-[1rem]">
                      {member.name}
                    </h1>

                    <p
                      className={`capitalize text-[0.9rem] ${
                        isDarkMode ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {member.position || member.designation}
                    </p>

                    <button
                      className="mt-5 w-full flex justify-between items-center text-white px-4 py-2 rounded-full bg-blue-500"
                      tabIndex={-1}
                    >
                      Say Hello 👋
                      <FaTelegram className="text-[1.5rem]" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default VisionariesSection;