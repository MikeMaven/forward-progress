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
      <editor-content :editor="editor" id="editorBox" class="editor__content" />
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
  },
  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>

<style>
#editorBox {
  border: 1px solid black;
  padding: 5px;
  margin-top: 10px;
}

/* Fixes some of the text box's styling issues: */
.editor li p {
  display: inline !important;
}
</style>
