import { Store } from "@tanstack/store";

export const recentStore = new Store([]);

export const updateRecent = (note) => {
  recentStore.setState((notes) =>
    [note, ...notes.filter((_note) => _note.id !== note.id)].slice(0, 9),
  );
};
