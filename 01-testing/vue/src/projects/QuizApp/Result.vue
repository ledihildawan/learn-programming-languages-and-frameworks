<template lang="">
  <div class="result">
    <div class="title">{{ result.title }}</div>
    <div class="desc">{{ result.desc }}</div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: ['result'],
};
</script>

<style lang=""></style>
