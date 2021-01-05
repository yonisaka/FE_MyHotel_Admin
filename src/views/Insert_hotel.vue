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
                                                        Data Hotel
                                                    </h3>
                                                </div>
                                            </div>
                                                <form aria-label="kamar" role="form" v-on:submit.prevent>
                                                    <base-input class="input-group-alternative mb-3"
                                                                placeholder="Nama Hotel"
                                                                addon-left-icon="ni ni-building"
                                                                v-model="model.hotel_nama"
                                                                >
                                                    </base-input>

                                                    <base-input class="input-group-alternative"
                                                                addon-left-icon="ni ni-pin-3"
                                                                >
                                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                                                                                    placeholder="Alamat"
                                                                                    v-model="model.hotel_alamat"></textarea>
                                                    </base-input>

                                                    <!-- <div class="input-group mb-3">
                                                        <label class="input-group-text" for="inputGroupFile01">Upload Foto</label>
                                                        <input type="file" class="form-control" id="inputGroupFile01" ref="file" v-on:change="handleFileUpload()" >
                                                    </div> -->

                                                    <div class="text-left">
                                                        <base-button aria-label="kamar" type="submit" @click="addHotel" class="my-4">Add Hotel</base-button>
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
      };
    },
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        addHotel() {
            let formData = new FormData();
            formData.append('hotel_nama', this.model.hotel_nama);
            formData.append('hotel_alamat', this.model.hotel_alamat);
            // formData.append('file', this.file);

            if (this.model.hotel_nama && this.model.hotel_alamat) {
                axios
                .post("http://localhost/be_myhotel/admin/addHotel", formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    // this.setUser(response.data)
                    this.$toast.success("Berhasil menambahkan Hotel", {
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
