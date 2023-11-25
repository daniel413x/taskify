import prismadb from '@/lib/db';
import Board from './_components/Board';
import Form from './_components/Form';

const OrganizationIdPage = async () => {
  const boards = await prismadb.board.findMany();
  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y-2">
        {boards.map((b) => (
          <Board
            id={b.id}
            title={b.title}
            key={b.id}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
