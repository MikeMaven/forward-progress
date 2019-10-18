<template>
  <div>
    <div id="sideBar" v-if="this.isSidebarHidden">
        <div class="tagDiv">
            <div id="titleRow">
                <img src="~public/images/Icon1-white.png">
                <h1 class="notesIndexTitle">My Notes</h1>
                <h3 class="hideArrow" v-on:click="this.hideSideBar" v-if="this.windowWidth < 1366">&#9664</h3>
            </div>
            <div id="filterRow">
                <div id="filterToggleLink" v-on:click="this.changeFilterToggle">
                    <h4>Filter notes by tag:</h4>
                    <span v-if="!this.filterOptionsToggle" class="arrow arrowRight">&#9654</span>
                    <span v-if="this.filterOptionsToggle" class="arrow arrowRight">&#9660</span>
                </div>
                <div id="selectZone" v-if="this.filterOptionsToggle">
                    <multiselect
                        v-model="selected"
                        tag-placeholder=""
                        placeholder="Search for your tagged notes"
                        label="name"
                        track-by="id"
                        :options="options"
                        :taggable="true"
                        :multiple="true"
                        @tag="addFilterTag"
                    />
                    <div class="filterButtonRow">
                        <b-dropdown id="filterDropdown" text="Filter By:" right size="lg">
                            <b-dropdown-item v-on:click="changeFilter('allTags')" name="allSelected">All Selected Tags</b-dropdown-item>
                            <b-dropdown-item v-on:click="changeFilter('anyTags')" name="anySelected">Any Selected Tags</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
                <div>
                    {{ this.windowWidth }}
                </div>
            </div>
        </div>
        <div id="notesList">
            <note-list-component
            v-for="note in notes"
            :key="note.id"
            :note="note">
            </note-list-component>
        </div>
    </div>
    <div>
        <note-view-component :isShared="isShared" >
        </note-view-component>
    </div>
  </div>
</template>

<script>
import NoteListComponent from '../../components/NoteListComponent.vue';
import NoteViewComponent from '../../components/NoteViewComponent.vue';
import Multiselect from 'vue-multiselect';

export default {
  name: 'notes',

  components: {
    NoteListComponent,
    Multiselect,
    NoteViewComponent
  },

  mixins: [],

  props: ['notes', 'isShared'],

  data() {
    return {
    };
  },

  computed: {
    options() {
      return this.$store.getters['notes/getTagsInMyNotes'];
    },
    selected: {
      get: function() {
        return this.$store.getters['notes/getSelectedTagsInMyNotes'];
      },
      set: function(updatedTags) {
        this.$store.dispatch('notes/setSelectedTagsInMyNotes', updatedTags);
      }
    },
    filterHow: {
      get: function() {
        return this.$store.getters['notes/getFilterType'];
      },
    },
    filterOptionsToggle: {
        get: function() {
            return this.$store.getters['notes/getFilterToggle']
        }
    },
    windowWidth: {
        get: function() {
            return this.$store.getters['notes/getWindowSize']
        }
    },
    isSidebarHidden: {
        get: function() {
            return this.$store.getters['notes/getIsSidebarHidden']
        }
    }
  },

  methods: {
    addFilterTag(){
      // we can add a more specific, non-tag related sort here if we want
      return null;
    },
    changeFilter(updatedFilter){
        this.$store.dispatch('notes/setFilterType', updatedFilter);
    },
    changeFilterToggle(){
        if (this.filterOptionsToggle) {
            this.$store.dispatch('notes/setFilterToggle', false)
        } else {
            this.$store.dispatch('notes/setFilterToggle', true)
        }
    },
    handleWindowSizeChange() {
        if (process.browser) {
            this.$store.dispatch('notes/updateWindowWidth', window.innerWidth)
        }
    },
    
    hideSideBar() {
        this.$store.dispatch('notes/toggleSideBar', false)
    }
  },

  mounted() {
    if (process.browser) {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
  },

  destroyed() {
      if (process.browser) {
          window.removeEventListener('resize', this.handleWindowSizeChange);
      }
  }
};
</script>

<style>
/* Custom Styling */
#mainContainer {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}

.view {
    margin: 0;
    max-width: 100%;
}

/* Sidebar */

#sideBar {
  max-width: 25%;
  background-color: #e1e1e1;
  overflow-y: scroll;
  height: calc(100vh - 55px); 
  /* subtract height of top nav bar */
  float: left;
}

/* Sidebar Top Panel */
#sidebar .tagDiv {
  margin: 0 0 15px 0;
}

.tagDiv {
    background-color: #013369;
    padding: 0 20px 0 20px;
}

.titleRow {
    position: relative;
}

#titleRow img {
    width: 10%;
    display: inline-block;
    margin-right: 10px;
}

#noteViewDiv {
    display: inline-block;
}

#titleRow h1 {
    font-family: paralucent, sans-serif;
    vertical-align: bottom;
    color: white;
    font-weight: 700;
    font-style: italic;
    font-size: 3em;
    display: inline-block;
    letter-spacing: .025em;
}

#titleRow .hideArrow {
    float: right;
    color: white;
    font-size: 2.5em;
}

#filterRow {
    padding-bottom: 15px;
}

.dropdown-menu.show {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.5em;
    width: 100%;
}

.tagDiv h4 {
    display: inline-block;
    margin-top: 15px;
    color: white;
    font-family: paralucent, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.8em;
    letter-spacing: .05em;
}

.tagDiv .arrow {
    margin-left: 5px;
    color: white;
    font-size: 1.8em;
}

.multiselect__input {
  border: none !important;
}

#filterDropdown {
    margin-top: 10px;
    width: 100%;
}

#filterDropdown button {
    font-family: paralucent, sans-serif;
    font-style: 'normal';
    font-weight: 400;
    font-size: 1.5em;
    letter-spacing: 0.2em;
    color: #d50a0a;
    background-color: white;
    padding: 15px 20px 15px 20px;
    text-transform: uppercase;
    padding: 5px 0 5px 0;
}

/* Sidebar Bottom Panel */

#notesList {
    padding: 0;
}

/* RESPONSIVE STUFF */

@media (max-width: 374px) {
}

@media (min-width: 375px) and (max-width: 413px) {
}

@media (min-width: 414px) and (max-width: 629px) {
}

@media (min-width: 630px) and (max-width: 767px) {
}

@media (min-width: 768px) and (max-width: 1365px) {
}

@media (min-width: 1366px) and (max-width: 1599px) {
}

@media (min-width: 1600px) and (max-width: 1919px) {
}

@media (min-width: 1920px) {
}

</style>
