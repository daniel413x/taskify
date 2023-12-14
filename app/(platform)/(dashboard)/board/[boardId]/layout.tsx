import { SELECT_ORGANIZATION_ROUTE } from '@/lib/data/routes';
import prismadb from '@/lib/db';
import { Children } from '@/lib/types';
import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import { startCase } from 'lodash';
import BoardNavbar from './_components/BoardNavbar';

interface MetadataProps {
  params: { boardId: string };
}

export const generateMetadata = async ({
  params,
}: MetadataProps) => {
  const { orgId, orgSlug } = auth();
  if (!orgId) {
    return {
      title: 'Board',
    };
  }
  const board = await prismadb.board.findUnique({
    where: {
      id: params.boardId,
    },
  });
  return {
    title: board?.title ? `${board?.title} / ${startCase(orgSlug || 'organization')}` : 'Board',
  };
};

interface BoardIdLayoutProps {
  children: Children;
  params: { boardId: string };
}

const BoardIdLayout = async ({
  children,
  params,
}: BoardIdLayoutProps) => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect(`/${SELECT_ORGANIZATION_ROUTE}`);
  }
  const board = await prismadb.board.findUnique({
    where: {
      id: params.boardId,
    },
  });
  if (!board) {
    notFound();
  }
  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative p-28 h-full">
        {children}
      </main>
    </div>
  );
};

export default BoardIdLayout;
