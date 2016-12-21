import Vue from "vue"
import { sync } from "vuex-router-sync"
import store from "./store/index"
import { router } from "./router/index"
import { firebase, attachAuthHandler } from "./firebase/index"

sync(store, router)

attachAuthHandler(store, router).then((res) => { 
    new Vue({ 
        store, 
        router 
    }).$mount("#app")
}, (err) => {
    console.log("uh oh")
})