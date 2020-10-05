import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitRegularForm: Effect;
  };

  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}
const Model: ModelType = {
  namespace: 'formAndbasicForm',

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call,put }) {
      const response = yield call(fakeSubmitForm, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      console.log(response.msg);
      message.success(response.msg);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.msg,  
        //type: payload.type,
      };
    },
  },
};

export default Model;
