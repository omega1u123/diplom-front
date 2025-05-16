import { halfStarIcon, starIcon } from "@/assets";

interface RatingStarsProps {
  rating: number;
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
  const clampedRating = Math.max(0, Math.min(5, rating));

  const roundedRating = Math.round(clampedRating * 2) / 2;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = roundedRating - i;

    if (diff >= 1) return "full";
    if (diff === 0.5) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center space-x-1">
      {stars.map((star, index) => (
        <span key={index}>
          {star === "full" && <img src={starIcon} alt="Full Star" />}
          {star === "half" && <img src={halfStarIcon} alt="Half Star" />}
          {star === "empty" && (
            <img
              src={starIcon}
              alt="Empty Star"
              className="opacity-30 grayscale"
            />
          )}
        </span>
      ))}
    </div>
  );
};
