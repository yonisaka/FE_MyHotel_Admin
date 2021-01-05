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
                          List Hotel
                        </h3>
                      </div>
                      <div class="col text-right">
                        <router-link to="/insert_hotel">
                          <base-button type="success" size="sm" ><b-icon-plus></b-icon-plus> Tambah Hotel</base-button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                    <div class="table-responsive">
                      <table class="table align-items-center table-flush">
                        <thead clas="thead-light">
                          <tr>
                            <th class="text-center">#</th>
                            <th class="text-center" colspan="">Hotel</th>
                            <th class="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody class="list">
                          <tr v-for="(row, index) in hotels" :key="row.hotel_id">
                            <th class="text-center">{{index+1}}</th>
                            <!-- <td>
                              <img
                                :src="row.hotel_foto"
                                class="img-fluid shadow mb-2"
                                width="250"
                              /> <br>
                            </td> -->
                            <td><strong>{{ row.hotel_nama }}</strong>
                                <br>
                                {{ row.hotel_alamat }}
                            </td>
        
                            <td class="text-center">
                              <!-- <button class="btn btn-sm btn-primary"> 
                                <b-icon-pencil @click="edit(row.hotel_id)"></b-icon-pencil>
                              </button> -->
                              <router-link class="btn btn-sm btn-primary" :to="'/edit_hotel/'+row.hotel_id">
                                <b-icon-pencil></b-icon-pencil>
                              </router-link>
                              <button class="btn btn-sm btn-danger"> 
                                <b-icon-trash @click="hapus(row.hotel_id)"></b-icon-trash>
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
    name: 'hotel',
    components: {
      
    },
    data() {
      return {
        hotels: [],
        hotel: {},
      }
    },
    methods: { 
      setHotels(data) {
        this.hotels = data;
      },
      hapus(id) {
        this.hotel.hotel_id = id;
        console.log(this.hotel);
        axios
          .post("http://localhost/be_myhotel/admin/hotelDelete", this.hotel)
          .then(() => {
            this.$toast.error("Sukses Hapus Hotel", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });

            // Update Data objek
            axios
            .get("http://localhost/be_myhotel/admin/hotel")
            .then((response) => {
              console.log(response.data.result)
              this.setHotels(response.data.result)})
            .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      }
    },
    mounted() {
      axios
        .get("http://localhost/be_myhotel/admin/hotel")
        .then((response) => {
          console.log(response.data.result)
          this.setHotels(response.data.result)})
        .catch((error) => console.log(error));
    },
  };
</script>
<style></style>
