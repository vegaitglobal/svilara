import Vue from "vue";
import Router from "vue-router";
import routes from "./routes/index"

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes,
    linkExactActiveClass: "nav-item active"
});