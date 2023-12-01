'use client';

import { Button, ButtonProps } from '@/components/ui/common/shadcn/button';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import unsplash from '@/lib/unsplash';
import { cn, errorCatch } from '@/lib/utils';
import Image from 'next/image';
import unsplashPlaceholders from '@/lib/data/unsplash-placeholders';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import FormErrors from './FormErrors';

interface FormPickerProps extends ButtonProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({
  id,
  errors,
}: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });
        if (res && res.response) {
          const fetchedImages = (res.response as Record<string, any>[]);
          setImages(fetchedImages);
        }
      } catch (e: any) {
        setImages(unsplashPlaceholders);
        toast.error(errorCatch(e));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    return (
      <div>
        <Loader2 width={24} height={24} className="text-sky-700 animate-spin" />
      </div>
    );
  }
  const handleSelectImage = (imgId: string) => {
    if (pending) {
      return;
    }
    setSelectedImageId(imgId);
  };
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((i) => (
          <Button
            type="button"
            variant="ghost"
            className={cn('cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted [height:unset]', isLoading && 'opacity-50 hover:opacity-50 cursor-auto')}
            onClick={() => handleSelectImage(i.id)}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === i.id}
              disabled={pending}
              value={`${i.id}|${i.urls.thumb}|${i.urls.full}|${i.links.html}|${i.user.name}`}
            />
            <Image
              alt="Unsplash random image"
              src={i.urls.thumb}
              className="object-cover rounded-sm"
              fill
            />
            {selectedImageId === i.id ? (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="text-white" width={16} height={16} />
              </div>
            ) : null}
            <div className={cn('p-1 bg-black/50 opacity-0 absolute bottom-0 w-full text-[10px] truncate text-white', {
              'group-hover:opacity-100 focus:opacity-100 group-focus:opacity-100 focus-within:opacity-100': selectedImageId !== i.id,
            })}
            >
              <Link
                href={i.links.html}
                target="_blank"
                className="hover:underline group-focus:opacity-100"
              >
                {i.user.name}
              </Link>
            </div>
          </Button>
        ))}
      </div>
      <FormErrors
        id="image"
        errors={errors}
      />
    </div>
  );
};

export default FormPicker;
