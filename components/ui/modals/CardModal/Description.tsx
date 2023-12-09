'use client';

import { useQueryClient } from '@tanstack/react-query';
import { CardWithList } from '@/lib/types';
import { AlignLeft } from 'lucide-react';
import useInlineEditing from '@/lib/hooks/useInlineEditing';
import { useParams } from 'next/navigation';
import useAction from '@/lib/hooks/useAction';
import updateCard from '@/actions/cards/update';
import { toast } from 'sonner';
import { Skeleton } from '../../common/shadcn/skeleton';
import { Button } from '../../common/shadcn/button';
import FormTextarea from '../../common/form/FormTextarea';
import FormSubmit from '../../common/form/FormSubmit';

interface DescriptionProps {
  card: CardWithList;
}

const Description = ({
  card,
}: DescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const {
    enableEditing, disableEditing, formRef, textareaRef, isEditing,
  } = useInlineEditing();
  const {
    execute,
    fieldErrors,
  } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      });
      toast.success('Description updated!');
    },
    onError: (e) => {
      toast.error(e);
    },
  });
  const onSubmit = (formData: FormData) => {
    const desc = formData.get('desc') as string;
    const boardId = params.boardId as string;
    execute({
      boardId, desc, id: card.id,
    });
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft width={20} height={20} className="text-neutral-700 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">
          Description
        </p>
        {isEditing ? (
          <form
            className="space-y-2"
            ref={formRef}
            action={onSubmit}
          >
            <FormTextarea
              ref={textareaRef}
              id="desc"
              className="w-full mt-2"
              placeholder="Add a more detailed description..."
              defaultValue={card.desc || ''}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>
                Save
              </FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            onClick={enableEditing}
            role="button"
            variant="ghost"
            className="min-h-[78px] py-3 px-3.5 rounded-md text-sm font-medium bg-neutral-200 justify-start items-start w-full"
          >
            {card.desc || 'Add a more detailed description...'}
          </Button>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = () => (
  <div className="flex items-start gap-x-3 w-full">
    <Skeleton className="h-6 w-6 bg-neutral-200" />
    <div className="w-full">
      <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
      <Skeleton className="w-full h-[78px] bg-neutral-200" />
    </div>
  </div>
);

export default Description;
