import request from '@/utils/request'

export function queryTableData(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
