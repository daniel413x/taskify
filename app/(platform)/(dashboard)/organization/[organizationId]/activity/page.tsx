import { Metadata } from 'next';
import ActivityPageContent from './_components/ActivityPageContent';

export const metadata: Metadata = {
  title: 'Activity',
};

const ActivityPage = async () => (
  <ActivityPageContent />
);

export default ActivityPage;
