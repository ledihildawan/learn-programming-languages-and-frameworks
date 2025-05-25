import { ActivityItem } from "./activity-item";

export function Content({ activities }: { activities: Activity[] }) {
    return (
        <div className="NotificationsFrame__content">
            <div className="NotificationsFrame__line"></div>
            {activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
        </div>
    );
}