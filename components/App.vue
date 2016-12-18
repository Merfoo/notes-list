<template>
    <div  id="app">
        <login v-show="!userLoggedIn"></login>
        <toolbar v-if="userLoggedIn"></toolbar>
        <notes-list v-if="userLoggedIn"></notes-list>
        <editor v-if="userLoggedIn"></editor>
    </div>
</template>

<script>
import Login from "./Login.vue"
import Toolbar from "./Toolbar.vue"
import NotesList from "./NotesList.vue"
import Editor from "./Editor.vue"

export default {
    components: {
        Login,
        Toolbar,
        NotesList,
        Editor
    },
    computed: {
        userLoggedIn(){
            return this.$store.getters.userLoggedIn
        }
    }
}
</script>