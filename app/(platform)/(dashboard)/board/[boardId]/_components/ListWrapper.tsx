import { Children } from '@/lib/types';

interface ListWrapperProps {
  children: Children;
}

const ListWrapper = ({
  children,
}: ListWrapperProps) => (
  <li className="shrink-0 h-full w-[272px] select-none">
    <div className="w-full rounded-md bg-[#f1f2f4] shadow-md">
      {children}
    </div>
  </li>
);

export default ListWrapper;
