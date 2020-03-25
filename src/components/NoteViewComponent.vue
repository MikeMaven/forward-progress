<template>
  <div
    id="noteViewComponent"
    :class="{
      noteIndexVisibleSideBar: this.isSidebarHidden || this.windowWidth > 1256,
      noteIndexVisibleSideBarSmaller:
        this.isSidebarHidden &&
        this.windowWidth >= 768 &&
        this.windowWidth < 1256,
      noteIndexVisibleSideBarSmallerTwo:
        this.isSidebarHidden &&
        this.windowWidth >= 630 &&
        this.windowWidth < 768,
      noteIndexHiddenSideBar: !this.isSidebarHidden
    }"
  >
    <div id="noteHeader">
      <h1 :class="{ tinyNoteView: this.isSidebarHidden }">
        {{ selectedNote.title }}
      </h1>
      <ul :class="{ tinyNoteView: this.isSidebarHidden }">
        <a :href="'/EditNote/' + selectedNote.id"
          ><li :class="{ tinyNoteView: this.isSidebarHidden }">
            Edit
          </li></a>
        <a @click="deleteNote"><li>Delete</li></a>
      </ul>
    </div>
    <div
id="noteBody" :class="{ tinyNoteView: this.isSidebarHidden }">
      <div v-html="selectedNote.body" />
    </div>
    <div>
      <span :class="{ tinyNoteView: this.isSidebarHidden }">
        <tag-component
          v-for="tag in selectedNote.tags"
          :key="tag.id"
          :tag="tag"
        />
      </span>
      <b-button
        v-if="!isShared"
        v-b-modal.share-modal
        variant="success"
        :class="{ tinyNoteView: this.isSidebarHidden }"
        @click="getUsersToShareWith"
      >
        Share
      </b-button>
    </div>
    <b-modal
      id="share-modal"
      hide-footer
      title="Share This Note With Another User"
    >
      <p class="my-4">
        Search below for a users you would like to share this note with by
        registered email address. You may choose as many users as you like.
      </p>
      <multiselect
        v-model="selectedUsers"
        tag-placeholder="Add this user"
        placeholder="Search users"
        label="username"
        track-by="id"
        :options="options"
        :taggable="true"
        :multiple="true"
        @tag="addUserToSelected"
      />
      <b-button
class="mt-3" block @click="submitShares">
        Share Now
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import TagComponent from './TagComponent.vue';
import previewTextGenerator from '../store/notes/helpers/previewTextGenerator';
import Multiselect from 'vue-multiselect';
require('../util/multiselect.css');

export default {
  title: 'NoteListComponent',
  components: {
    TagComponent,
    Multiselect
  },
  props: ['note', 'isShared'],
  computed: {
    selectedNote() {
      return this.$store.getters['notes/getSelectedNote'];
    },
    currentUser() {
      return this.$store.state.user;
    },
    options() {
      return this.$store.getters['notes/usersToShareWith'];
    },
    selectedUsers: {
      get: function() {
        return this.$store.getters['notes/getSelectedUsers'];
      },
      set: function(updatedUsers) {
        this.$store.dispatch('notes/updateUserSelection', updatedUsers);
      }
    },
    isSidebarHidden: {
      get: function() {
        return this.$store.getters['notes/getIsSidebarHidden'];
      }
    },
    windowWidth: {
      get: function() {
        return this.$store.getters['notes/getWindowSize'];
      }
    }
  },
  mounted() {},
  methods: {
    deleteNote() {
      const oldSelectionId = this.selectedNote.id;
      this.$store.dispatch(
        'notes/updateSelectionUponDeletion',
        this.selectedNote.id
      );
      this.$store.dispatch('notes/deleteNote', {
        id: oldSelectionId,
        source: 'index'
      });
    },
    starToggle() {
      this.$store.dispatch('notes/starToggle', {
        id: this.note.id,
        starred: this.note.starred
      });
    },
    submitShares() {
      let payload = {
        users: this.selectedUsers,
        noteId: this.selectedNote.id,
        creatorId: this.currentUser.id
      };
      this.$store.dispatch('notes/submitShares', payload).then(response => {
        this.$root.$emit('bv::hide::modal', 'share-modal');
      });
    },
    addUserToSelected(user) {
      this.selectedUsers.push(user);
    },
    getUsersToShareWith() {
      this.$store.dispatch('notes/getUsersToShareWith');
    }
  }
};
</script>

<style scoped>
#noteViewComponent {
  float: right;
  padding: 25px 35px 25px 25px;
}

.noteIndexHiddenSideBar {
  width: calc(100vw - 50px);
  max-width: calc(100vw - 50px);
}

.noteIndexVisibleSideBar {
  width: 75%;
  max-width: 75%;
}

.noteIndexVisibleSideBarSmaller {
  width: 67%;
}

.noteIndexVisibleSideBarSmallerTwo {
  width: 34%;
}

#noteHeader h1 {
  display: inline-block;
  font-family: paralucent, sans-serif;
  font-weight: 400;
  font-size: 4em;
  color: #013369;
}

#noteHeader ul {
  float: right;
}

#noteHeader ul,
li {
  display: inline-block;
  font-family: paralucent, sans-serif;
  font-weight: 400;
  font-size: 1.25em;
}

#noteHeader li {
  padding: 10px 25px 10px 25px;
  color: #d50a0a;
}

#noteBody {
  margin-top: 20px;
}

#noteBody {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.35em;
}

#noteBody li {
  display: block;
  padding-left: 5px;
}

#noteBody li::before {
  content: '\2022'; /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: black; /* Change the color */
  display: inline-block; /* Needed to add space between the bullet and the text */
  padding-right: 20px;
}

@media (max-width: 374px) {
}

@media (min-width: 375px) and (max-width: 413px) {
}

@media (min-width: 414px) and (max-width: 629px) {
}

@media (min-width: 630px) and (max-width: 767px) {
  #noteHeader h1.tinyNoteView {
    color: #013369;
    font-size: 2.5em;
  }

  #noteHeader ul.tinyNoteView {
    display: block;
    float: none;
  }

  #noteHeader li.tinyNoteView {
    padding: 0 15px 0 0;
  }

  #noteBody span.tinyNoteView {
    margin-bottom: 25px;
  }

  .tinyNoteView .noteIndexTag {
    float: none;
    margin: 3px 0 0 0;
  }

  .btn-success.tinyNoteView {
    margin-top: 20px;
    display: block;
  }
}

@media (min-width: 768px) and (max-width: 1255px) {
}
</style>

<style>
#noteBody .ql-align-center {
  text-align: center;
}

#noteBody .ql-align-right {
  text-align: right;
}

#noteBody .ql-align-justify {
  text-align: justify;
}
</style>
