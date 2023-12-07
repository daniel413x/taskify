import { Children } from '@/lib/types';
import { DraggableProvided } from '@hello-pangea/dnd';
import { ForwardedRef, forwardRef } from 'react';

interface ListWrapperProps {
  children: Children;
  provided?: DraggableProvided;
}

const ListWrapper = forwardRef(({
  children,
  provided,
}: ListWrapperProps, ref: ForwardedRef<any>) => (
  <li ref={ref} className="shrink-0 h-full w-[272px] select-none" {...provided?.draggableProps}>
    <div className="w-full rounded-md bg-[#f1f2f4] shadow-md" {...provided?.dragHandleProps}>
      {children}
    </div>
  </li>
));

export default ListWrapper;
