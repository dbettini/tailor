<template>
  <div class="te-html">
    <div v-if="!isFocused && !content">
      <div class="well text-placeholder">
        <div class="message">
          <span class="heading">Text placeholder</span>
          <span>Click to edit</span>
        </div>
      </div>
    </div>
    <div v-else>
      <jodit
        v-if="isFocused"
        v-model="content"
        :id="id"
        :config="config"
      />
      <div
        v-else
        v-html="content"
        class="editor"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import get from 'lodash/get';

import 'jodit/build/jodit.min.css';
import Jodit from 'jodit-vue';

export default {
  name: 'te-jodit',
  props: {
    element: { type: Object, required: true },
    isFocused: { type: Boolean, default: false },
    id: { type: String, default: 'editor' }
  },
  data() {
    return {
      content: get(this.element, 'data.content', ''),
      config: { autofocus: true }
    };
  },
  computed: {
    hasChanges() {
      const previousValue = get(this.element, 'data.content', '');
      return previousValue !== this.content;
    }
  },
  methods: {
    save() {
      if (!this.hasChanges) return;
      this.$emit('save', { content: this.content });
    }
  },
  watch: {
    isFocused(val, oldVal) {
      if (oldVal && !val) this.save();
    },
    content: debounce(function () {
      this.save();
    }, 2000)
  },
  components: { Jodit }
};
</script>

<style lang="scss" scoped>
.text-placeholder {
  .message {
    padding: 9px;

    .heading {
      font-size: 24px;
    }

    span {
      display: block;
      font-size: 18px;
    }
  }
}

.well {
  margin-bottom: 0;
}
</style>

<style lang="scss">
.te-html {
  .editor {
    min-height: 117px;

    img {
      vertical-align: initial;
    }
  }
}
</style>
