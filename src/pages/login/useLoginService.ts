import { useRequest, useHistory, useModel } from 'umi';
import { Form } from 'antd';
import { setToken } from '@/utils/token';
import { fetchLogin } from './service';

export const useLoginService = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const loginRequest = useRequest(fetchLogin, { manual: true });

  const handleLogin = (values) => {
    loginRequest.run(values).then(async (data) => {
      if (data?.token) {
        setToken(data.token);
        const currentUser = await initialState.fetchUserInfo();
        setInitialState({
          ...initialState,
          currentUser
        });
        history.push(`/`);
      }
    });
  };

  return {
    form,
    loading: loginRequest.loading,
    handleLogin
  };
};
