<template>
  <label :for="id">{{ label }}</label>
  <input type="text" :value="value" @input="handleInput" />
</template>

<script lang="ts">
export default {
  props: ['id', 'label', 'value'],
  methods: {
    handleInput(event: Event) {
      this.$emit('input', (event.target as HTMLInputElement).value);
    },
  },
};
</script>

<style scoped>
/*  */
</style>
