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
  font-size: 14px;
  text-align: left;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: normal;
  font-family: Helvetica, sans-serif;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 20px 0;
    font-weight: 400;
    text-transform: none;
  }

  a {
    color: #1e87f0;
    text-decoration: none;
    cursor: pointer;
    touch-action: manipulation;
  }

  address,
  dl,
  fieldset,
  figure,
  ol,
  p,
  pre,
  ul {
    margin: 0 0 20px 0;
  }

  * + blockquote,
  * + address,
  * + dl,
  * + fieldset,
  * + figure,
  * + ol,
  * + p,
  * + pre,
  * + ul {
    margin-top: 20px;
  }

  ol,
  ul {
    padding-left: 30px;
  }

  blockquote {
    margin-top: 20px;
    margin: 0 0 20px 0;
    font-style: italic;
    border-left: 2px solid #222;
    padding: 0;
    padding-left: 5px;
    color: #222;
  }

  mark {
    padding: 0;
    background: #ffd;
  }

  pre {
    tab-size: 4;
    overflow: auto;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background-color: #f0f0f0;
  }

  table {
    border: none;
    border-collapse: collapse;
    table-layout: fixed;
    empty-cells: show;
    max-width: 100%;

    tr td,
    tr th {
      border: 1px solid #ddd;
      text-align: left;
      vertical-align: middle;
    }
  }

  .editor {
    min-height: 117px;

    img {
      vertical-align: initial;
    }
  }
}
</style>
