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
                      <div class="col-md-6">
                        <h3 class="mb-0 dark">
                          List Objek
                        </h3>
                      </div>
                      <div class="col-md-4">
                        <base-input placeholder="Cari Objek" 
                        v-model="search"
                        @keyup="searchObjek"
                        class="mb-0" 
                        addon-right-icon="ni ni-zoom-split-in"
                        ></base-input>
                      </div>
                      <div class="col text-right">
                        <router-link to="/insert_objek">
                          <base-button type="success" size="sm" ><b-icon-plus></b-icon-plus> Tambah Objek</base-button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                    <div class="table-responsive">
                      <table class="table align-items-center table-flush">
                        <thead clas="thead-light">
                          <tr>
                            <th class="text-center">#</th>
                            <th class="text-center" colspan="2">Room</th>
                            <th class="text-center">Jenis</th>
                            <th class="text-center">Harga</th>
                            <th class="text-center">Status</th>
                            <th class="text-center"></th>
                          </tr>
                        </thead>
                        <tbody class="list">
                          <tr v-for="(row, index) in objeks" :key="row.objek_id">
                            <th>{{index+1}}</th>
                            <td>
                              <img
                                :src="row.objek_foto"
                                class="img-fluid shadow mb-2"
                                width="250"
                              /> <br>
                            </td>
                            <td><strong>{{ row.objek_nama }}</strong><br>
                                {{ row.objek_keterangan }}
                            </td>
                            <td class="text-center">{{ row.objek_jenis }}</td>
                            <td align="right">Rp. {{ formatPrice(row.objek_harga) }} </td>
                            <td align="right">
                              <strong>{{ row.objek_status }}</strong>
                            </td>
                            <td class="text-center">
                              <!-- <button class="btn btn-sm btn-primary"> 
                                <b-icon-pencil @click="edit(row.objek_id)"></b-icon-pencil>
                              </button> -->
                              <router-link class="btn btn-sm btn-primary" :to="'/edit_objek/'+row.objek_id">
                                <b-icon-pencil></b-icon-pencil>
                              </router-link>
                              <button class="btn btn-sm btn-danger"> 
                                <b-icon-trash @click="hapus(row.objek_id)"></b-icon-trash>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
    name: 'objek',
    components: {
      
    },
    data() {
      return {
        objeks: [],
        objek: {},
        search: '',
      }
    },
    methods: { 
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      setObjeks(data) {
        this.objeks = data;
      },
      searchObjek() {
        axios
        .get("http://localhost/be_myhotel/api/objek?objek_nama="+this.search)
        .then((response) => this.setObjeks(response.data.result))
        .catch((error) => console.log(error));
      },
      hapus(id) {
        this.objek.objek_id = id;
        console.log(this.objek);
        axios
          .post("http://localhost/be_myhotel/admin/objekDelete", this.objek)
          .then(() => {
            this.$toast.error("Sukses Hapus Objek", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });

            // Update Data objek
            axios
            .get("http://localhost/be_myhotel/api/objek")
            .then((response) => {
              console.log(response.data.result)
              this.setObjeks(response.data.result)})
            .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      }
    },
    mounted() {
      axios
        .get("http://localhost/be_myhotel/api/objek")
        .then((response) => {
          console.log(response.data.result)
          this.setObjeks(response.data.result)})
        .catch((error) => console.log(error));
    },
  };
</script>
<style></style>
