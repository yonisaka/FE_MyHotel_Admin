<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-orange"
                                sub-title="2,356"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow"
                        :class="type === 'dark' ? 'bg-default': ''">
                        <div class="card-header border-0"
                            :class="type === 'dark' ? 'bg-transparent': ''">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                            Masukan Data
                                        </h3>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="card-body px-lg-5 py-lg-5">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h3 class="mb-2" :class="type === 'dark' ? 'text-white': ''">
                                                        Data Hotel
                                                    </h3>
                                                </div>
                                            </div>
                                                <form aria-label="hotel" role="forma" v-on:submit.prevent>
                                                    <base-input class="input-group-alternative mb-3"
                                                                placeholder="Nama Hotel"
                                                                addon-left-icon="ni ni-building"
                                                                v-model="model.hotel_nama"
                                                                >
                                                    </base-input>
                                                    <div class="input-group-alternative mb-4">
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                                                                                    placeholder="Keterangan"
                                                                                    v-model="model.hotel_alamat"></textarea>
                                                    </div>
                                                    <div class="text-left">
                                                        <base-button type="submit" @click="addHotel" class="my-4">Add Hotel</base-button>
                                                    </div>
                                                </form>
                                            </div>
                                    </div>

                                    <!-- Separator -->
                                   

                                    <div class="col-6">
                                        <div class="card-body px-lg-5 py-lg-5">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h3 class="mb-2" :class="type === 'dark' ? 'text-white': ''">
                                                        Data Kamar
                                                    </h3>
                                                </div>
                                            </div>
                                                <form aria-label="kamar" role="form" v-on:submit.prevent>
                                                    <base-input class="input-group-alternative mb-3"
                                                                placeholder="Nama Kamar"
                                                                addon-left-icon="ni ni-building"
                                                                v-model="model.objek_nama"
                                                                >
                                                    </base-input>

                                                    <div class="form-group input-group-alternative"
                                                                addon-left-icon="ni ni-building">
                                                        <select class="form-control" id="exampleFormControlSelect1"  v-model="model.hotel_id">
                                                        <option class="dropdown-item">1</option>
                                                        <option class="dropdown-item">2</option>
                                                        <option class="dropdown-item">3</option>
                                                        <option class="dropdown-item">4</option>
                                                        <option class="dropdown-item">5</option>
                                                        </select>
                                                    </div>

                                                    <div class="input-group-alternative mb-4">
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                                                                                    placeholder="Keterangan"
                                                                                    v-model="model.objek_keterangan"></textarea>
                                                    </div>

                                                    <base-input class="input-group-alternative"
                                                                placeholder="Harga"
                                                                addon-left-icon="ni ni-money-coins"
                                                                v-model="model.objek_harga"
                                                                >
                                                    </base-input>

                                                    <div class="input-group mb-3">
                                                        <label class="input-group-text" for="inputGroupFile01">Upload Foto</label>
                                                        <input type="file" class="form-control" id="inputGroupFile01" v-on:change="model.file" >
                                                    </div>

                                                    <div class="text-left">
                                                        <base-button aria-label="kamar" type="submit" @click="addObjek" class="my-4">Add Room</base-button>
                                                    </div>
                                                </form>
                                            </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import axios from "axios";

  export default {
    components: {

    },
    data() {
      return {
          model:{
              objek_jenis : "hotel"
          }
        
      };
    },
    methods: {
        addObjek() {
            console.log(this.model.file)
            if (this.model.hotel_id && this.model.objek_keterangan && this.model.objek_nama && this.model.objek_harga && this.model.file) {
                axios
                .post("http://localhost/be_myhotel/admin/addobjek", this.model)
                .then(() => {
                    // this.setUser(response.data)
                    this.$toast.success("Berhasil menambahkan Objek", {
                    type: "success",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                    });
                    // this.$router.push({ path: "/"})
                })
                .catch((err) => console.log(err));
            } else {
                this.$toast.error("Form harus diisi", {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
                });
            }
        },

        addHotel() {
            console.log(this.model)
            if (this.model.hotel_nama && this.model.hotel_alamat) {
                axios
                .post("http://localhost/be_myhotel/admin/addhotel", this.model)
                .then(() => {
                    // this.setUser(response.data)
                    this.$toast.success("Berhasil menambahkan Objek", {
                    type: "success",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                    });
                    // this.$router.push({ path: "/"})
                })
                .catch((err) => console.log(err));
            } else {
                this.$toast.error("Form harus diisi", {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
                });
            }
        },
    },
    mounted() {
     
    }
  };
</script>
<style></style>
