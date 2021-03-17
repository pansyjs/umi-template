import { request } from 'umi';

/**
 * 获取当前登录用户信息
 */
export async function fetchCurrent() {
  return request<API.Result<API.User.Current>>('/api/user/current');
}
