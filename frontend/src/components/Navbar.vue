<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark mb-4">
        <div class="container-fluid">
            <router-link :to="{ name: pathHome }" class="navbar-brand mx-2 px-2"><b-icon-clipboard-data-fill/> WarLoss</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <li class="nav-item" v-for="(loss, index) in lossTypes" :key="index">
                        <a :href="$router.resolve({ name: pathStatistics, params: { type: loss.type } }).href" class="nav-item nav-link">{{loss.name}}</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link navbar-brand ms-4" href="#" role="button" data-bs-toggle="dropdown"><b-icon-list/></a>
                        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li class="nav-item" v-for="(loss, index) in otherTypes" :key="index">
                                <a :href="$router.resolve({ name: pathStatistics, params: { type: loss.type } }).href" class="nav-item nav-link">{{loss.name}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Loss } from "@/interfaces";

    export default defineComponent({
        name: 'NavBar',
        data() {
            return {
                pathHome: 'home',
                pathStatistics: 'statistics',
                lossTypes: [
                    { name: "Avión", type: "aircraft"}, 
                    { name: "Helicóptero", type: "helicopter"}, 
                    { name: "Tanque", type: "tank"}, 
                    { name: "Carro de combate", type: "military_auto"}, 
                    { name: "Drone", type: "drone"}, 
                    { name: "Buque", type: "naval_ship"}, 
                ] as Loss[],
                otherTypes: [
                    { name: "APC", type: "APC"}, 
                    { name: "Artillería", type: "field_artillery"}, 
                    { name: "MRL", type: "MRL"}, 
                    { name: "Tanque de combustible", type: "fuel_tank"}, 
                    { name: "Antiaéreos", type: "anti_aircraft_warfare"}, 
                    { name: "Equipamiento", type: "special_equipment"}
                ] as Loss[]
            };
        }
    })
</script>