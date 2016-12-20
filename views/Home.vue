<template>
    <div id="home">
        <userbar></userbar>
        <toolbar></toolbar>
        <notes-list></notes-list>
        <editor></editor>
    </div>
</template>

<script>
import Userbar from "../components/Userbar.vue"
import Toolbar from "../components/Toolbar.vue"
import NotesList from "../components/NotesList.vue"
import Editor from "../components/Editor.vue"

export default {
    components: {
        Userbar,
        Toolbar,
        NotesList,
        Editor
    }
}
</script>