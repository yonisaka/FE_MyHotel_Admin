<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                  <div class="card shadow dark">
                  <div class="card-header border-0 dark">
                    <div class="row align-items-center">
                      <div class="col">
                        <h3 class="mb-0 dark">
                          List Objek
                        </h3>
                      </div>
        
                    </div>
                  </div>
                    <div class="table-responsive">
                      <base-table class="table align-items-center table-flush"
                                  :thead-classes="'thead-light'"
                                  tbody-classes="list"
                                  :data="tableData">
                        <template slot="columns">
                          <th class="text-center">Room</th>
                          <th class="text-center">Jenis</th>
                          <th class="text-center">Harga</th>
                          <th class="text-center">Status</th>
                          <th class="text-center"></th>
                        </template>

                        <template slot-scope="{row}">
                          <th scope="row">
                            <div class="media align-items-center">
                              <a href="#" class="avatar rounded-circle mr-3">
                                <img alt="Image placeholder" :src="row.img">
                              </a>
                              <div class="media-body">
                                <span class="name mb-0 text-sm">{{row.title}}</span>
                              </div>
                            </div>
                          </th>
                          <td class="text-center"> Jenis </td>
                          <td class="budget text-center">
                            {{row.budget}}
                          </td>
                          <td class="text-center">
                            <badge class="badge-dot mr-4" :type="row.statusType">
                              <i :class="`bg-${row.statusType}`"></i>
                              <span class="status">{{row.status}}</span>
                            </badge>
                          </td>
                          <td class="text-center">
                            <button class="btn btn-sm btn-primary"> 
                              <b-icon-pencil @click="edit(row.objek_id)"></b-icon-pencil>
                            </button>
                            <button class="btn btn-sm btn-danger"> 
                              <b-icon-trash @click="hapus(row.objek_id)"></b-icon-trash>
                            </button>
                          </td>
                        </template>
                      </base-table>
                    </div>
                  </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  // import ProjectsTable from './Tables/ProjectsTable'
  export default {
    name: 'objek',
    components: {
      // ProjectsTable
    },
    data() {
      return {
        tableData: [
          {
            img: 'img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'img/theme/react.jpg',
            title: 'React Material Dashboard',
            budget: '$4400 USD',
            status: 'on schedule',
            statusType: 'info',
            completion: 90
          },
          {
            img: 'img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          }
        ]
      }
    }
  };
</script>
<style></style>
