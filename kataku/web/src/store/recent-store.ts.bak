import { Note } from "@/types";
import { Store } from "@tanstack/store";
import { produce } from "immer";

export const recentStore = new Store<Note[]>([]);

export const updateRecent = (note: Note) => {
  recentStore.setState((notes) => {
    return [note, ...notes.filter((_note) => _note.id !== note.id)].slice(
      0,
      10,
    );
  });
};

export const updateRecentItem = (note: Note) => {
  const noteIndex = recentStore.state.findIndex((item) => item.id === note.id);
  const newRecent = produce(recentStore.state, (draft) => {
    draft[noteIndex] = note;
  });

  console.log(newRecent);

  recentStore.setState(() => newRecent);
};
