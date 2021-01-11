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

                                                    <div class="form-group input-group-alternative"
                                                                addon-left-icon="ni ni-building">
                                                        <select class="form-control" v-model="model.hotel_id">
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
                                                        <input type="file" class="form-control" id="inputGroupFile01" ref="file" v-on:change="handleFileUpload()" >
                                                    </div>

                                                    <div class="text-left">
                                                        <base-button aria-label="kamar" type="submit" @click="editObjek" class="my-4">Edit Room</base-button>
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
        file: '',
      };
    },
    methods: {
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        setObjeks(data) {
            this.model = data;
        },
        editObjek() {
            let formData = new FormData();
            formData.append('objek_id', this.model.objek_id);
            formData.append('objek_nama', this.model.objek_nama);
            formData.append('objek_keterangan', this.model.objek_keterangan);
            formData.append('objek_harga', this.model.objek_harga);
            formData.append('path_foto', this.model.objek_foto);
            formData.append('file', this.file);
            if (this.model.objek_keterangan && this.model.objek_nama && this.model.objek_harga ) {
                axios
                .post("http://api.dagdigdug.my.id/admin/editObjek", formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    // this.setUser(response.data)
                    this.$toast.success("Berhasil memperbarui Objek", {
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
        axios
        .get("http://api.dagdigdug.my.id/api/objek?objek_id=" + this.$route.params.id)
        .then((response) => {
            console.log(response.data.result);
            this.setObjeks(response.data.result)})
        .catch((error) => console.log(error));
    }
  };
</script>
<style></style>
