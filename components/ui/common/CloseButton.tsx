import { X } from 'lucide-react';
import { ForwardedRef, forwardRef } from 'react';
import { Button } from './shadcn/button';

const CloseButton = forwardRef(({
  // include props spread or popover button won't get props
  ...props
}, ref: ForwardedRef<HTMLButtonElement>) => (
  <Button
    className="absolute h-auto w-auto p-2 top-2 right-2 text-neutral-600"
    variant="ghost"
    ref={ref}
    {...props}
  >
    <X width={16} height={16} />
  </Button>
));

export default CloseButton;
