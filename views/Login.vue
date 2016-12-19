<template>
    <div id="firebaseui-auth-container">
    </div>
</template>

<script>
import firebase from "firebase"
import firebaseui  from "firebaseui"

export default {
    mounted: function(){
        let uiConfig = {
            "signInOptions": [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID
            ],
            "signInSuccessUrl": "http://localhost:8080/#/login",
            "tosUrl": "www.google.com"
        };

        let ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start("#firebaseui-auth-container", uiConfig);

        firebase.auth().onAuthStateChanged((newUser) => {
            let user = this.$store.getters.user
            console.log("onAuthStateChanged");
            console.log(newUser);

            if(newUser && (user === null || user.uid !== newUser.uid)){
                console.log("Signed in!");
                this.$store.dispatch("setUser", newUser);

                firebase.database().ref("user-notes/" + newUser.uid + "/").once("value").then((snapshot) => {
                    let notes = []
                    let noteObjs = snapshot.val()

                    for(let noteKey in noteObjs){
                        if(noteObjs.hasOwnProperty(noteKey)){
                            notes.push(noteObjs[noteKey])
                        }
                    }

                    this.$store.dispatch("setNotes", notes)
                })

                this.$router.push({ path: "/home" })
            }

            else if(newUser === null && user){
                console.log("Signed out!");
                this.$store.dispatch("setUser", newUser);
            }

            else{
                console.log("Weird stuff");
            }
        });
    }
}
</script>
