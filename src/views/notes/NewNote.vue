<template>
  <div>
    <h1>NEW NOTE</h1>
    <div class="editor">
      <h6>Title:</h6><input v-model="title" type="text"/>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold"><font-awesome-icon icon="bold" size="3x"/></button>
          <button :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote"><font-awesome-icon icon="quote-left" size="3x" /></button>
          <button :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })"><font-awesome-icon icon="heading" size="3x" /></button>
          <button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })"><font-awesome-icon icon="heading" size="2x" /></button>
          <button :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })"><font-awesome-icon icon="heading" size="1x" /></button>
          <button :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list"><font-awesome-icon icon="list" size="3x" /></button>
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
      this.$store.dispatch('notes/saveNote', {title: this.title, body: this.body});
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
