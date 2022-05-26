import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"


//Routes
const routes: RouteRecordRaw[] = [

    {
        path: `/`,
        name: "home",
        component: () => import('@/components/Home.vue'),
        meta: { authRoute: false }
    },
    {
        path: `/register`,
        name: "register",
        component: () => import('@/components/Register.vue'),
        meta: { authRoute: true }
    },
    {
        path: `/login`,
        name: "login",
        component: () => import('@/components/Login.vue'),
        meta: { authRoute: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: "404",
        component: () => import('@/components/404.vue'),
        meta: { authRoute: false }
    },
    {
        path: '/statistics',
        name: 'statistics',
        props: true,
        component: () => import('@/components/Statistics.vue'),
        meta: { authRoute: false }
    }
];



const router = createRouter({
    history: createWebHistory(),
    routes
});


export { router };