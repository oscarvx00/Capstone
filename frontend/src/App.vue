<template>
    <Navbar v-if="!isAuthRoute"/>
    <router-view/>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Navbar from "./components/Navbar.vue";

    export default defineComponent({
        name: 'App',
        components: {
            Navbar,
        },
        computed: {
            isAuthRoute() {
                return this.$route.meta.authRoute;
            }
        }
    });
</script>