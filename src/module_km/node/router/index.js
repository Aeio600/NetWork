import Layout from '@/layout'
const vueRouter = {
  path: '/vue',
  component: Layout,
  alwaysShow: true,
  redirect: '/vue/basic',
  name: 'vueBasic',
  meta: {
    title: 'Vue'
  },
  children: [
    {
      path: 'basic',
      component: () => import('../view/vueBasic'),
      name: 'basic',
      meta: { title: '基础知识点' }
    }
  ]
}
export default vueRouter
