/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Properties.jsx
import React, { useEffect, useState } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "../../content/ThemeContext";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { propertyService } from "../../../services/propertyService";

const Properties = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        // Fetch only featured properties, limit 100
        const data = await propertyService.fetchProperties({ featured: "true", limit: "100" });
        // Accept both boolean and string 'true' for isFeatured
        const filtered = Array.isArray(data)
          ? data.filter(
              (p) =>
                p.isFeatured === true ||
                (typeof p.isFeatured === "string" && p.isFeatured.trim().toLowerCase() === "true")
            )
          : [];
        setProperties(filtered);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setProperties([]);
      }
    }
    fetchProperties();
  }, []);

  function NextArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          // Responsive styles using media queries in JS
          ...responsiveStyles({
            mobile: {
              marginTop: "2.4rem",
              right: "1rem",
            },
            tablet: {
              marginTop: "6.2rem",
              right: "2.2rem",
            },
            laptop: {
              marginTop: "-8.4rem",
              right: "1.9rem",
            },
            desktop: {
              marginTop: "6rem",
              right: "3.1rem",
            },
          }),
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          // Responsive styles using media queries in JS
          ...responsiveStyles({
            mobile: {
              marginTop: "2.4rem",
              left: "18.1rem",
            },
            tablet: {
              marginTop: "6.2rem",
              left: "42.4rem",
            },
            laptop: {
              marginTop: "-8.4rem",
              left: "47.9rem",
            },
            desktop: {
              marginTop: "6rem",
              left: "62.2rem",
            },
          }),
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  // Helper function for responsive styles
  type Breakpoints = {
    mobile: Record<string, any>;
    tablet: Record<string, any>;
    laptop: Record<string, any>;
    desktop: Record<string, any>;
  };
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
      className={`overflow-hidden lg:pt-0 ${
        isDarkMode ? "bg-black" : "bg-blue-50"
      }`}
    >
      <div
        className="overflow-hidden "
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-2 text-center">
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
            className="py-8 lg:px-0 overflow-hidden"
          >
            {Array.isArray(properties) && properties.length > 0 ? (
              properties.map((property, index) => (
                <div
                  key={property.propertyName || property.projectName || property._id || index}
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
                    className={`lg:h-80 md:h-80 h-40 lg:w-full md:w-full w-[8.7rem] flex flex-col justify-center items-center px-0 py-0 overflow-hidden lg:rounded-4xl rounded-3xl transition-all duration-500 transform ${
                      index === activeIndex ? "scale-95 z-10" : "scale-90 "
                    } ${
                      index === activeIndex
                        ? "rotate-0 border-5 border-blue-500"
                        : "rotate-[-5deg] border-5 border-white"
                    }`}
                  >
                    <Link
                      href={`/properties/${
                        property.slug
                          ? encodeURIComponent(property.slug)
                          : encodeURIComponent(
                              (property.propertyName || property.projectName || "property")
                                .replace(/\s+/g, "-")
                                .replace(/&/g, "and")
                                .replace(/[^a-zA-Z0-9-]/g, "")
                                .toLowerCase()
                            )
                      }`}
                      className="w-full h-full hover:scale-110 transition-all duration-500 transform"
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={Array.isArray(property.images) ? (property.images[0]?.url || property.images[0] || "/images/dehradun.avif") : "/images/dehradun.avif"}
                        alt={property.propertyName || property.projectName || "Property"}
                      />
                      <div className="absolute inset-0 bg-black opacity-20 hover:opacity-0 rounded-lg"></div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full py-8 text-gray-500">No properties found.</div>
            )}
          </Slider>
          {/* <div className="w-[4.4rem] h-[1.8rem] bg-white relative rounded-full bottom-[9.02rem] left-[57.2rem]"></div> */}
          {/* <div className="w-[4.5rem] h-[1.9rem] bg-white relative rounded-full lg:bottom-[7rem] md:bottom-[6.8rem] bottom-[5.5rem] lg:left-[62rem] md:left-[42rem] left-[17.8rem]"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Properties;
