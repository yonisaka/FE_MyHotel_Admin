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
                          List Transaksi
                        </h3>
                      </div>
                    </div>
                  </div>
                    <div class="table-responsive">
                      <table class="table align-items-center table-flush">
                        <thead clas="thead-light">
                          <tr>
                            <th class="text-center">#</th>
                            <th class="text-center">Transaksi Nomor</th>
                            <th class="text-center">Tanggal</th>
                            <th class="text-center">Total Harga</th>
                            <th class="text-center">Status</th>
                            <th class="text-center"></th>
                          </tr>
                        </thead>
                        <tbody class="list">
                          <tr v-for="(row, index) in transaksi" :key="row.transaksi_id">
                            <th class="text-center">{{index+1}}</th>
                            <td class="text-center">
                                <strong>{{ row.transaksi_no }}</strong>
                            </td>
                            <td class="text-center">
                                {{ row.transaksi_tanggal }}
                            </td>
                            <td class="text-center">Rp. {{ formatPrice(row.transaksi_harga) }} </td>
                            <td class="text-center">
                              <span v-if="row.transaksi_status === 'paid'" class="badge badge-success">
                                  {{ row.transaksi_status|upper }}
                              </span>
                              <span v-else-if="row.transaksi_status === 'waiting'" class="badge badge-warning">                
                                  {{ row.transaksi_status|upper }}
                              </span>
                              <span v-else class="badge badge-danger">
                                  {{ row.transaksi_status|upper }}
                              </span>
                            </td>
                            <td class="text-center">
                              <button class="btn btn-sm btn-success"> 
                                <b-icon-check @click="paid(row.transaksi_id)"></b-icon-check>
                              </button>
                              <button class="btn btn-sm btn-warning"> 
                                <b-icon-x @click="cancel(row.transaksi_id)"></b-icon-x>
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
    name: 'transaksi',
    components: {
      
    },
    data() {
      return {
        transaksi: [],
        trans: {},
      }
    },
    methods: { 
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      setTransaksi(data) {
        this.transaksi = data;
      },
      cancel(id) {
      this.trans.transaksi_id = id;
      this.trans.transaksi_status = 'canceled';
      axios
        .post("http://localhost/be_myhotel/api/transaksiUpdateSt", this.trans)
        .then(() => {
          this.$toast.error("Sukses Membatalkan Transaksi", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          // Update Data Transaksi
          axios
            .get("http://localhost/be_myhotel/api/transaksi")
            .then((response) => this.setTransaksi(response.data.result))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    paid(id) {
      this.trans.transaksi_id = id;
      this.trans.transaksi_status = 'paid';
      axios
        .post("http://localhost/be_myhotel/api/transaksiUpdateSt", this.trans)
        .then(() => {
          this.$toast.error("Sukses Melakukan Transaksi", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });

          // Update Data Transaksi
          axios
            .get("http://localhost/be_myhotel/api/transaksi")
            .then((response) => this.setTransaksi(response.data.result))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    },
    mounted() {
      axios
        .get("http://localhost/be_myhotel/api/transaksi")
        .then((response) => {
          console.log(response.data.result)
          this.setTransaksi(response.data.result)})
        .catch((error) => console.log(error));
    },
  };
</script>
<style></style>
