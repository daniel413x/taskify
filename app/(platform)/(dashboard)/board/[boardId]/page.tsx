interface BoardIdPageProps {
  boardId: string;
}

const BoardIdPage = ({
  boardId,
}: BoardIdPageProps) => (
  <div>
    {boardId}
  </div>
);
export default BoardIdPage;
