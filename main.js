import Vue from "vue"
import App from "./components/App.vue"
import store from "./store/store"

new Vue({
    el: "body",
    store, // inject store to all children
    render: h => h(App)
})