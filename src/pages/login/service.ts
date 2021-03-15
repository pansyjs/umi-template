import { request } from 'umi';

export async function fetchLogin(data: any) {
  return request(`/api/user/login`, { method: 'post', data });
}
