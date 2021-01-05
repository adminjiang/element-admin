<template>
  <div class="app-container">
    <div class="filter-container">
      <div>
        <el-input v-model="info" placeholder="搜索服务" style="width: 200px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
      </div>
    </div>
    <el-table :data="list" :stripe="true" style="width: 100%">
      <el-table-column width="50px" type="selection" />
      <el-table-column prop="id" label="ID" width="50px" />
      <el-table-column prop="service_name" label="服务名称" />
      <el-table-column prop="service_addr" label="服务地址" />
      <el-table-column prop="total_node" label="节点数" width="70px" />
      <el-table-column prop="load_type" label="负载类型" width="100px" />
      <el-table-column prop="qpd" label="qpd" width="50px" />
      <el-table-column prop="qps" label="qps" width="50px" />
      <el-table-column prop="service_desc" label="服务描述" />
      <el-table-column label="操作" align="center">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="warning" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="page_no" :limit.sync="listQuery.page_size" @pagination="getList" />
  </div>
</template>

<script>
import { service_list } from '@/api/service'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      total: 0,
      list: null,
      listLoading: false,
      info: null,
      page_no: 1,
      page_size: 15
    }
  },
  computed: {
    listQuery: function() {
      return {
        page_size: this.page_size,
        page_no: this.page_no,
        info: this.info
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      service_list(this.listQuery).then(response => {
        this.total = response.data.total
        this.list = response.data.list
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleFilter() {
      this.page_no = 1
      this.getList()
    }
  }
}
</script>
