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
            <!-- <div class="row"> -->
                <!-- <div class="col">
                    <projects-table title="Light Table"></projects-table>
                </div> -->
                <card type="default" header-classes="bg-transparent">
                    <div slot="header" class="row align-items-center">
                        <div class="col">
                            <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                            <h5 class="h3 text-white mb-0">Jumlah Transaksi / Daily</h5>
                        </div>
                        <div class="col">
                            <ul class="nav nav-pills justify-content-end">
                                <!-- <li class="nav-item mr-2 mr-md-0">
                                    <a class="nav-link py-2 px-3"
                                      href="#"
                                      :class="{active: bigLineChart.activeIndex === 0}"
                                      @click.prevent="initBigChart(0)">
                                        <span class="d-none d-md-block">Month</span>
                                        <span class="d-md-none">M</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link py-2 px-3"
                                      href="#"
                                      :class="{active: bigLineChart.activeIndex === 1}"
                                      @click.prevent="initBigChart(1)">
                                        <span class="d-none d-md-block">Week</span>
                                        <span class="d-md-none">W</span>
                                    </a>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                    <line-chart
                            :height="300"
                            ref="bigChart"
                            :chart-data="bigLineChart.chartData"
                            :extra-options="bigLineChart.extraOptions"
                    >
                    </line-chart>

                </card>
            </div>
        <!-- </div> -->

    </div>
</template>
<script>
  import axios from "axios";
  // import ProjectsTable from './Tables/ProjectsTable'

  //charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  export default {
    components: {
      // ProjectsTable
      LineChart
    },
    data() {
      return {
        transaksi: '',
        user: '',
        objek: '',
        hotel: '',
        count:[],
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        }
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
        initBigChart(label, result) {
          let chartData = {
            datasets: [
              {
                label: 'Jumlah Transaksi',
                data: result
              }
            ],
            labels: label,
          };
          this.bigLineChart.chartData = chartData;
          this.bigLineChart.activeIndex = result;
        }
    },
    mounted() {
        axios
        .get("http://localhost/BE_Myhotel/index.php/admin/totalTransaksi")
        .then((response) => {
          console.log(response.data.result)
          this.setTotalTransaksi(response.data.result)})
        .catch((error) => console.log(error));

        axios
        .get("http://localhost/BE_Myhotel/index.php/admin/totalUser")
        .then((response) => {
          console.log(response.data.result)
          this.setTotalUser(response.data.result)})
        .catch((error) => console.log(error));

        axios
        .get("http://localhost/BE_Myhotel/index.php/admin/totalObjek")
        .then((response) => {
          console.log(response.data.result)
          this.setTotalObjek(response.data.result)})
        .catch((error) => console.log(error));
        
        axios
        .get("http://localhost/BE_Myhotel/index.php/admin/totalHotel")
        .then((response) => {
          console.log(response.data.result)
          this.setTotalHotel(response.data.result)})
        .catch((error) => console.log(error));

        axios
        .get("http://localhost/BE_Myhotel/index.php/admin/chartday")
        .then((response) => {
                console.log(response.data)
                this.initBigChart(response.data.label, response.data.result);
                // this.setTotalHotel(response.data.result)
                }
              )
        .catch((error) => console.log(error));

    }
  };
</script>
<style></style>
