<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Transaksi"
                                type="gradient-green"
                                v-bind:sub-title="transaksi"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total User"
                                type="gradient-red"
                                v-bind:sub-title="user"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Objek"
                                type="gradient-orange"
                                v-bind:sub-title="objek"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Hotel"
                                type="gradient-info"
                                v-bind:sub-title="hotel"
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
                    <projects-table title="Light Table"></projects-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import axios from "axios";
  import ProjectsTable from './Tables/ProjectsTable'
  export default {
    components: {
      ProjectsTable
    },
    data() {
      return {
        transaksi: '',
        user: '',
        objek: '',
        hotel: '',
      };
    },
    methods: {
        setTotalTransaksi(data) {
            this.transaksi = data;
        },
        setTotalUser(data) {
            this.user = data;
        },
        setTotalObjek(data) {
            this.objek = data;
        },
        setTotalHotel(data) {
            this.hotel = data;
        },
    },
    mounted() {
        axios
        .get("http://localhost/be_myhotel/admin/totalTransaksi")
        .then((response) => {
          console.log(response.data.result)
          this.setTotalTransaksi(response.data.result)})
        .catch((error) => console.log(error));
        axios
        .get("http://localhost/be_myhotel/admin/totalUser")
        .then((response) => {
          console.log(response.data.result)
          this.setTotalUser(response.data.result)})
        .catch((error) => console.log(error));
        axios
        .get("http://localhost/be_myhotel/admin/totalObjek")
        .then((response) => {
          console.log(response.data.result)
          this.setTotalObjek(response.data.result)})
        .catch((error) => console.log(error));
        axios
        .get("http://localhost/be_myhotel/admin/totalHotel")
        .then((response) => {
          console.log(response.data.result)
          this.setTotalHotel(response.data.result)})
        .catch((error) => console.log(error));
    }
  };
</script>
<style></style>
