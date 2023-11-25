import deleteBoard from '@/actions/boards/delete';
import FormDelete from './FormDelete';

interface BoardProps {
  title: string;
  id: string;
}

const Board = async ({
  title,
  id,
}: BoardProps) => {
  const deleteBoardAction = deleteBoard.bind(null, id);
  return (
    <form key={id} action={deleteBoardAction}>
      <p>
        Board title:
        {' '}
        {title}
      </p>
      <FormDelete />
    </form>
  );
};

export default Board;
