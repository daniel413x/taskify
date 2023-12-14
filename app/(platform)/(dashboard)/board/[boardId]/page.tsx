import { SELECT_ORGANIZATION_ROUTE } from '@/lib/data/routes';
import prismadb from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import BoardPageContent from './_components/BoardPageContent';

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
    <BoardPageContent
      lists={lists}
      params={params}
    />
  );
};

export default BoardIdPage;
