<template>
    <div id="firebaseui-auth-container">
    </div>
</template>

<script>
import firebase from "firebase"
import firebaseui  from "firebaseui"

export default {
    mounted: function(){
        // Initialize Firebase
        let firebaseConfig = {
            apiKey: "AIzaSyCgK0wWrDY-SqJb-kejw1iF_gzgrhSgvcw",
            authDomain: "fir-7fe85.firebaseapp.com",
            databaseURL: "https://fir-7fe85.firebaseio.com",
        };
        firebase.initializeApp(firebaseConfig);

        let uiConfig = {
            "callbacks": {
                "signInSuccess": (currUser, cred, redirectUrl) => {
                    console.log("signInSuccess");
                    console.log(currUser);
                    console.log(cred);
                    console.log(redirectUrl);
                    
                    return true;
                }
            },
            "signInOptions": [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID
            ],
            "signInSuccessUrl": "http://localhost:8080",
            "tosUrl": "www.google.com"
        };

        let ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start("#firebaseui-auth-container", uiConfig);

        firebase.auth().onAuthStateChanged((newUser) => {
            let user = this.$store.getters.user
            console.log("onAuthStateChanged");
            console.log(newUser);
            console.log("just printed user");

            if(newUser && (user === null || user.uid !== newUser.uid)){
                firebase.auth().currentUser.getToken(true).then(function(authToken){

                }).catch(function(err){
                    console.log(err);
                });
                
                console.log("Signed in!");
                this.$store.dispatch("setUser", newUser);
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
