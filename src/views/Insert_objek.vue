<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
          
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow dark">
                        <div class="card-header border-0 dark">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h3 class="mb-0 dark">
                                            <router-link to="/objek">
                          <base-button type="success" icon="ni ni-bold-left" size="sm" ></base-button>
                          </router-link> 
                                            Masukan Data
                                        </h3>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="card-body px-lg-5 py-lg-5">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h3 class="mb-2 dark">
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

                                                    <base-input class="input-group-alternative mb-3"
                                                                addon-left-icon="ni ni-building"
                                                                >
                                                                <select class="form-control" v-model="model.hotel_id">
                                                                    <option :selected="model.hotel_id">Pilih Hotel</option>
                                                        <option class="dropdown-item"
                                                        v-for="(row) in hotels" :key="row.hotel_id"
                                                        :value="row.hotel_id">{{row.hotel_nama}}</option>
                                                        
                                                        </select>
                                                    </base-input>

                                                    <base-input class="input-group-alternative"
                                                                addon-left-icon="ni ni-paper-diploma"
                                                                >
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                                                                                    placeholder="Keterangan"
                                                                                    v-model="model.objek_keterangan"></textarea>
                                                    </base-input>
                                                    <base-input class="input-group-alternative"
                                                                placeholder="Harga"
                                                                addon-left-icon="ni ni-money-coins"
                                                                v-model="model.objek_harga"
                                                                >
                                                    </base-input>
                                                    <!-- <base-input class="input-group-alternative"
                                                                placeholder="Jenis"
                                                                addon-left-icon="ni ni-tag"
                                                                v-model="model.objek_jenis"
                                                                >
                                                    </base-input> -->
                                                    <div class="ml-2 my-3">
                                                    <div class="form-check form-check-inline">
                                                        <input type="radio" class="form-check-input" id="hotel" value="hotel" v-model="model.objek_jenis">
                                                        <label class="form-check-label" for="hotel">Hotel</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input type="radio" class="form-check-input" id="auditorium" value="auditorium" v-model="model.objek_jenis">
                                                        <label class="form-check-label" for="auditorium">Auditorium</label>
                                                    </div>
                                                    </div>
                                                    <base-input class="input-group-alternative"
                                                                addon-left-icon="ni ni-camera-compact"
                                                                >
                                                                <input type="file" class="form-control" id="inputGroupFile01" ref="file" v-on:change="handleFileUpload()" >
                                                    </base-input>
                                                    <!-- <div class="input-group mb-3">
                                                        <label class="input-group-text" for="inputGroupFile01">Upload Foto</label>
                                                        <input type="file" class="form-control" id="inputGroupFile01" ref="file" v-on:change="handleFileUpload()" >
                                                    </div> -->

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
            
        },
        hotels: [],        
        file: '',
        selected:"Pilih Hotel"
      };
    },
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        setHotels(data) {
            this.hotels = data;
        },
        addObjek() {
            let formData = new FormData();
            formData.append('hotel_id', this.model.hotel_id);
            formData.append('objek_nama', this.model.objek_nama);
            formData.append('objek_keterangan', this.model.objek_keterangan);
            formData.append('objek_harga', this.model.objek_harga);
            formData.append('objek_jenis', this.model.objek_jenis);
            formData.append('file', this.file);

            if (this.model.hotel_id && this.model.objek_keterangan && this.model.objek_nama && this.model.objek_harga ) {
                axios
                .post("http://localhost/BE_Myhotel/index.php/admin/addObjek", formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    // this.setUser(response.data)
                    this.$toast.success("Berhasil menambahkan Objek", {
                    type: "success",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                    });
                    this.$router.push({ path: "/objek"})
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
        axios
        .get("http://localhost/BE_Myhotel/index.php/admin/hotel")
        .then((response) => {
        console.log(response.data.result)
        this.setHotels(response.data.result)})
        .catch((error) => console.log(error));
    }
  };
</script>
<style></style>
