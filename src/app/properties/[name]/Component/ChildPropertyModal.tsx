import React from "react";
import Image from "next/image";

type ChildPropertyModalProps = {
  show: boolean;
  onClose: () => void;
  childLoading: boolean;
  childDetails: any;
  childImages: string[];
  setChildImages: React.Dispatch<React.SetStateAction<string[]>>;
  isDarkMode: boolean;
};

const ChildPropertyModal: React.FC<ChildPropertyModalProps> = ({
  show,
  onClose,
  childLoading,
  childDetails,
  childImages,
  setChildImages,
  isDarkMode,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-center overflow-y-auto bg-black/40 backdrop-blur-md">
      
      {/* TOP ALIGN CONTAINER */}
      <div className="w-full flex justify-center pt-10 pb-10">
        
        {/* MODAL */}
        <div
          className={`relative w-[90vw] max-w-5xl rounded-2xl shadow-2xl p-8 border-2 transition-all duration-300 ${
            isDarkMode
              ? "bg-black text-white border-white"
              : "bg-white text-black border-blue-200"
          }`}
        >
          {/* CLOSE BUTTON */}
          <button
            className={`absolute top-4 right-6 text-2xl font-bold ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-400 hover:text-gray-700"
            }`}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          {childLoading ? (
            <div className="text-center py-16">Loading...</div>
          ) : childDetails ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center">
                {childDetails.projectName ||
                  childDetails.propertyName ||
                  "Property Details"}
              </h2>

              {/* IMAGE SECTION */}
              <div className="mb-8 flex flex-col items-center">
                <Image
                  src={childImages[0]}
                  alt={childDetails.projectName || "Property"}
                  width={400}
                  height={250}
                  className="rounded-xl object-cover w-full max-w-md h-[250px]"
                />

                <div className="flex gap-2 mt-3 flex-wrap justify-center">
                  {childImages.map((img: string, idx: number) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={60}
                      height={40}
                      className={`rounded-lg border-2 cursor-pointer ${
                        childImages[0] === img
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                      onClick={() =>
                        setChildImages((prev) => [
                          img,
                          ...prev.filter((i) => i !== img),
                        ])
                      }
                    />
                  ))}
                </div>
              </div>

              {/* DETAILS */}
              <div className="mb-8">
                <div className="font-semibold text-xl mb-3 border-b pb-2">
                  Room Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="font-semibold">Builder:</span>{" "}
                    {childDetails.builderName || "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Type:</span>{" "}
                    {childDetails.propertyType
                      ? childDetails.propertyType.charAt(0).toUpperCase() +
                        childDetails.propertyType.slice(1)
                      : "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Price:</span>{" "}
                    {childDetails.price || childDetails.minPrice || "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span>{" "}
                    {childDetails.location || "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Size:</span>{" "}
                    {childDetails.minSize
                      ? `${childDetails.minSize} ${
                          childDetails.sizeUnit || ""
                        }`
                      : "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {(childDetails.status || []).join(", ") || "-"}
                  </div>
                </div>
              </div>

              {/* AMENITIES */}
              <div className="mb-8">
                <div className="font-semibold text-xl mb-3 border-b pb-2">
                  Room Amenities
                </div>
                <div>
                  <span className="font-semibold">Amenities:</span>{" "}
                  {(childDetails.amenities || []).join(", ") || "-"}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <div className="font-semibold text-xl mb-3 border-b pb-2">
                  Description
                </div>
                <div className="whitespace-pre-line">
                  {childDetails.description || "-"}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-red-500">
              Failed to load property details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildPropertyModal;