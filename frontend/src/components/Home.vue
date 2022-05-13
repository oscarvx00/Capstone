<template>
    <div>
        <h2>Tipos de pérdidas:</h2>
        
        <div class="nav-item my-2" v-for="(loss, index) in lossTypes" :key="index">
            <router-link :to="{ name: pathStatistics,  params: { type: loss.type } }" class="btn btn-primary" >{{loss.name}}</router-link>
        </div>
        
        
        
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { Loss } from "@/interfaces";


    export default defineComponent({
        name: 'HomeForm',
        data() {
            return {
                pathStatistics: 'statistics',
                lossTypes: [
                    { name: "Avión", type: "aircraft"}, 
                    { name: "Helicóptero", type: "helicopter"}, 
                    { name: "Tanque", type: "tank"}, 
                    { name: "APC", type: "APC"}, 
                    { name: "Artillería", type: "field_artillery"}, 
                    { name: "MRL", type: "MRL"}, 
                    { name: "Carro de combate", type: "military_auto"}, 
                    { name: "Tanque de combustible", type: "fuel_tank"}, 
                    { name: "Drone", type: "drone"}, 
                    { name: "Buque", type: "naval_ship"}, 
                    { name: "Antiaéreos", type: "anti_aircraft_warfare"}, 
                    { name: "Equipamiento", type: "special_equipment"}
                ] as Loss[],
                
            };
        }
    });

</script>