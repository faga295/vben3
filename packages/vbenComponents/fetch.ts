import { isFunction } from '@vben/utils'
import { error } from './index'
export interface FetchProps {
  api?: Function
  params?: Object
  afterFetch?: Function
  immediate?: boolean
  value?: object
  options?: Array<any>
}
// 请求props定义
export const fetchProps = {
  api: {
    type: Function,
    default: null,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    default: undefined,
  },
  value: {
    type: String,
    default: '',
  },
}
// 请求获取数据
export async function fetch(props, o) {
  const { api, params, options } = props
  // 有options 不请求 直接使用options
  if (options) {
    o.value = options
    return
  }
  if (!api) return
  if (!isFunction(api)) {
    // 传入函数
    // 正确 api 错误 api()
    error('api不是函数')
    return
  }
  const res = await api(params)
  o.value = res.options
}
