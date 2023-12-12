import ActivityItem from '@/components/ui/common/ActivityItem';
import { Skeleton } from '@/components/ui/common/shadcn/skeleton';
import { SELECT_ORGANIZATION_ROUTE } from '@/lib/data/routes';
import prismadb from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const ActivityList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    redirect(`/${SELECT_ORGANIZATION_ROUTE}`);
  }
  const auditLogs = await prismadb.auditLog.findMany({
    where: {
      // orgId is all that's needed as the organization's activity page concerns all entities under that organization
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization
      </p>
      {auditLogs.map((l) => (
        <li key={l.id}>
          <ActivityItem log={l} />
        </li>
      ))}
    </ol>
  );
};

ActivityList.Skeleton = () => (
  <ol className="space-y-4 mt-4">
    <Skeleton className="w-[80%] h-14" />
    <Skeleton className="w-[50%] h-14" />
    <Skeleton className="w-[70%] h-14" />
    <Skeleton className="w-[80%] h-14" />
    <Skeleton className="w-[75%] h-14" />
  </ol>
);

export default ActivityList;
