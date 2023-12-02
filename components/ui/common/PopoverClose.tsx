import { X } from 'lucide-react';
import { Button } from './shadcn/button';

const CloseButton = () => (
  <Button
    className="absolute h-auto w-auto p-2 top-2 right-2 text-neutral-600"
    variant="ghost"
  >
    <X width={16} height={16} />
  </Button>
);

export default CloseButton;
