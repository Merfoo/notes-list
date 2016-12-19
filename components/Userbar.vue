<template>
    <div id="userbar">
        <h3 id="user-display-name">{{ user.displayName }}</h3>
        <button type="button" id="btn-sign-out" 
            class="btn btn-default"
            @click="signOut">Sign out</button>
    </div>
</template>

<script>
import firebase from "firebase"

export default {
    methods: {
        signOut(){
            firebase.auth().signOut()
        }
    },
    computed: {
        user(){
            return this.$store.getters.user
        }
    }
}
</script>