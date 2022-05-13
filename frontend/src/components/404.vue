<template>
    <div>    
        <h1>{{$t("msg.err404")}}</h1>    
        <router-link :to="{ name: pathHome }">{{$t("msg.home")}}</router-link>
    </div>
</template>


<script lang="ts">
    import { defineComponent } from "@vue/runtime-core";
           
    export default defineComponent({
        name: '404Form',
        data() {
            return {
                pathHome: 'home',
            };
        }
    });

</script>