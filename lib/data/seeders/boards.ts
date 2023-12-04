import { Prisma } from '@prisma/client';

const boardOneId = '809446d3-e150-47f2-b1c1-abe6ecfc6795';

const seederImage = {
  imageThumbUrl:
    'https://images.unsplash.com/photo-1690369936917-0da2f88a8e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MzQ2ODR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDEyOTQzNTR8&ixlib=rb-4.0.3&q=80&w=200',
  imageUserName: 'Tobias Reich',
  imageFullUrl:
    'https://images.unsplash.com/photo-1690369936917-0da2f88a8e40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MzQ2ODR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDEyOTQzNTR8&ixlib=rb-4.0.3&q=85',
  imageLinkHTML: 'https://unsplash.com/photos/a-river-running-through-a-forest-next-to-a-mountain-ld_X8mbQf3o',
  imageId: 'ld_X8mbQf3o',
};

const boards: Prisma.BoardUpsertArgs<any>[] = [
  {
    where: {
      id: boardOneId,
    },
    update: {},
    create: {
      id: boardOneId,
      title: 'BoardOne',
      orgId: 'org_2YdOfvdPLbkbFtvD9Ya2kPWr6LC',
      ...seederImage,
      lists: {
        create: [
          {
            title: 'ListOne',
            order: 1,
            cards: {
              create: [
                {
                  title: 'CardOne',
                  order: 1,
                },
                {
                  title: 'CardTwo',
                  order: 2,
                },
              ],
            },
          },
          {
            title: 'ListTwo',
            order: 2,
            cards: {
              create: [
                {
                  title: 'CardOne',
                  order: 1,
                },
                {
                  title: 'CardTwo',
                  order: 2,
                },
              ],
            },
          },
        ],
      },
    },
  },
];

export default boards;
