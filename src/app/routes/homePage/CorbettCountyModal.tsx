"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "../../../services/api";

type PopupConfig = {
  propertyName: string;
  location: string;
  imageUrl: string;
  buttonText: string;
  isActive: boolean;
};

const DEFAULT_CONFIG: PopupConfig = {
  propertyName: "KW Delhi 6",
  location: "KW Delhi 6 Mall, Raj Nagar Extension, Ghaziabad, Uttar Pradesh",
  imageUrl: "/images/dholeraprime.jpg",
  buttonText: "GET CALL BACK",
  isActive: true,
};

const CorbettCountyModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchPopupConfig = async () => {
      try {
        const response = await api.get("/api/v0/public/landing-popup");
        // Handle both response shapes { success: true, data: { ... } } and direct response data
        if (response.data && response.data.success && response.data.data) {
          const payload = response.data.data;
          if (Array.isArray(payload)) {
            setConfig(payload.length > 0 ? payload[0] : null);
          } else {
            setConfig(payload);
          }
        } else if (response.data && typeof response.data === "object" && "propertyName" in response.data) {
          setConfig(response.data as PopupConfig);
        } else {
          setConfig(DEFAULT_CONFIG);
        }
      } catch (error) {
        console.error("Failed to fetch landing popup configuration:", error);
        setConfig(DEFAULT_CONFIG);
      } finally {
        setLoading(false);
      }
    };
    fetchPopupConfig();
  }, []);

  useEffect(() => {
    if (loading || !config || !config.isActive) return;

    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem("corbett_county_modal_shown");
    if (!shown) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, config]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("corbett_county_modal_shown", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !config) return;

    setIsSubmitting(true);
    try {
      // Construct WhatsApp URL with lead information
      const whatsappNumber = "918010178010";
      const waMessage = `Hello! I am interested in the property *${config.propertyName}*.\n\n*Name*: ${name}\n*Email*: ${email}\n*Phone*: ${phone}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

      // Open WhatsApp link in a new window/tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      setSubmitted(true);
      sessionStorage.setItem("corbett_county_modal_shown", "true");
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Error redirecting to WhatsApp:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !isOpen || !config) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row min-h-[400px]">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full border border-gray-400 bg-white text-gray-700 hover:text-black hover:border-black transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Left Side: Advertising Image */}
        <div className="relative w-full md:w-1/2 min-h-[250px] md:min-h-[450px] bg-emerald-950 flex items-center justify-center">
          <img
            src={config.imageUrl}
            alt={`${config.propertyName} Nature Awaits You`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-white text-gray-900">
          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Your request has been received. We will get back to you shortly.
              </p>
            </div>
          ) : (
            <div className="w-full">
              {/* Header */}
              <div className="text-center md:text-left mb-6">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {config.propertyName}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-1.5 mt-2 text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {config.location}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-green-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email Address Input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-green-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone/Mobile Input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-green-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="Phone/Mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wider transition-colors duration-200 disabled:opacity-75 cursor-pointer shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? "Submitting..." : config.buttonText}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CorbettCountyModal;
