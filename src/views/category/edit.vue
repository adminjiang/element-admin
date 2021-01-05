<template>
  <div class="dashboard-editor-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" style="max-width: 400px" />
        </el-form-item>
        <el-form-item label="文件名">
          <el-input v-model="form.file_name" style="max-width: 400px" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title" style="max-width: 400px" />
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="form.pid" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="!item.hasChildren"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="form.keywords" style="max-width: 400px" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" style="max-width: 400px" />
        </el-form-item>
        <el-form-item label="广告包ID">
          <el-input v-model="form.package_id" style="max-width: 400px" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="createCategory">提交发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { list, add } from '@/api/category'
export default {
  data() {
    return {
      form: {
        name: '',
        file_name: '',
        title: '',
        keywords: '',
        pid: null,
        description: '',
        package_id: null,
        type: 0
      },
      loading: false,
      type: '',
      title: '',
      categoryList: [],
      categoryId: ''
    }
  },
  created() {
    this.type = this.$route.meta.type
    this.getCategoryList()
    // 处理分类
    switch (this.type) {
      case 'article':
        this.title = '文章分类添加'
        this.form.type = 1
        break
      case 'app':
        this.title = '文章分类添加'
        break
      case 'xcx':
        this.title = '文章分类添加'
        this.form.type = 10
        break
      default:
        this.title = ''
        break
    }
  },
  methods: {
    createCategory() {
      this.loading = true
      add(this.form).catch(response => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getCategoryList() {
      list({ type: this.type }).then(response => {
        this.categoryList = response.data
      })
    },
    changeType(val) {
      this.categoryList.forEach((v, k) => {
        if (v.id === val) {
          this.form.type = v.type
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>
