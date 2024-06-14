<script setup lang="ts">
import type User from "./types/User";
import type Entry from "./types/Entry";

import { reactive } from "vue";

import TheHeader from "@/components/TheHeader.vue";
import EntryCard from "@/components/EntryCard.vue";
import EntryEditor from "./components/EntryEditor.vue";

const user: User = reactive({
  id: 1,
  username: "Ledi Hildawan",
  settings: [],
});

const entries = reactive([]);

function handleCreateEntry(entry: Entry): void {
  entries.push(entry);
}
</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @@create="handleCreateEntry" />
    <ul>
      <li v-for="entry in entries" :key="entry.id">
        <EntryCard :entry="entry" />
      </li>
    </ul>
  </main>
</template>
