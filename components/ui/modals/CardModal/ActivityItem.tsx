import { AuditLog } from '@prisma/client';
import { generateLogMessage } from '@/lib/utils';
import { format } from 'date-fns';
import { Avatar, AvatarImage } from '../../common/shadcn/avatar';

interface ActivityItemProps {
  log: AuditLog;
}

const ActivityItem = ({
  log,
}: ActivityItemProps) => (
  <div className="flex items-start gap-x-2">
    <Avatar className="h-8 w-8">
      <AvatarImage src={log.userImage} />
    </Avatar>
    <div className="flex flex-col space-y-0.5">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold lowercase text-neutral-700">
          {log.userName}
          {' '}
        </span>
        {generateLogMessage(log)}
      </p>
      <p className="text-xs text-muted-foreground">
        {format(new Date(log.createdAt), 'MMM d, yyyy \'at\' h:mm a')}
      </p>
    </div>
  </div>
);

export default ActivityItem;
