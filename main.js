import Vue from "vue"
import { sync } from "vuex-router-sync"
import store from "./store/index"
import { router } from "./router/index"

sync(store, router)

new Vue({
    store,
    router
}).$mount("#app")