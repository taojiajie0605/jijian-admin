import request from 'umi-request';
//${Contants.baseUrlone}/api/login/account
export async function fakeSubmitForm(params: any) {
  return request('/api/addUser', {
    method: 'POST',
    data: params,
  });
}
