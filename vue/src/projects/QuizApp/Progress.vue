<template>
  <div class="progress">
    <div class="bar" :style="barStyle"></div>
    <div class="status">
      {{ questionAnswered }} out of {{ max }} questions answered
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: ['questionAnswered', 'max'],
  computed: {
    barStyle() {
      return {
        width: (this.questionAnswered / this.max) * 100 + '%',
      };
    },
  },
};
</script>
