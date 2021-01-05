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
    <el-table lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :load="load" row-key="id" :data="list" :stripe="true" style="width: 100%">
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="file_name" label="文件名" />
      <el-table-column prop="type" label="分类类型" />
      <el-table-column label="操作" align="center">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="warning" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { list, childListByPid } from '@/api/category'
import waves from '@/directive/waves' // waves directive

export default {
  directives: { waves },
  data() {
    return {
      list: [],
      listLoading: false,
      info: null,
      type: null
    }
  },
  created() {
    this.type = this.$route.meta.type
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list({ info: this.info, type: this.type }).then(response => {
        this.list = response.data
        this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    load(tree, treeNode, resolve) {
      childListByPid({ pid: tree.id, type: this.type }).then(response => {
        resolve(
          response.data
        )
      })
    }
  }
}
</script>
