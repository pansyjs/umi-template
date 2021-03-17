import { request } from 'umi';

export async function fetchLogin(data: API.User.LoginParams) {
  return request<API.Result<API.User.LoginResult>>(`/api/user/login`, { method: 'post', data });
}
