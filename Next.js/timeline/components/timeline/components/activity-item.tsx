export function ActivityItem({ activity }: { activity: Activity }) {
    console.log(activity);
    
    return (
        <div className="NotificationsFrame__item">
            {activity.text}
            <div className="NotificationsFrame__avatar">
                <img
                    alt={activity.user.avatar}
                    src={activity.user.avatar}
                />
            </div>
            <div className="NotificationsFrame__time">
                {activity.timestamp}
            </div>
            <div className="NotificationsFrame__commentCount">
                {activity.comments.length}
            </div>
        </div>
    )
}