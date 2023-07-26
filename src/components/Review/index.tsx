import { Comment } from '@/types/Comment';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { FC } from 'react';

interface ReviewProps {
  review: Comment;
}

const Review: FC<ReviewProps> = ({
  review: { content, display_name, rating, created_at },
}) => {
  const getHumanReadableDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };
  return (
    <article className="grid gap-sm dark:border-dark-background-contrast border-light-background-contrast shadow-md rounded-md p-sm">
      <h1 className="text-md font-bold">{display_name}</h1>
      <p className="text-sm text-light-typography-contrast font-semibold">
        {content}
      </p>
      <div className="grid grid-flow-col gap-sm justify-start">
        {Array.from(Array(rating).keys()).map((_, i) => (
          <StarFilledIcon
            className="h-5 w-5 text-yellow-500"
            key={`${i}-filled`}
          />
        ))}
        {Array.from(Array(5 - (rating as number)).keys()).map((_, i) => (
          <StarFilledIcon
            className="h-5 w-5 text-neutral-500"
            key={`${i}-empty`}
          />
        ))}
      </div>
      <time className="text-sm text-light-typography-contrast font-semibold">
        {getHumanReadableDate(created_at as string)}
      </time>
    </article>
  );
};

export default Review;
