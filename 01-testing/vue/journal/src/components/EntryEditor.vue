<script lang="ts" setup>
import type { ComputedRef, Ref } from 'vue'

import type Emoji from "@/types/Emoji";
import type Entry from '@/types/Entry';

import { computed, ref } from "vue";

import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

const maxChars: number = 280;

const body: Ref<string> = ref<string>("");
const emoji: Ref<Emoji | null> = ref<Emoji | null>(null);
const chartCount: ComputedRef<number> = computed<number>((): number => body.value.length);

defineEmits<{
  (e: "@create", entry: Entry): void;
}>();

function handleTextInput(event: Event): void {
  const textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;

  if (textarea.value.length <= maxChars) {
    body.value = textarea.value;
  } else {
    body.value = textarea.value = textarea.value.substring(0, maxChars);
  }
}

function handleSubmit(): void {
  $emit('@create', {
    id: Math.random(),
    body: body.value,
    emoji: emoji.value,
    userId: 1,
    createdAt: new Date(),
  });

  body.value = "";
  body.emoji = null;
}
</script>

<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea v-model="body" placeholder="New Journal Entry for danielkelly_io" @keyup="handleTextInput"></textarea>

    <EmojiField v-model="emoji" />

    <div class="entry-form-footer">
      <span>{{ chartCount }} / {{ maxChars }}</span>
      <button>Remember
        <ArrowCircleRight width="20" />
      </button>
    </div>
  </form>
</template>
