import Layout from '@/layout'
const vueRouter = {
  path: '/todoList',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('../view/list'),
      name: '任务列表',
      meta: { title: '任务列表' }
    }
  ]
}
export default vueRouter
