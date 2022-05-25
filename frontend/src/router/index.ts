import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"


//Routes
const routes: RouteRecordRaw[] = [

    {
        path: `/`,
        name: "home",
        component: () => import('@/components/Home.vue'),
    },
    {
        path: `/register`,
        name: "register",
        component: () => import('@/components/Register.vue'),
    },
    {
        path: `/login`,
        name: "login",
        component: () => import('@/components/Login.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: "404",
        component: () => import('@/components/404.vue'),
    },
    {
        path: '/statistics',
        name: 'statistics',
        props: true,
        component: () => import('@/components/Statistics.vue'),
    }
];



const router = createRouter({
    history: createWebHistory(),
    routes
});


export { router };