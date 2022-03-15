import CommonSider from './sider';
import Head from 'next/head';
import { Layout } from 'antd';
const { Header, Content } = Layout;

export default function CommonLayout({ children }) {
  return (
    <Layout>
      <Head>
        <title>Poap助手</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommonSider>Sider</CommonSider>
      <Layout style={{ marginLeft: 200 }}>
        {/* <Header>Header</Header> */}
        <Content style={{ margin: '24px 16px 0', minHeight: '100vh', background: '#fff' }}>{children}</Content>
      </Layout>
    </Layout>
  )
}