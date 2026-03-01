import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Vehiculos/Index.vue";
import Create from "../views/Vehiculos/create.vue";
const ruter = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/vehiculos",
            name: "listado-vehiculos",
            component:Index
        },
        {
            path: "/vehiculos/create",
            name: "creado-vehiculos",
            component:Create
        }
    ]
})
export default ruter;