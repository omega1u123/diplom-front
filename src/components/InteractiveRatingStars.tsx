import { useState } from "react";
import { halfStarIcon, starIcon } from "@/assets";

interface InteractiveRatingStarsProps {
  setValue: (value: number) => void;
}

export const InteractiveRatingStars = ({
  setValue,
}: InteractiveRatingStarsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleMouseEnter = (index: number, isLeftHalf: boolean) => {
    const rating = index + (isLeftHalf ? 0.5 : 1);
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = () => {
    if (hoverRating !== null) {
      setSelectedRating(hoverRating);
      setValue(hoverRating);
    }
  };

  const getCurrentRating = () => {
    return hoverRating ?? selectedRating;
  };

  const renderStarForIndex = (index: number) => {
    const currentRating = getCurrentRating();

    const isFull = currentRating >= index + 1;
    const isHalf = !isFull && currentRating >= index + 0.5;

    return (
      <>
        {/* Empty background */}
        <img
          src={starIcon}
          alt="Empty"
          className="absolute w-6 h-6 inset-0 opacity-30 grayscale"
        />

        {/* Conditional overlay */}
        {isFull && (
          <img
            src={starIcon}
            alt="Full"
            className="absolute w-6 h-6 inset-0 object-contain z-10"
          />
        )}
        {isHalf && (
          <img
            src={halfStarIcon}
            alt="Half"
            className="absolute w-6 h-6 inset-0 object-contain z-10"
          />
        )}
      </>
    );
  };

  return (
    <div
      className="inline-block relative"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center relative cursor-pointer">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="relative w-6 h-6 mx-0.5">
            {/* Left Half */}
            <div
              className="absolute left-0 top-0 w-1/2 h-full z-20"
              onMouseEnter={() => handleMouseEnter(index, true)}
            >
              {/* Tooltip for left half */}
              {hoverRating === index + 0.5 && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none transition-opacity opacity-100">
                  {(index + 0.5).toFixed(1)}
                </div>
              )}
            </div>

            {/* Right Half */}
            <div
              className="absolute right-0 top-0 w-1/2 h-full z-20"
              onMouseEnter={() => handleMouseEnter(index, false)}
            >
              {/* Tooltip for right half */}
              {hoverRating === index + 1 && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none transition-opacity opacity-100">
                  {(index + 1).toFixed(1)}
                </div>
              )}
            </div>

            {/* Star visuals */}
            <div className="relative w-6 h-6">{renderStarForIndex(index)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
