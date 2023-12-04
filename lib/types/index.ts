import { Card, List } from '@prisma/client';
import { ReactNode } from 'react';

export type Children = ReactNode | undefined;

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };
