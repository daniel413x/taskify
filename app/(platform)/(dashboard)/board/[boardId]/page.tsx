import { SELECT_ORGANIZATION_ROUTE } from '@/lib/data/routes';
import prismadb from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ListContainer from './_components/ListContainer';

interface BoardIdPageProps {
  params: {
    boardId: string;
  }
}

const BoardIdPage = async ({
  params,
}: BoardIdPageProps) => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect(`${SELECT_ORGANIZATION_ROUTE}`);
  }
  const lists = await prismadb.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });
  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={params.boardId} lists={lists} />
    </div>
  );
};
export default BoardIdPage;
