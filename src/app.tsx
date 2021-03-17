import { history, RequestConfig } from 'umi';
import { ResponseError } from 'umi-request';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { GlobalFooter } from '@/components/Footer';
import { LOGO_URL, NO_LOGIN_WHITELIST } from '@/config';
import { removeToken, getToken } from '@/utils/token';
import { fetchCurrent } from '@/services/global';

// https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState(): Promise<{
  currentUser?: API.User.Current;
  fetchUserInfo: () => Promise<API.User.Current>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { data } = await fetchCurrent();
      return data;
    } catch (error) {
      history.push('/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (NO_LOGIN_WHITELIST.indexOf(history.location.pathname) === -1) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser
    };
  }
  return {
    fetchUserInfo
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout = ({
  initialState
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    menuHeaderRender: undefined,
    siderWidth: 240,
    logo: LOGO_URL,
    footerRender: () => {
      return <GlobalFooter />;
    }
  };
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  errorHandler: (error: ResponseError) => {
    const httpCode = error?.response?.status;

    // 登录过期
    if (httpCode === 401) {
      removeToken();
      history.replace('/login');
      return;
    }

    throw error;
  },
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.code === 200,
        errorMessage: resData.message
      };
    }
  },
  requestInterceptors: [
    (url, options) => {
      const token = getToken();
      // token 不存在，则跳转到登录页面
      if (!token) {
        removeToken();
        history.replace('/login');
      }
      return {
        url: `${url}`,
        options: {
          ...options,
          headers: {
            ...options.headers,
            authorization: `Bearer ${token}`
          }
        }
      };
    }
  ]
};
