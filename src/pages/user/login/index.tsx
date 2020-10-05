//import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import { LoginParamsType } from './service';
import LoginFrom from './components/Login';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch;
  userAndlogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userAndlogin = {}, submitting } = props;
  const { status } = userAndlogin;
  //console.log({status});
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('1');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    console.log({values});
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
        type,
      },
    });
  };
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
          {status === '账号或密码错误，请重新输入' && !submitting && (
            <LoginMessage content="账号或密码错误，请重新输入" />
          )}
          {status === '账号不存在' && !submitting && (
            <LoginMessage content="账号不存在" />
          )}
          <UserName
            name="userName"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请正确输入账号!',
                /*type:'number',
                    transform(value) {
                      if(value){
                        return Number(value);
                      }
                    },*/
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />

        <Submit loading={submitting}>登录</Submit>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            记住我
          </Checkbox>
          <Link className={styles.register}
          style={{float: 'right',}} to="/user/register">
            忘记密码
          </Link>
        </div>

      </LoginFrom>
    </div>
  );
};

export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)(Login);
