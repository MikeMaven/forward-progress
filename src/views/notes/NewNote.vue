<template>
  <div>
    <h1>NEW NOTE</h1>
    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">Bold</button>
          <button :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote">Blockquote</button>
          <button :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">Code Block</button>
          <button :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">Heading 1</button>
          <button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">Heading 2</button>
          <button :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">Heading 3</button>
          <button :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">Ordered List</button>
          <button :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">Bullet List</button>
          <button :class="{ 'is-active': isActive.italic() }" @click="commands.italic">Italic</button>
          <button :class="{ 'is-active': isActive.strike() }" @click="commands.strike">Strike</button>
          <button :class="{ 'is-active': isActive.underline() }" @click="commands.underline">Underline</button>
        </div>
      </editor-menu-bar>
      <div style="height:50vh;width:100%;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;" className="scrollBox" v-on:click="setFocusToEditor">
        <editor-content :editor="editor" id="editorBox" class="editor__content" />
      </div>
    </div>
    <div class="buttonRow">
      <button v-on:click="clearEditor">Clear</button>
      <button v-on:click="saveNote">Save Note</button>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
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
    EditorContent
  },
  data() {
    return {
      editor: null
    }
  },
  methods: {
    clearEditor() {
      this.editor.clearContent(true);
      this.editor.focus()
    },
    saveNote() {
      this.$store.dispatch('notes/saveNote');
    },
    setFocusToEditor() {
      this.editor.focus()
    }
  },
  mounted() {
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
      content: `
        <h1>Headers!</h1>
        Here are <strong>some tags</strong> oh boy.
        <ul>
          <li>fjalsdjfa</li>
          <li>fjasdlkfj</li>
        </ul>
      `
    })
  }
}
</script>

<style>
.buttonRow {
  margin-top: 20px;
}

/* CSS here specifically fixed some of the text box's styling issues: */
#editorBox {
  padding: 6px;
  margin-top: 10px;
  max-height: 70vh;
}

.ProseMirror-focused:focus, input:focus{
  outline: none !important;
}

.editor li p {
  display: inline !important;
}
</style>
