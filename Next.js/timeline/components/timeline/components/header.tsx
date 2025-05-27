import { Search } from "lucide-react";
import { useState } from "react";

export function Header({ title }: { title: string }) {
    const [searchVisible, setSearchVisible] = useState(false);

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
                className={`NotificationsFrame__searchInput ${searchVisible && "NotificationsFrame__searchInput--active"}`}
                placeholder="Search"
            />
            <Search
                onClick={() => setSearchVisible(!searchVisible)}
                className="NotificationsFrame__searchIcon"
            />
        </div>
    )
}