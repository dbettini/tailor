<template>
  <div class="feedback">
    <span class="heading">
      Feedback
      <span
        @click="isExpanded = !isExpanded"
        class="btn btn-link btn-xs">
        {{ isExpanded ? 'hide' : 'show' }}
      </span>
    </span>
    <transition name="fade">
      <ul v-if="isExpanded">
        <feedback-item
          v-for="(answer, index) in processedAnswers"
          v-bind="{ index, answer, isEditing, feedback: feedback[index] }"
          :key="index"
          @update="({ html }) => $emit('update', { [index]: html })">
        </feedback-item>
      </ul>
    </transition>
  </div>
</template>

<script>
import FeedbackItem from './FeedbackItem';
import isArray from 'lodash/isArray';

export default {
  name: 'feedback',
  props: {
    answers: { type: [Array, Boolean], default: null },
    feedback: { type: Object, default: () => ({}) },
    isEditing: { type: Boolean, default: false }
  },
  data() {
    return {
      isExpanded: this.isEditing
    };
  },
  computed: {
    processedAnswers() {
      return isArray(this.answers) ? this.answers : ['True', 'False'];
    }
  },
  watch: {
    isEditing(val) {
      if (val) this.isExpanded = true;
    }
  },
  components: { FeedbackItem }
};
</script>

<style lang="scss" scoped>
.feedback {
  padding: 30px 20px 15px;
  text-align: left;
}

.heading {
  font-size: 20px;

  .btn {
    margin-left: 15px;
    padding: 3px 10px;
  }
}

ul {
  margin-top: 20px;
  list-style: none;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}

.fade-leave, .fade-leave-active, .fade-leave-to {
  display: none;
}
</style>
