import { Layout } from 'antd';
import { LOGO_URL } from '@/config';
import { GlobalFooter } from '@/components/Footer';
import type { IRouteComponentProps } from 'umi';
import styles from './index.less';

const { Content } = Layout;

export default function SignInLayout(props: IRouteComponentProps) {
  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.bg} />
        <div className={styles.wrap}>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: 40
            }}
          >
            <img
              style={{
                height: '44px',
                marginRight: 16
              }}
              alt="logo"
              src={LOGO_URL}
            />
            九毛科技
          </h1>
          {props.children}
        </div>
      </Content>
      <GlobalFooter className={styles.footer} />
    </Layout>
  );
}
