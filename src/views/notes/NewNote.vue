<template>
  <div>
    <h1>NEW NOTE</h1>
    <text-editor-component
      :noteTitle = "null"
      :noteBody = "null"
      :editNoteID = "null"
    ></text-editor-component>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import TextEditorComponent from '../../components/TextEditorComponent.vue';
import {
  Blockquote,
  CodeBlock,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorMenuBar,
    EditorContent,
    TextEditorComponent
  },
  data() {
    return {
      editor: null,
      title: null,
      body: null
    }
  },
  methods: {
    clearEditor() {
      this.editor.clearContent(true);
      this.editor.focus()
    },
    saveNote() {
      if (this.title && this.body) {
        this.$store.dispatch('notes/saveNote', {title: this.title, body: this.body});
      } else {
        // Add some better error messaging here later instead of the popup
        alert('You must add a title and body')
      }
    },
    setFocusToEditor() {
      this.editor.focus()
    }
  },
  mounted() {
    const vm = this

    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: this.body,
      onUpdate: ({getHTML}) => {
        this.body = getHTML()
      },

    }),
    this.editor.setContent(this.body)
  }
}
</script>

<style>
/* CSS Here fixes menu buttons and styling */
.textButton {
  width: 5%;
  font-size: .75em;
  border-radius: 5px;
  vertical-align: middle;
  padding: 6px;
}

.buttonRow {
  position: relative;
  margin: 15px 0 5px 0;
}

.svg-inline--fa {
  vertical-align: -webkit-baseline-middle;
}

/* CSS here specifically fixed some of the text box's styling issues: */
.ProseMirror {
  padding: 6px;
}

.ProseMirror:focus {
  outline: none !important;
}

.editor li p {
  display: inline !important;
}
</style>
