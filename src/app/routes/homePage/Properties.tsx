// Type for responsive breakpoints
type Breakpoints = {
  mobile: React.CSSProperties;
  tablet: React.CSSProperties;
  laptop: React.CSSProperties;
  desktop: React.CSSProperties;
};
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Properties.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "../../content/ThemeContext";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import type { Property } from "../../../services/propertyService";
import { propertyService } from "../../../services/propertyService";
import Image from "next/image";

const Properties = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [properties, setProperties] = useState<Property[]>([]);

  // Fetch all properties from backend
  useEffect(() => {
    propertyService
      .fetchProperties({ featured: "false", limit: "100" })
      .then((res) => setProperties(res))
      .catch(() => setProperties([]));
  }, []);

  // Utility: Normalize images
  const normalizeImages = (imgs: any[] = []): string[] =>
    Array.isArray(imgs) && imgs.length > 0
      ? imgs
          .map((img) => (typeof img === "string" ? img : img?.url))
          .filter((img): img is string => Boolean(img))
      : [];

  // const properties = [
  //   { id: 1, url: "/about", img: "/images/delhi.jpg" },
  //   { id: 2, url: "/contact", img: "/images/noida.jpg" },
  //   { id: 3, url: "/about", img: "/images/Nainital.jpg" },
  //   { id: 4, url: "/about", img: "/images/Gnoida.jpg" },
  //   { id: 5, url: "/about", img: "/images/dehradun.avif" },
  //   { id: 6, url: "/about", img: "/images/dholeraprime.jpg" },
  // ];

  function NextArrow(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          ...responsiveStyles({
            mobile: {
              marginTop: "2.4rem",
              right: "1rem"
            },
            tablet: {
              marginTop: "6.2rem",
              right: "2.2rem"
            },
            laptop: {
              marginTop: "-8.4rem",
              right: "1.9rem"
            },
            desktop: {
              marginTop: "6rem",
              right: "3.1rem"
            }
          }),
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          ...responsiveStyles({
            mobile: {
              marginTop: "2.4rem",
              left: "18.1rem"
            },
            tablet: {
              marginTop: "6.2rem",
              left: "42.4rem"
            },
            laptop: {
              marginTop: "-8.4rem",
              left: "47.9rem"
            },
            desktop: {
              marginTop: "6rem",
              left: "62.2rem"
            }
          }),
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  // Helper function for responsive styles
  function responsiveStyles(breakpoints: Breakpoints) {
    if (typeof window === "undefined") return breakpoints.desktop;
    const windowWidth = window.innerWidth;
    if (windowWidth < 768) {
      return breakpoints.mobile;
    } else if (windowWidth >= 768 && windowWidth < 1024) {
      return breakpoints.tablet;
    } else if (windowWidth >= 1024 && windowWidth < 1280) {
      return breakpoints.laptop;
    } else {
      return breakpoints.desktop;
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Keep this true for all breakpoints
    centerPadding: "0px",
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setActiveIndex(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true, // Keep center mode
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerMode: true, // Keep center mode
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          centerMode: true, // Keep center mode
          centerPadding: "0px", // Adjust if needed
        },
      },
    ],
  };

  useEffect(() => {
    AOS.init({
      //   duration: 1000, // Animation duration (default: 400)
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div
      className={`overflow-hidden  lg:pt-[0rem] ${
        isDarkMode ? "bg-black" : "bg-blue-50"
      }`}
    >
      <div
        className="overflow-hidden "
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <div className="max-w-7xl mx-auto px-6 pt-[3rem] pb-[0.6rem] text-center">
          <h1 className="dm-serif-display text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
            Properties <br />
            <span
              className={`cormorant-garamond ${
                isDarkMode ? "text-white" : "text-blue-500"
              }`}
            >
              To Fall In Love With
            </span>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto lg:px-6  pt-2 pb-6">
          <Slider
            {...settings}
            className="py-[2rem] lg:px-[0rem] overflow-hidden"
          >
            {properties.map((property, index) => {
              const images = normalizeImages(property.images);
              const slug = property.slug || property.propertyName?.replace(/\s+/g, "-").replace(/-project$/i, "").toLowerCase() || "";
              return (
                <div
                  key={property._id || property.propertyName || property.projectName}
                  className="px-0 transition-all duration-500"
                  style={{
                    zIndex:
                      index === activeIndex
                        ? 30
                        : index === activeIndex - 1 || index === activeIndex + 1
                        ? 20
                        : 10,
                  }}
                >
                  <div
                    className={`lg:h-[20rem] md:h-[20rem] h-[10rem] lg:w-full md:w-full w-[8.7rem] flex flex-col justify-center items-center px-0 py-0 overflow-hidden lg:rounded-4xl rounded-3xl transition-all duration-500 transform ${
                      index === activeIndex
                        ? "scale-95 z-10"
                        : "scale-90"
                    } ${
                      index === activeIndex
                        ? "rotate-0 border-5 border-blue-500"
                        : "rotate-[-5deg] border-5 border-white"
                    }`}
                  >
                    <Link
                      href={`/properties/${encodeURIComponent(slug)}`}
                      className="w-full h-full hover:scale-110 transition-all duration-500 transform"
                    >
                      <Image
                        className="w-full h-full object-cover"
                        src={images[0] || "/images/no-image-available.png"}
                        alt={property.propertyName || property.projectName || "Property"}
                        width={600}
                        height={400}
                        priority={index === activeIndex}
                      />
                      <div className="absolute inset-0 bg-black opacity-20 hover:opacity-0 rounded-lg"></div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Slider>
          {/* <div className="w-[4.4rem] h-[1.8rem] bg-white relative rounded-full bottom-[9.02rem] left-[57.2rem]"></div> */}
          {/* <div className="w-[4.5rem] h-[1.9rem] bg-white relative rounded-full lg:bottom-[7rem] md:bottom-[6.8rem] bottom-[5.5rem] lg:left-[62rem] md:left-[42rem] left-[17.8rem]"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Properties;
