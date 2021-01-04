<template>
  <div class="main-content bg-default">
    <div class="header bg-gradient-success py-7 py-lg-4">
            <div class="container">
                <div class="header-body text-center mb-7">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-md-6">
                            <h1 class="text-white">Welcome!</h1>
                            <p class="text-lead text-white">Use these awesome forms to login or create new account in
                                your project for free.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        <div class="container mt--8 pb-5">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-6">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <form role="form" v-on:submit.prevent>
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="auth.user_mail">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="auth.user_password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="submit" @click="login" class="my-4">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-9 mb-3">
                    <div class="col-12 center">
                        <!-- <a href="#" class="text-light text-center"><small>Tidak Copyright</small></a> -->
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
//   export default {
//     name: 'login',
//     data() {
//       return {
//         model: {
//           email: '',
//           password: ''
//         }
//       }
//     }
//   }

import axios from "axios";

export default {
  name: "Login",
  components: {

  },
  data() {
    return {
      // user: [],
      auth: {},
    };
  },
  created(){
      if (this.$cookie.get('user_id')){
          this.$router.push({ path: this.$route.name});
          console.log(this.$route.name);
        }
    },
  methods: {
    // setUser(data) {
    //   this.user = data;
    // },
    login() {
      if (this.auth.user_mail && this.auth.user_password) {
        axios
          .post("http://localhost/be_myhotel/api/login", this.auth)
          .then((response) => {
            if (response.data != null){
              console.log(response.data.data);
              this.$cookie.set('user_id', response.data.data.user_id, { expires: '30m' });
              this.$cookie.set('user_nama', response.data.data.user_nama, { expires: '30m' });

              // this.setUser(response.data)
            this.$toast.success("Berhasil Login", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
            this.$router.push({ path: "/"});
            } else {
              this.$toast.error("Email dan Password tidak ditemukan", {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            }
            
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Email dan Password Harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  // mounted() {
  //   axios
  //     .get("http://localhost:8000/movie")
  //     .then((response) => this.setUser(response.data))
  //     .catch((error) => console.log(error));
  // }
};
</script>
<style>
</style>
