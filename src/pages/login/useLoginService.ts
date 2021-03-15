import { fetchLogin } from './service';
import { useRequest } from 'umi';
import { Form } from 'antd';

export const useLoginService = () => {
  const [form] = Form.useForm();
  const loginRequest = useRequest(fetchLogin, { manual: true });

  const handleLogin = (values) => {
    loginRequest.run(values);
  };

  return {
    form,
    loading: loginRequest.loading,
    handleLogin
  };
};
