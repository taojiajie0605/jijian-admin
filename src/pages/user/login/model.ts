import { Effect, history, Reducer } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import { fakeAccountLogin } from './service';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  // hard code
  // reload Authorized component
  try {
    if ((window as any).reloadAuthorized) {
      (window as any).reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndlogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        window.sessionStorage.setItem("currentUser", payload.userName);
        window.sessionStorage.setItem("currentUserName", response.name);
        //console.log('currentUserName: ', response.name);
        //console.log('currentUser: ', payload.userName);
        message.success('登录成功！');
        const urlParams = new URL(window.location.href);
        //console.log('收到的window.location.href: ', window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        //console.log('收到的redirect: ', redirect);
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

    /**getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },*/
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.msg,  
        //type: payload.type,
      };
    },
  },
};

export default Model;
