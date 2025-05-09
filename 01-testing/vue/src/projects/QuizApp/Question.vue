<template>
  <div class="single-question">
    <div class="question">{{ question }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['question'],
};
</script>
