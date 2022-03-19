import { Layout, Menu } from 'antd';
import {
  WalletOutlined,
  GiftOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

export default function CommonSider() {
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<WalletOutlined />}>
            <Link href="/">
              钱包生成
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<GiftOutlined />}>
            <Link href="/poap">
              Poap助手
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MessageOutlined />}>
            <Link href="/discord">
              Discord助手
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  )
}