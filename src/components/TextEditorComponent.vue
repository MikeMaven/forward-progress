<template>
  <div>
    <link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">
    <div class="editor">
      <h6>Title:</h6><input v-model="title" type="text" tabindex="1" />
      <div class="buttonRow">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="menubar">
            <button class="textButton" :class="{ 'is-active': isActive.bold() }" @click="commands.bold"><font-awesome-icon icon="bold" size="3x"/></button>
            <button class="textButton" :class="{ 'is-active': isActive.italic() }" @click="commands.italic"><font-awesome-icon icon="italic" size="3x" /></button>
            <button class="textButton" :class="{ 'is-active': isActive.strike() }" @click="commands.strike"><font-awesome-icon icon="strikethrough" size="3x" /></button>
            <button class="textButton" :class="{ 'is-active': isActive.underline() }" @click="commands.underline"><font-awesome-icon icon="underline" size="3x" /></button>
            <button class="textButton" :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote"><font-awesome-icon icon="quote-left" size="3x" /></button>
            <button class="textButton" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })"><font-awesome-icon icon="heading" size="3x" /></button>
            <button class="textButton" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })"><font-awesome-icon icon="heading" size="2x" /></button>
            <button class="textButton" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })"><font-awesome-icon icon="heading" size="1x" /></button>
            <button class="textButton" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list"><font-awesome-icon icon="list-ol" size="3x" /></button>
            <button class="textButton" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list"><font-awesome-icon icon="list" size="3x" /></button>
          </div>
        </editor-menu-bar>
      </div>
      <div style="height:50vh;width:100%;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;" className="scrollBox" v-on:click="setFocusToEditor">
        <editor-content :editor="editor" id="editorBox" class="editor__content" />
      </div>
    </div>
    <div class="tagDiv">
      <h6>Add Tags:</h6>
      <!-- <input type="text" class="form-control" name="title"> -->
      <multiselect
        v-model="value"
        tag-placeholder="Add this as a new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="code"
        :options="options"
        :taggable="true"
        :multiple="true"
        @tag="addTag" />
        <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
    </div>
    <div class="buttonRow">
      <!-- WHEN EDITING A NOTE, THIS SHOULD CHANGE FROM CLEAR TO CANCEL -->
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
} from 'tiptap-extensions';
import Multiselect from 'vue-multiselect';

export default {
  title: 'TextEditorComponent',
  props: [ 'noteTitle', 'noteBody', 'editNoteID' ],
  watch: {
    noteTitle: function() {
      this.title = this.noteTitle;
    },
    noteBody: function() {
      this.body = this.noteBody
      this.editor.setContent(this.body)
    }
  },
  components: {
    EditorMenuBar,
    EditorContent,
    Multiselect
  },
  data() {
    return {
      editor: null,
      body: null,
      title: null,
      value: [ { name: 'Javascript', code: 'js' } ],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]
    }
  },
  methods: {
    clearEditor() {
      this.editor.clearContent(true);
      this.editor.focus()
    },
    saveNote() {
      if (this.editNoteID) {
        this.$store.dispatch('notes/editNote', {title: this.title, body: this.body, id: this.editNoteID})
      } else {
        this.$store.dispatch('notes/saveNote', {title: this.title, body: this.body});
      }
    },
    setFocusToEditor() {
      this.editor.focus()
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 100000000))
      }
      this.options.push(tag);
      this.value.push(tag);
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
    this.editor.view.props.attributes = { tabindex: "2" };
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

/* STYLES FOR TAGS */
.tagDiv {
  margin: 15px 0 100px 0;
}
</style>
