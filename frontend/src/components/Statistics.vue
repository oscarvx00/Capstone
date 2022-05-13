<template>
    <div class="container py-4">
        <div class="row align-items-center">
                <div class="d-flex justify-content-center">
                        <div class="d-flex flex-column">
                                    
                                    <!-- Title -->
                                    <h1 class="d-flex justify-content-center mb-5">Estadísticas: {{loss.name}}</h1>
                                    
                                    
                                    
                                    <!-- Chart -->
                                    <div class="d-flex justify-content-center mb-5">
                                        <Bar :chart-data="chartData" style="width:60%"/>
                                    </div>

                                    <!-- Add new loss -->
                                    <form class="input-group mb-5" @submit.prevent="handleCreation()">
                                        <!-- <input class="form-control" v-model="newLoss.date" placeholder="Fecha"> -->
                                        <datepicker class="form-control" v-model="newDate" format="YYYY-MM-dd" placeholder="Fecha" style="background-color: white"/>
                                        <input class="form-control" v-model="newLoss.value" placeholder="Número de pérdidas">
                                        <button class="btn btn-success"><b>Añadir</b></button>
                                    </form>

                                    <!-- Info table -->
                                    <div class="d-flex justify-content-center">
                                        <input class="form-control py-3" value="Fecha" style="font-weight:bold; font-size:x-large;" disabled>
                                        <input class="form-control py-3" value="Pérdidas" style="font-weight:bold; font-size:x-large;" disabled>
                                        <button class="btn px-4" style="color:white" disabled><b-icon-x-circle-fill/></button>
                                    </div>

                                    <div class="input-group" v-for="(lost, index) in lossesList" :key="index">
                                        <input class="form-control py-3" id="date" v-model="lost.date" disabled>
                                        <input class="form-control  py-3" id="value" v-model="lost.value" @change="handleUpdate(lost)">
                                        <button v-on:click="removeLoss(lost.date)" class="btn px-4" style="color:red"><b-icon-x-circle-fill/></button>
                                    </div>    
                        </div>
                    </div>
        </div>
    </div>
</template>


<script lang="ts">
    import { defineComponent } from "vue";
    import { Loss, LossData } from "@/interfaces";
    import { getLosses, updateLoss, deleteLoss, createLoss } from "@/services/lossService"
    import Datepicker from 'vue3-datepicker'
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

    //Create chart
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

    export default defineComponent({
        name: 'StatisticsForm',
        components: {
            Datepicker,
            Bar
        },
        data() {
            return {
                loss: {} as Loss,
                lossesList: [] as LossData[],
                newLoss: {} as LossData,
                newDate: new Date(),
                pathStatistics: 'statistics',
                lossTypes: ["aircraft", "helicopter", "tank", "APC", "field_artillery", "MRL", "military_auto", "fuel_tank", "drone", "naval_ship", "anti_aircraft_warfare", "special_equipment"] as string[],
                lossNames: ["Avión", "Helicóptero", "Tanque", "APC", "Artillería", "MRL", "Carro de combate", "Tanque de combustible", "Drone", "Buque", "Antiaéreos", "Equipamiento"] as string[],
                chartData: {
                    labels: [] as string[],
                    datasets: [] as object[]
                }
            };
        },
        methods: {
            async loadLosses() {
                try {
                    //Get data from db
                    let res = await getLosses(this.loss.type);
                    this.lossesList = res.data;
                    
                    //Create chart data
                    let values = [];
                    this.chartData.labels = [];
                    for (var i = this.lossesList.length - 1; i >= 0; i--) {
                        this.chartData.labels.push(this.lossesList[i].date);
                        values.push(this.lossesList[i].value);
                    }
                    this.chartData.datasets = [{
                        label: 'Pérdidas',
                        backgroundColor: '#f87979',
                        data: values
                    }];
                     
                } catch (error) {
                    console.log(error);    
                }
            },
            async handleCreation() {
                try {
                    //Format date to YYYY-MM-dd
                    let tzOffset = this.newDate.getTimezoneOffset() * 60 * 1000
                    let formatedDate = new Date((this.newDate as any) - tzOffset).toISOString().split('T')[0];
                    this.newLoss.date = formatedDate.toString();

                    //Create new loss
                    await createLoss(this.loss.type, this.newLoss);
                    this.loadLosses()
                    console.log("Loss created: " + this.newLoss.date + " " + this.newLoss.value);
                } catch (error) {
                    console.log(error);    
                }
            },
            async removeLoss(date: string) {
                try {
                    await deleteLoss(this.loss.type, date);
                    this.loadLosses();
                    console.log("Loss deleted: " + date);
                } catch (error) {
                    console.log(error);    
                }
            },
            async handleUpdate(loss: LossData) {
                try {
                    await updateLoss(this.loss.type, loss);
                    console.log("Loss updated: " + loss.date + " " + loss.value);
                    
                } catch (error) {
                    console.log(error);    
                }
            }
        },
        mounted() {
            //Link type with names
            const map = new Map();
            for (let i = 0; i < this.lossTypes.length; i++) {
                map.set(this.lossTypes[i], this.lossNames[i]);
            }
            //Create loss object
            this.loss = {
                type: this.$route.params.type as string,
                name: map.get(this.$route.params.type)
            };
            //Get lossses from db
            this.loadLosses()
        }
    });
    
</script>