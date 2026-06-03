"use client";

import React, { useEffect, useState } from "react";
import api from "../../../services/api";

type PopupConfig = {
  imageUrl: string;
  buttonText: string;
  isActive: boolean;
};

const DEFAULT_CONFIG: PopupConfig = {
  imageUrl: "/images/corbett_county_ad.png",
  buttonText: "Start My Property Search",
  isActive: true,
};

const CorbettCountyModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<PopupConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchPopupConfig = async () => {
      try {
        const response = await api.get("/api/v0/public/landing-popup");
        console.log(response);
        if (response.data && response.data.success && response.data.data) {
          const payload = response.data.data;
          if (Array.isArray(payload)) {
            setConfig(payload.length > 0 ? payload[0] : null);
          } else {
            setConfig(payload);
          }
        } else if (response.data && typeof response.data === "object" && "imageUrl" in response.data) {
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

    const shown = sessionStorage.getItem("corbett_county_modal_shown");
    if (!shown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [loading, config]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("corbett_county_modal_shown", "true");
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !config) return;

    setIsSubmitting(true);
    try {
      const propertyTypesStr = selectedTypes.length > 0 ? selectedTypes.join(", ") : "Any";
      const whatsappNumber = "918010178010";
      const waMessage = `Hello! I am looking for *${propertyTypesStr}* properties.\n\n*Name*: ${name}\n*Email*: ${email}\n*Phone*: ${phone}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

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
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row min-h-[550px] md:min-h-[600px]">
        
        {/* Left Side: Advertising blue banner */}
        <div className="w-full md:w-[55%] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-950 p-6 md:p-8 flex flex-col justify-between text-white relative">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-6">
              Find the Right Property, Not Just Another Listing
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-medium text-blue-50">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Expert Property & Investment Consultation
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-blue-50">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Residential, Commercial & Plot Options
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-blue-50">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Trusted by Thousands of Buyers & Investors
              </li>
            </ul>
          </div>

          <div className="mt-8 space-y-4">
            {/* Dynamic Villa Image Placeholder */}
            <div className="relative w-full h-[150px] md:h-[180px] rounded-xl overflow-hidden shadow-inner border border-white/10">
              <img
                src={config.imageUrl}
                alt="Property View"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Translucent overlay tagline card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3.5 text-center text-xs text-blue-100 font-medium">
              Let our experts do the research while you focus on making the right decision.
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-center bg-white text-gray-900 relative">
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Opening WhatsApp and redirecting you to your search parameters...
              </p>
            </div>
          ) : (
            <div className="w-full">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  Tell Us What You're Looking For
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">
                  Share your requirements and receive personalized property recommendations from our real estate experts.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Multi-select Grid */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    I am interested in
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Residential */}
                    <button
                      type="button"
                      onClick={() => toggleType("Residential")}
                      className={`flex flex-col items-center justify-center py-2 px-3 border rounded-xl transition-all duration-200 ${
                        selectedTypes.includes("Residential")
                          ? "border-blue-600 bg-blue-50/50 text-blue-600 font-semibold"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-xs">Residential</span>
                    </button>

                    {/* Commercial */}
                    <button
                      type="button"
                      onClick={() => toggleType("Commercial")}
                      className={`flex flex-col items-center justify-center py-2 px-3 border rounded-xl transition-all duration-200 ${
                        selectedTypes.includes("Commercial")
                          ? "border-blue-600 bg-blue-50/50 text-blue-600 font-semibold"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-xs">Commercial</span>
                    </button>

                    {/* Plot/Land */}
                    <button
                      type="button"
                      onClick={() => toggleType("Plot/Land")}
                      className={`flex flex-col items-center justify-center py-2 px-3 border rounded-xl transition-all duration-200 ${
                        selectedTypes.includes("Plot/Land")
                          ? "border-blue-600 bg-blue-50/50 text-blue-600 font-semibold"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs">Plot/Land</span>
                    </button>

                    {/* Villas/Resorts */}
                    <button
                      type="button"
                      onClick={() => toggleType("Villas/Resorts")}
                      className={`flex flex-col items-center justify-center py-2 px-3 border rounded-xl transition-all duration-200 ${
                        selectedTypes.includes("Villas/Resorts")
                          ? "border-blue-600 bg-blue-50/50 text-blue-600 font-semibold"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V13h6v8" />
                      </svg>
                      <span className="text-xs">Villas/Resorts</span>
                    </button>
                  </div>
                </div>

                {/* Full Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-900 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Email Address Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-900 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Phone Number Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-900 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : config.buttonText}
                </button>

                {/* Trust Seal */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-xs text-gray-500 mt-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Your information remains completely confidential.
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CorbettCountyModal;
