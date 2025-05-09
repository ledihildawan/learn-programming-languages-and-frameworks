<template>
  <div class="answers">
    <transition-group name="fade">
      <div
        class="answer"
        v-for="(answer, idx) in answers"
        :key="`answer-${idx}-${idx + 1}`"
        @click="checkAnswer(idx)"
      >
        {{ answer.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Answers',
  props: ['answers'],
  emits: ['answered'],
  methods: {
    checkAnswer(idx) {
      this.$emit('answered', this.answers[idx].is_correct);
    },
  },
};
</script>
