<template>
    <div>    
        <h1>404: Página no encontrada</h1>    
        <router-link :to="{ name: pathHome }">Home</router-link>
    </div>
</template>


<script lang="ts">
    import { defineComponent } from "vue";
           
    export default defineComponent({
        name: '404Form',
        data() {
            return {
                pathHome: 'home',
            };
        }
    });

</script>