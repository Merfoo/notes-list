<template>
    <div id="notes-list">
        <div id="list-header">
            <h2>Notes</h2>
            <div class="btn-group btn-group-justified" role="group">
                <!-- all notes button -->
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default"
                        @click="selectAllNotes()"
                        :class="{active: show === 'all'}">
                        All Notes
                    </button>
                </div>
                <!-- favorites button -->
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default"
                        @click="selectFavoritedNotes()"
                        :class="{active: show === 'favorites'}">
                        Favorites
                    </button>
                </div>
            </div>
        </div>
        <!-- render notes in a list-->
        <div class="container">
            <div class="list-group">
                <a v-for="note in filteredNotes"
                    class="list-group-item"
                    :class="{active: activeNote === note}"
                    @click="updateActiveNote(note)">
                    <h4 class="list-group-item-heading">
                        {{note.text.trim().substring(0, 30)}}
                    </h4>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            show: "all"
        }
    },
    methods: {
        updateActiveNote(note){
            this.$store.dispatch("setActiveNote", note)
        },
        selectAllNotes(){
            this.show = "all"
            this.updateActiveNote(this.notes.length > 0 ? this.notes[0] : {})
        },
        selectFavoritedNotes(){
            this.show = "favorites"
            this.updateActiveNote(this.notes.length > 0 ? this.notes[0] : {})
        }
    },
    computed: {
        notes(){
            return this.$store.getters.notes
        },
        activeNote(){
            return this.$store.getters.activeNote
        },
        filteredNotes(){
            if(this.show === "all"){
                return this.notes
            }
            
            else if(this.show === "favorites"){
                return this.notes.filter(note => note.favorite)
            }
        }
    }
}
</script>