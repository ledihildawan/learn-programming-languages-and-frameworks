import { Search } from "lucide-react";

export function Header({ title }: { title: string }) {
    return (
        <div className="NotificationsFrame__header">
            <div className="NotificationsFrame__menuIcon">
                <div className="NotificationsFrame__dashTop"></div>
                <div className="NotificationsFrame__dashBottom"></div>
                <div className="NotificationsFrame__circle"></div>
            </div>
            <span className="NotificationsFrame__title">
                {title}
            </span>
            <input
                type="text"
                className="NotificationsFrame__searchInput"
                placeholder="Search"
            />
            <Search className="NotificationsFrame__searchIcon" />
        </div>
    )
}