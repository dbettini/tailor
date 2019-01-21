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
      <ckeditor
        v-if="isFocused"
        v-model="content"
        :editor="editor"
        :config="config"
        @ready="onEditorReady"
      >
      </ckeditor>
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

import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'te-html',
  props: {
    element: { type: Object, required: true },
    isFocused: { type: Boolean, default: false }
  },
  data() {
    return {
      editor: ClassicEditor,
      content: get(this.element, 'data.content', ''),
      config: {}
    };
  },
  computed: {
    hasChanges() {
      const previousValue = get(this.element, 'data.content', '');
      return previousValue !== this.content;
    }
  },
  methods: {
    onEditorReady(editor) {
      editor.editing.view.focus();
    },
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
  components: { ckeditor: CKEditor.component }
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
