import { Children } from '@/lib/types';

interface ListWrapperProps {
  children: Children;
}

const ListWrapper = ({
  children,
}: ListWrapperProps) => (
  <li className="shrink-0 h-full w-[272px] select-none">
    {children}
  </li>
);

export default ListWrapper;
