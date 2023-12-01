'use client';

import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/common/shadcn/tooltip';
import useHasMounted from '@/lib/hooks/useHasMounted';
import { Children } from '@/lib/types';

interface HintProps {
  children: Children;
  desc: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  sideOffset?: number;
}

const Hint = ({
  children,
  desc,
  side = 'bottom',
  sideOffset = 0,
}: HintProps) => {
  if (!useHasMounted()) {
    return;
  }
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className="text-xs max-w-[220px] break-words whitespace-normal"
        >
          {desc}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
