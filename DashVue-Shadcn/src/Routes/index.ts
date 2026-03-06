import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const routes : RouteRecordRaw[] =[
    {
        path: '/',
        name: 'Inicio-Vehiculo',
        component: () => import ('../views/Vehiculos/Index.vue') 
    }
]
const router = createRouter({
    history : createWebHistory(),
    routes
})
export default router