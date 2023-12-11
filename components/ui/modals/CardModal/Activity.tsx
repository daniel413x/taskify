import { ActivityIcon } from 'lucide-react';
import { AuditLog } from '@prisma/client';
import { Skeleton } from '../../common/shadcn/skeleton';
import ActivityItem from './ActivityItem';

interface ActivityProps {
  logs: AuditLog[];
}

const Activity = ({
  logs,
}: ActivityProps) => (
  <div className="flex flex-col gap-x-3 w-full">
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="mt-0.5 text-neutral-700" width={20} height={20} />
      <p className="font-semibold text-neutral-700 mb-2">
        Activity
      </p>
    </div>
    <ol className="mt-2 space-y-4">
      {logs.map((l) => (
        <li key={l.id}>
          <ActivityItem
            log={l}
          />
        </li>
      ))}
    </ol>
  </div>
);

Activity.Skeleton = () => (
  <div className="flex items-start gap-x-3 w-full">
    <Skeleton className="h-6 w-6 bg-neutral-200" />
    <div className="w-full">
      <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
      <Skeleton className="h-10 w-full bg-neutral-200" />
    </div>
  </div>
);

export default Activity;
