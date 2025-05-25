"use client";

import { Content } from "./components/content";
import { Header } from "./components/header";
import { activities } from "./data";
import "./styles/index.scss";

export function Timeline() {
    return (
        <div className="NotificationFrame">
            <Header title="Timeline" />
            <Content activities={activities} /> 
        </div>
    );
}