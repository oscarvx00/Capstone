import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"


//Routes
const routes: RouteRecordRaw[] = [

    {
        path: `/`,
        name: "home",
        component: () => import('@/components/Home.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: "404",
        component: () => import('@/components/404.vue'),
    },
    {
        path: '/statistics/:type',
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