<template>
    <div>
        <div class="container py-4">
            <div class="row align-items-center">
                <div class="d-flex flex-column">
                    
                    <!-- Presentación -->
                    <h1 class="d-flex justify-content-center my-4"><b-icon-clipboard-data/> WarLoss</h1>
                    <div class="d-flex justify-content-center mb-5">
                        <img  src="../../public/armamento.jpg" alt="armamento" style="width:80%">
                    </div>
                    <h5 class="d-flex justify-content-center mb-5">
                        Aplicación que muestra las pérdidas de guerra diarias según el tipo de vehículo o armamento. <br>
                        Estos datos provienen de una base datos militar y podrán ser modificados, borrados o añadir más días. <br>
                        El objetivo es tener la base de datos lo más actualizada posible para poder mantener a los usuario <br>
                        al día de las pérdidas ocasionadas.

                    </h5>
                    <!-- Tipos de pérdidas -->
                    <h2 class="d-flex justify-content-center mb-3">Tipos de pérdidas:</h2>                            

                    <div class="nav-item my-2" v-for="(loss, index) in lossTypes" :key="index">
                        <div class="d-grid mx-auto">
                            <router-link :to="{ name: pathStatistics,  params: { type: loss.type } }" class="btn btn-primary py-3" ><b>{{loss.name}}</b></router-link>
                        </div>
                    </div>

                </div>
            </div>
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