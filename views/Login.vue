<template>
    <div id="firebaseui-auth-container">
    </div>
</template>

<script>
import { firebase, ui } from "../firebase/index"

export default {
    mounted: function(){
        console.log("Mounted login component")

        let uiConfig = {
            "signInOptions": [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID
            ],
            "signInSuccessUrl": "http://localhost:8080/#/home",
            "tosUrl": "www.google.com"
        }

        ui.start("#firebaseui-auth-container", uiConfig);
    }
}
</script>
