import boards from '../lib/data/seeders/boards';
import { errorCatch } from '../lib/utils';
import prismadb from '../lib/db';

async function main() {
  await Promise.all(boards.map(async (board) => {
    await prismadb.board.upsert(board);
  }));
}
main()
  .then(async () => {
    await prismadb.$disconnect();
  })
  .catch(async (e) => {
    console.log(`${errorCatch(e)}`);
    await prismadb.$disconnect();
    process.exit(1);
  });
