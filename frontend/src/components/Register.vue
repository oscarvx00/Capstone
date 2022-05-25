<template>
    <div class="container py-4">
        <div class="row align-items-center">
            <div class="col-lg-6 my-4 ">
                <div class="d-flex justify-content-center">
                        <div class="d-flex w-75 flex-column">
                            <div class="card p-4">
                                <div class="card-body">
                                    <h1>Registrarse</h1>
                                    <p>
                                        ¿Ya está registrado? 
                                        <router-link :to="{ name: urlLogin }">Iniciar sesión</router-link>
                                    </p><br>
                                    
                                    <label for="name" class="form-label">Usuario:</label><br>    
                                    <input type="text" id="name" v-model="user.username" class="form-control" required/><br>
                                    
                                    <label for="password" class="form-label">Contraseña:</label><br>    
                                    <input type="password" id="password" v-model="user.password" class="form-control" required/><br>
                                        
                                    <p v-if="errFields" class="error">Rellene todos los campos.</p>
                                    <div class="d-grid">
                                        <button v-on:click="register" class="btn btn-primary">Registrarse</button>
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
    import { router } from "@/router";
    import { User } from "@/interfaces";
    import { defineComponent } from "@vue/runtime-core";
    import { login, register } from "@/services/authService"

    export default defineComponent({    
        name: "RegisterForm",
        data() {
            return {
                user: {} as User,
                urlLogin: 'login',
                pathHome: 'home',
                checkPW: "",
                errFields: false
            };
        },
        methods: {
            register: async function(event: any) {      // eslint-disable-line 
                
                if(this.checkForm()) {
                        let credentials = {    
                            username: this.user.username,
                            password: this.user.password    
                        };
                        let loginError = false;     
                            
                        try {
                            await register(credentials);    
                            console.log("Account created");
                            //Login
                            try {
                                let res = await login(credentials);    
                                const token = res.data.token;
                                console.log("Logged in: " + token);
                                router.push({ name: this.pathHome});
                            }catch(error) { loginError = true; }

                        }catch(error) {  
                            if(!loginError){
                                console.log("Cannot create account: " + error);
                            }
                            else
                                console.log("Account created, but cannot login: " + error);
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
