<template>
    <div id="note-editor">
        <textarea
            :value="activeNoteText"
            @input="editNote"
            class="form-control">
        </textarea>
    </div>
</template>

<script>
export default {
    methods: {
        editNote(e){
            this.$store.dispatch("editNote", e.target.value)
        }
    },
    computed: {
        activeNoteText(){
            return this.$store.getters.activeNoteText
        }
    }
}
</script>