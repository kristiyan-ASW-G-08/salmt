import { FC, useState } from 'react';
import Button from '../Button';
import StarRating from '../StarRating';
import { useSupabase } from '@/supabase/SupabaseProvider';

interface ReviewFormProps {
  salonId: number;
  closeForm: () => void;
}
const ReviewForm: FC<ReviewFormProps> = ({ salonId, closeForm }) => {
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { session, supabase } = useSupabase();
  return (
    <form className="grid gap-md border-2 dark:border-dark-background-contrast border-light-background-contrast shadow-md rounded-md p-sm">
      <div className="grid gap-sm">
        <input
          className=" text-light-typography-contrast  placeholder-light-typography-contrast border border-light-background-contrast p-2 py-sm bg-transparent font-bold placeholder:font-bold rounded-md"
          onChange={e => setDisplayName(e.target.value)}
          placeholder="Display Name"
        />
        <textarea
          onChange={e => setContent(e.target.value)}
          className=" text-light-typography-contrast  placeholder-light-typography-contrast border border-light-background-contrast p-2 py-sm bg-transparent font-bold placeholder:font-bold rounded-md"
          placeholder="Enter your review."
        ></textarea>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <div className="grid gap-sm grid-flow-col  md:justify-self-start">
        <Button
          variant="primary"
          size="sm"
          type="button"
          className="self-center "
          onClick={async e => {
            e.preventDefault();
            const { error } = await supabase.from('comments').insert({
              user_id: session?.user?.id,
              content,
              rating,
              salon_id: salonId,
              display_name: displayName,
            });
          }}
        >
          Add
        </Button>
        <Button type="reset" variant="error" size="sm" className="self-center ">
          Reset
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
