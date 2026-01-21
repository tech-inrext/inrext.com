"use client";
import React from "react";
import { useTheme } from "../../content/ThemeContext";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

import {
  MdPhoneInTalk,
  MdOutlineEmail,
  MdOutlineLocationOn,
} from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={` ${
        isDarkMode ? "bg-blue-500 backdrop-blur-md" : "bg-blue-50"
      }`}
    >
      <div className="lg:mt-[0rem] w-full md:mt-[0rem] mt-[0rem] lg:px-0 px-5 ">
        <div
          className={`lg:mx-16 lg:mt-[0rem] md:mt-[0rem] mt-[0rem] py-5  ${
            isDarkMode ? "border-b border-blue-500" : "border-b border-blue-500"
          }`}
        >
          <Image
            className="w-[10rem]"
            src={
              isDarkMode
                ? "/images/inrext-white-logo.png"
                : "/images/inrext-blue-logo.png"
            }
            alt=""
            width={200}
            height={50}
          />
          <div className="grid grid-cols-1 gap-5 pt-2 lg:grid-cols-4 md:grid-cols-3">
            <div>
              <div
                className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8ren] leading-[1.25rem] py-3 lg:w-full md:w-[16rem] w-full ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <p>
                  Inrext is where real estate meets vision. Driven by leaders
                  with 10–12+ years of industry expertise, we go beyond
                  transactions to craft opportunities turning properties into
                  powerful investments. From residential retreats to commercial
                  hubs, hospitality spaces to retail landmarks including office
                  spaces, shops, kiosks, and restaurants Inrext empowers you
                  with insights, trust, and tailored solutions. At Inrext, we
                  don’t just consult. We transforming the way of investing
                </p>
              </div>
              <ul className="flex items-center gap-2 my-4 md:mt-0">
                <li className="flex items-center">
                  <span className="p-[0.50rem] rounded-full bg-white hover:bg-blue-400 text-blue-500 hover:text-white">
                    <Link
                      href="https://www.facebook.com/inrext"
                      target="_blank"
                    >
                      <FaFacebookF />
                    </Link>
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="p-[0.50rem] rounded-full bg-white hover:bg-blue-400 text-blue-500 hover:text-white">
                    <Link
                      href="https://twitter.com/Inrextpvtltd"
                      target="_blank"
                    >
                      <FaTwitter />
                    </Link>
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="p-[0.50rem] rounded-full bg-white hover:bg-blue-400 text-blue-500 hover:text-white">
                    <Link
                      href="https://www.linkedin.com/company/86704198"
                      target="_blank"
                    >
                      <FaLinkedinIn />
                    </Link>
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="p-[0.50rem] rounded-full bg-white hover:bg-blue-400 text-blue-500 hover:text-white">
                    <Link
                      href="https://www.instagram.com/inrext"
                      target="_blank"
                    >
                      <FaInstagram />
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start lg:items-center md:items-center ">
              <h1
                className={`md:text-[1.20rem] text-[1.35rem] font-medium  ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Quick Link
              </h1>
              <ul
                className={`py-3 lg:text-[0.9rem] md:text-[0.9rem] text-[0.8ren] leading-[1.5rem] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-1 transition-transform duration-500 ease-in-out transform cursor-pointer hover:translate-x-5"
                  >
                    <span>
                      <IoIosArrowForward className="text-blue-500" />
                    </span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex items-center gap-1 transition-transform duration-500 ease-in-out transform cursor-pointer hover:translate-x-5"
                  >
                    <span>
                      <IoIosArrowForward className="text-blue-500" />
                    </span>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties"
                    className="flex items-center gap-1 transition-transform duration-500 ease-in-out transform cursor-pointer hover:translate-x-5"
                  >
                    <span>
                      <IoIosArrowForward className="text-blue-500" />
                    </span>
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="flex items-center gap-1 transition-transform duration-500 ease-in-out transform cursor-pointer hover:translate-x-5"
                  >
                    <span>
                      <IoIosArrowForward className="text-blue-500" />
                    </span>
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/achievements"
                    className="flex items-center gap-1 transition-transform duration-500 ease-in-out transform cursor-pointer hover:translate-x-5"
                  >
                    <span>
                      <IoIosArrowForward className="text-blue-500" />
                    </span>
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link
                    href="/journey"
                    className="flex items-center gap-1 transition-transform duration-500 ease-in-out transform cursor-pointer hover:translate-x-5"
                  >
                    <span>
                      <IoIosArrowForward className="text-blue-500" />
                    </span>
                    Journey
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className="flex items-center gap-1 transition-transform duration-500 ease-in-out transform cursor-pointer hover:translate-x-5"
                  >
                    <span>
                      <IoIosArrowForward className="text-blue-500" />
                    </span>
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start ">
              <h1
                className={`md:text-[1.20rem] text-[1.35rem] font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Address
              </h1>
              <ul
                className={`py-3 lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] leading-[1.5rem] space-y-4 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <li className="flex items-center gap-2">
                  <span className="text-[1.2rem]">
                    <MdOutlineLocationOn className="text-white text-4xl" />
                  </span>
                  3rd Floor, D-4, D Block, Sector-10,
                  <br />
                  Noida, Uttar Pradesh, 201301
                </li>
                <li className="flex items-center gap-2 ">
                  <span className="text-[1.2rem]">
                    <MdOutlineLocationOn className="text-white text-4xl" />
                  </span>
                  4th floor, Pandey Plaza, Exhibition Rd,
                  <br />
                  Ali Nagar Colony, Salimpur Ahra, Golambar,
                  <br />
                  Patna, Bihar 800001
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[1.2rem]">
                    <MdOutlineLocationOn className="text-white text-4xl" />
                  </span>
                  312, Felix Sq Rd, Golf City,
                  <br />
                  Lucknow, Muzaffar Nagar Ghusval,
                  <br />
                  Uttar Pradesh 226030
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start ">
              <h1
                className={`md:text-[1.20rem] text-[1.65rem] font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Contact
              </h1>
              <ul
  className={`py-3 lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] leading-[1.5rem] space-y-4 ${
    isDarkMode ? "text-white" : "text-black"
  }`}
>
  {/* Phone */}
  <li className="flex items-center gap-x-2">
    <MdPhoneInTalk className="text-white text-[1.2rem]" />
    <a
      href="tel:+918010178010"
      className="hover:text-blue-500 transition-colors"
    >
      +91 8010178010
    </a>
  </li>

  {/* Email */}
  <li className="flex items-center gap-x-2">
    <MdOutlineEmail className="text-white text-[1.2rem]" />
    <a
      href="mailto:info@inrext.com"
      className="hover:text-blue-500 transition-colors"
    >
      info@inrext.com
    </a>
  </li>
</ul>

            </div>
          </div>
        </div>
        <div
          className={`flex flex-wrap md:justify-between justify-center bg-blue-500 py-5 lg:px-16 ${
            isDarkMode
              ? "bg-black backdrop-blur-md text-white"
              : "bg-blue-50 text-black"
          }`}
        >
          <h1 className="lg:text-[0.9rem] md:text-[0.9rem] text-[0.8ren] leading-[1.5rem]">
            Copyright <span className="">inrext.com.</span> All Rights Reserved.
          </h1>
          <ul className="flex gap-5 lg:text-[0.9rem] md:text-[0.9rem] text-[0.8ren] leading-[1.5rem]">
            <ul className="flex gap-4">
              <li>
                <Link
                  href="/Terms-conditions"
                  className="cursor-pointer hover:underline"
                >
                  Terms of Use
                </Link>
              </li>

              <li>
                <Link
                  href="/Privacy-policy"
                  className="cursor-pointer hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;