import { Dispatch, FC, SetStateAction, useState } from 'react';
import { StarFilledIcon } from '@radix-ui/react-icons';

interface StarRatingProps {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}
// src/components/StarRating.tsx

const StarRating: FC<StarRatingProps> = ({ rating, setRating }) => {
  const maxRating = 5;
  const minRating = 1;
  const filledStars = Array.from(Array(rating).keys());
  const emptyStars = Array.from(Array(maxRating - rating).keys());
  const setRatingAndClose = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className="grid grid-flow-col gap-sm justify-start">
      {filledStars.map((_, i) => (
        <button
          key={i}
          onClick={() => setRatingAndClose(i + minRating)}
          type="button"
        >
          <StarFilledIcon className={`h-5 w-5 text-yellow-500`} />
        </button>
      ))}
      {emptyStars.map((_, i) => (
        <button
          key={i}
          onClick={() => setRatingAndClose(rating + i + minRating)}
          type="button"
        >
          <StarFilledIcon className={`h-5 w-5 $ text-neutral-500`} />
        </button>
      ))}
    </div>
  );
};
export default StarRating;
