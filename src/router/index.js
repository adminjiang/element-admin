import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    meta: { title: '文章管理', icon: 'el-icon-document', affix: false },
    children: [
      {
        path: 'list',
        component: () => import('@/views/article/index'),
        name: '文章列表',
        meta: { title: '文章列表', icon: 'list', affix: false }
      },
      {
        path: 'add',
        component: () => import('@/views/article/index'),
        name: '文章添加',
        meta: { title: '文章添加', icon: 'el-icon-folder-add', affix: false }
      },
      {
        path: 'category_list',
        component: () => import('@/views/category/index'),
        name: '文章分类',
        meta: { title: '文章分类', icon: 'el-icon-document', affix: false, type: 'article' }
      },
      {
        path: 'category_add',
        component: () => import('@/views/category/add'),
        name: '文章分类添加',
        meta: { title: '文章分类添加', icon: 'el-icon-folder-add', affix: false, type: 'article' }
      }
    ]
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/list',
    meta: { title: '应用管理', icon: 'el-icon-set-up', affix: false },
    children: [
      {
        path: 'list',
        component: () => import('@/views/app/index'),
        name: '应用列表',
        meta: { title: '应用列表', icon: 'list', affix: false }
      },
      {
        path: 'add',
        component: () => import('@/views/article/index'),
        name: '应用添加',
        meta: { title: '应用添加', icon: 'el-icon-folder-add', affix: false }
      },
      {
        path: 'category_list',
        component: () => import('@/views/category/index'),
        name: '应用分类',
        meta: { title: '应用分类', icon: 'el-icon-document', affix: false, type: 'app' }
      },
      {
        path: 'category_add',
        component: () => import('@/views/category/add'),
        name: '应用分类添加',
        meta: { title: '应用分类添加', icon: 'el-icon-folder-add', affix: false, type: 'app' }
      }
    ]
  },
  {
    path: '/xcx',
    component: Layout,
    redirect: '/xcx/list',
    meta: { title: '小程序管理', icon: 'el-icon-mobile', affix: false },
    children: [
      {
        path: 'list',
        component: () => import('@/views/xcx/index'),
        name: '小程序列表',
        meta: { title: '小程序列表', icon: 'list', affix: false }
      },
      {
        path: 'add',
        component: () => import('@/views/xcx/index'),
        name: '小程序添加',
        meta: { title: '小程序添加', icon: 'el-icon-folder-add', affix: false }
      },
      {
        path: 'category_list',
        component: () => import('@/views/category/index'),
        name: '小程序分类',
        meta: { title: '小程序分类', icon: 'el-icon-document', affix: false, type: 'xcx' }
      },
      {
        path: 'category_add',
        component: () => import('@/views/category/add'),
        name: '小程序分类添加',
        meta: { title: '小程序分类添加', icon: 'el-icon-folder-add', affix: false, type: 'xcx' }
      }
    ]
  },
  {
    path: '/zt',
    component: Layout,
    redirect: '/zt/list',
    meta: { title: '专题管理', icon: 'el-icon-video-camera', affix: false },
    children: [
      {
        path: 'list',
        component: () => import('@/views/zt/index'),
        name: '专题列表',
        meta: { title: '专题列表', icon: 'list', affix: false }
      },
      {
        path: 'add',
        component: () => import('@/views/zt/index'),
        name: '专题添加',
        meta: { title: '专题添加', icon: 'el-icon-folder-add', affix: false }
      }
    ]
  },
  {
    path: '*', // 此处需特别注意置于最底部
    redirect: '/404'
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
