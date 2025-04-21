"use client";

import { Note } from "@/types";
import { Store } from "@tanstack/store";
import { produce } from "immer";

let recentLocalStorage: Note[] = [];

if (typeof window !== "undefined") {
  recentLocalStorage = localStorage?.getItem("recent")
    ? (JSON.parse(localStorage.getItem("recent") as string) as Note[])
    : [];
}

export const recentStore = new Store<Note[]>(recentLocalStorage || []);

export const deleteRecent = () => {
  recentStore.setState(() => []);

  localStorage.removeItem("recent");
};

export const updateRecent = (note: Note) => {
  const newRecent = [
    note,
    ...recentStore.state.filter((_note) => _note.id !== note.id),
  ].slice(0, 10);

  localStorage.setItem("recent", JSON.stringify(newRecent));

  recentStore.setState(() => newRecent);
};

export const updateRecentItem = (note: Note) => {
  const noteIndex = recentStore.state.findIndex((item) => item.id === note.id);
  const newRecent = produce(recentStore.state, (draft) => {
    draft[noteIndex] = note;
  });

  recentStore.setState(() => newRecent);

  localStorage.setItem("recent", JSON.stringify(recentStore.state));
};
