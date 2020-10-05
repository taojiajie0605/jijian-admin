import request from 'umi-request';

export interface LoginParamsType {
  userName: string;
  password: string;
  //mobile: string;
  //captcha: string;
}
///api/checkLoginByAdmin
///api/login/account
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/checkLoginByAdmin', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
