<template>
    <div class="container py-4">
        <div class="row align-items-center">
            <div class="col-lg-6 my-4 ">
                <div class="d-flex justify-content-center">
                        <div class="d-flex w-75 flex-column">
                            <div class="card p-4">
                                <div class="card-body">
                                    <h1>Iniciar sesión</h1>
                                    <p>
                                        ¿Todavía no te has registrado? 
                                        <router-link :to="{ name: pathRegister }">Registrarse</router-link>
                                    </p><br>
                                    
                                    <label for="name" class="form-label">Usuario:</label><br>    
                                    <input type="text" id="name" v-model="user.username" class="form-control" required/><br>
                                    
                                    <label for="password" class="form-label">Contraseña:</label><br>    
                                    <input type="password" id="password" v-model="user.password" class="form-control" required/><br>


                                    <p v-if="errCredentials" class="error">Usuario o contraseña incorrectos.</p>
                                    <p v-if="errFields" class="error">Rellene todos los campos.</p>
                                    <div class="d-grid">
                                        <button v-on:click="loginMth" class="btn btn-primary">Iniciar sesión</button>
                                    </div>    
                                </div>
                                
                            </div>                            
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import { router } from "@/router"
    import { User } from "@/interfaces";
    import axios from "axios";  
    import { defineComponent } from "@vue/runtime-core";
    import { login } from "@/services/authService"

    export default defineComponent({    
        name: "LoginForm",
        data() {
            return {
                user: {} as User,
                pathRegister: 'register',
                pathHome: 'home',
                errCredentials: false,
                errFields: false
            };
        }, 
        methods: {
            loginMth: async function() {     // eslint-disable-line 

                //Clear error messages
                this.errCredentials = false;

                if(this.checkForm()) {
                    let credentials = {    
                        username: this.user.username,    
                        password: this.user.password    
                    }    
                    try {
                        const res = await login(credentials);    
                        const token = res.data.token;
                        console.log("Logged in: " + token);
                        router.push({ name: this.pathHome});
                    }catch(error) {  
                        console.log("Cannot log in: " + error);
                        if(axios.isAxiosError(error) && (error as any).response){   // eslint-disable-line 
                            if((error as any).response.status === 404)              // eslint-disable-line 
                                this.errCredentials = true;
                        }
                    }
                }
            },
            checkForm: function () {
                if (this.user.username && this.user.password) {
                    this.errFields = false;
                    return true;
                }
                else {
                    this.errFields = true;
                    return false;
                }
            }
        }    
    })
</script>
