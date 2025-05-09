<template>
  <div class="ctr">
    <transition name="fade" mode="in-out">
      <div>
        <div class="questions-ctr">
          <Progress
            :questionAnswered="questionAnswered"
            :max="questions.length"
          />
          <Question
            :question="questions[questionAnswered].q"
            v-if="stillHasMoreAnswers"
          >
            <Answers
              :answers="questions[questionAnswered].answers"
              @answered="handleAnswered"
            />
          </Question>
        </div>
        <Result v-show="!stillHasMoreAnswers" :result="results[resultIndex]" />
      </div>
    </transition>

    <button
      v-if="!stillHasMoreAnswers"
      type="button"
      class="reset-btn"
      @click="handleResest"
    >
      Reset
    </button>
  </div>
</template>

<script>
import Result from './Result.vue';
import Answers from './Answers.vue';
import Progress from './Progress.vue';
import Question from './Question.vue';

import questions from './questions.ts';

export default {
  components: {
    Result,
    Progress,
    Answers,
    Question,
  },
  data() {
    return {
      questions,
      questionAnswered: 0,
      point: 0,

      results: [
        {
          min: 0,
          max: 2,
          title: 'Try again!',
          desc: 'Do a little more studying and you may succeed!',
        },
        {
          min: 3,
          max: 3,
          title: "Wow, you're a genius!",
          desc: 'Studying has definitely paid off for you!',
        },
      ],
    };
  },
  computed: {
    stillHasMoreAnswers() {
      return this.questionAnswered < this.questions.length;
    },
    resultIndex() {
      let index = 0;

      this.results.forEach((result, idx) => {
        if (result.min <= this.point && result.max >= this.point) {
          index = idx;
        }
      });

      return index;
    },
  },
  methods: {
    handleAnswered(isTrue) {
      if (isTrue) {
        this.point += 1;
      }

      if (this.stillHasMoreAnswers) {
        this.questionAnswered += 1;
      }
    },
    handleResest() {
      this.questionAnswered = 0;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-size: 20px;
  font-family: sans-serif;
  padding-top: 20px;
  background: #e6ecf1;
}

.ctr {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}
.questions-ctr {
  position: relative;
  width: 100%;
}
.question {
  width: 100%;
  padding: 20px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  background-color: #00ca8c;
  color: #fff;
  box-sizing: border-box;
}
.single-question {
  position: relative;
  width: 100%;
}
.answer {
  border: 1px solid #8e959f;
  padding: 20px;
  font-size: 18px;
  width: 100%;
  background-color: #fff;
  transition: 0.2s linear all;
}
.answer span {
  display: inline-block;
  margin-left: 5px;
  font-size: 0.75em;
  font-style: italic;
}
.progress {
  height: 50px;
  margin-top: 10px;
  background-color: #ddd;
  position: relative;
}
.bar {
  height: 50px;
  background-color: #ff6372;
  transition: all 0.3s linear;
}
.status {
  position: absolute;
  top: 15px;
  left: 0;
  text-align: center;
  color: #fff;
  width: 100%;
}
.answer:not(.is-answered) {
  cursor: pointer;
}
.answer:not(.is-answered):hover {
  background-color: #8ce200;
  border-color: #8ce200;
  color: #fff;
}

.title {
  width: 100%;
  padding: 20px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  background-color: #12cbc4;
  color: #fff;
  box-sizing: border-box;
}
.desc {
  border: 1px solid #8e959f;
  padding: 20px;
  font-size: 18px;
  width: 100%;
  background-color: #fff;
  transition: 0.4s linear all;
  text-align: center;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s linear;
}
.fade-leave-active {
  transition: all 0.3s linear;
  opacity: 0;
  position: absolute;
}
.fade-leave-to {
  opacity: 0;
}

.reset-btn {
  background-color: #ff6372;
  border: 0;
  font-size: 22px;
  color: #fff;
  padding: 10px 25px;
  margin: 10px auto;
  display: block;
}

.result {
  width: 100%;
}

.reset-btn:active,
.reset-btn:focus,
.reset-btn:hover {
  border: 0;
  outline: 0;
}
</style>
