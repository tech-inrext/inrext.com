import React from "react";
import Image from "next/image";
import { FaImages, FaBed, FaBath, FaUtensils, FaArrowRight } from "react-icons/fa";
type ChildPropertyCardProps = {
  child: any;
  cardImages: string[];
  isDarkMode: boolean;
  onViewMore: () => void;
};

const ChildPropertyCard: React.FC<ChildPropertyCardProps> = ({
  child,
  cardImages,
  isDarkMode,
  onViewMore,
}) => (
 <div
  className={`rounded-xl shadow-lg border flex flex-row transition-colors duration-300 overflow-hidden w-full max-w-3xl ${
    isDarkMode
      ? "bg-black border-white text-white"
      : "bg-white border-blue-200 text-black"
  }`}
  style={{ minHeight: "120px" }}
>
  <div className="w-40 h-40 relative">
    <Image
      src={cardImages[0]}
      alt={child.projectName || child.propertyName || "Child Property"}
      width={100}
      height={60}
      className="object-cover w-full h-full"
      style={{ objectFit: "cover" }}
    />

    {cardImages.length > 1 && (
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
        <FaImages size={14} />
        {cardImages.length}
      </div>
    )}
  </div>

  <div className="flex flex-col justify-between p-2">
    <div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-2xl">
          {child.propertyName || child.projectName || "Child Property"}
        </span>
        <span className="text-lg capitalize font-extrabold">
          {child.propertyType || "-"}
        </span>
      </div>

      <div className="flex flex-row gap-4 mt-2">
        <span className="text-lg font-extralight">
          <b>Price:</b>{" "}
          {child.price && child.sizeUnit
            ? `${child.price} / ${child.sizeUnit}`
            : child.price || "-"}
        </span>

        <span className="text-lg font-extralight">
          <b>Size:</b>{" "}
          {child.size ||
            (child.minSize
              ? `${child.minSize}${
                  child.sizeUnit ? ` ${child.sizeUnit}` : ""
                }`
              : "-")}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-base mb-3">
        {child.roomType && (
          <span className="flex items-center gap-1">
            <FaBed size={18} />
            {child.roomType}
          </span>
        )}

        {child.bathroomType && (
          <span className="flex items-center gap-1">
            <FaBath size={18} />
            {child.bathroomType}
          </span>
        )}

        {child.kitchenType && (
          <span className="flex items-center gap-1">
            <FaUtensils size={18} />
            {child.kitchenType}
          </span>
        )}
      </div>
    </div>

    <div className="mt-2">
      <button
        className="text-blue-600 font-semibold flex items-center hover:underline text-md"
        onClick={onViewMore}
      >
        View More Details
        <FaArrowRight className="ml-2" size={16} />
      </button>
    </div>
  </div>
</div>
);

export default ChildPropertyCard;
