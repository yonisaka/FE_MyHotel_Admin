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
                            <th>{{index+1}}</th>
                            <td>
                                <strong>{{ row.transaksi_no }}</strong>
                            </td>
                            <td>
                                {{ row.transaksi_tanggal }}
                            </td>
                            <td align="right">Rp. {{ formatPrice(row.transaksi_harga) }} </td>
                            <td align="right">
                              <strong>{{ row.transaksi_status }}</strong>
                            </td>
                            <td class="text-center">
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
      setObjeks(data) {
        this.objeks = data;
      },
      
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
