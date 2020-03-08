<template>
  <div>
    <ToolBar />
    <vue-editor
      ref="quillEditor"
      :customModules="customModulesForEditor"
      :editorOptions="editorSettings"
    />
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor';
import QuillBetterTable from 'quill-better-table';
import ToolBar from './ToolBar.vue';

// Quill.register({
//   'modules/better-table': QuillBetterTable
// }, true);

export default {
  name: 'TextEditor',
  components: { VueEditor, ToolBar },
  data() {
    return {
      customModulesForEditor: [
        {
          alias: 'better-table',
          module: QuillBetterTable
        }
      ],
      editorSettings: {
        modules: {
          'better-table': true,
          toolbar: {
            container: '#toolbar',
            handlers: {
              customButton() {
                debugger;
                this.quill.options.modules['better-table'];
              }
            }
          }
        }
      }
    };
  }
};
</script>