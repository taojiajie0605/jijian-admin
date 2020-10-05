import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    /*const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }*/
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props;
    //console.log('收到的children: ', children);
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    //const isLogin = currentUser && currentUser.userid;
    const isLogin = window.sessionStorage.getItem('currentUser');
    //console.log('收到的isLogin: ', isLogin);
    console.log('未定义的session: ', window.sessionStorage.getItem('key'));
    const queryString = stringify({
      redirect: window.location.href,
    });
    if ((!isLogin && loading) || !isReady) {
      console.log('进到了第一个if: ');
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      console.log('进到了第二个if: ');
      //console.log('收到的window.location.pathname: ', window.location.pathname);
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
