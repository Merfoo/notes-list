import Vue from "vue"
import { sync } from "vuex-router-sync"
import store from "./store/store"
import { router } from "./router/router"

sync(store, router)

new Vue({
    store,
    router
}).$mount("#app")