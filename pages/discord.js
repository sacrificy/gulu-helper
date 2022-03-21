import { useState, useEffect } from 'react';
import { Modal, Button, message, Form, Input, Table, Space, InputNumber } from 'antd';
import axios from 'axios';

export default function Discord() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [loginType, setLoginType] = useState('manual');
  const [inviteLink, setInviteLink] = useState('');
  const [discordAccount, setDiscordAccount] = useState([]);
  const showModal = (loginType) => {
    setLoginType(loginType)
    setIsLoginVisible(true);
  };
  // 获取所有Discord账号
  const getDiscordAccount = () => {
    axios.get('/api/getDiscordAccount').then(function (response) {
      setDiscordAccount(response.data.disordAccount)
    })
  }
  useEffect(() => {
    getDiscordAccount()
  }, [])
  // 登录
  const onLogin = (values) => {
    const finalValues = {
      ...values,
      loginType
    }
    axios.post('/api/discord', {
      action: 'login',
      accountItem: finalValues
    }).then(function (response) {
      message.success(response.data.message);
    }).catch(function (error) {
      message.error('Token登录失败');
    });
    getDiscordAccount()
    setIsLoginVisible(false);
  };
  // 邀请
  const onClickInvite = (accountItem) => {
    if (!inviteLink) {
      message.warn('请输入邀请链接');
    }
    axios.post('/api/discordInvite', {
      inviteLink: inviteLink,
      accountItem: accountItem
    }).then(function (response) {
      message.success(response.data.message);
    }).catch(function (error) {
      message.error('邀请失败');
    });
  }
  // 手动操作
  const onClickManual = (accountItem) => {
    axios.post('/api/discordManual', {
      accountItem: accountItem
    }).then(function (response) {
      message.success(response.data.message);
    }).catch(function (error) {
      message.error('失败');
    });
  }
  return (
    <div style={{
      margin: 20,
    }}>
      <div style={{
        padding: 20,
        width: '100%',
        boxShadow: '0 4px 16px 0 #BBC4EF59',
        borderRadius: '20px',
      }}>
        <Button type="primary" onClick={() => { showModal('token') }}>
          token登录
        </Button>
        <Button type="primary" onClick={() => { showModal('manual') }} style={{ marginLeft: 20 }}>
          手动登录
        </Button>
        <LoginForm
          loginType={loginType}
          visible={isLoginVisible}
          onLogin={onLogin}
          onCancel={() => {
            setIsLoginVisible(false);
          }}
        />
        <Input placeholder="邀请链接" onChange={(e) => { setInviteLink(e.target.value) }} style={{ marginTop: 20 }} />
      </div>
      <div style={{
        marginTop: 20,
        padding: 20,
        width: '100%',
        boxShadow: '0 4px 16px 0 #BBC4EF59',
        borderRadius: '20px',
      }}>
        <AccountTable discordAccount={discordAccount} onClickInvite={onClickInvite} onClickManual={onClickManual} />
      </div>
    </div>
  )
}


const LoginForm = ({ loginType, visible, onLogin, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="登录账号"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onLogin(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="login_form"
      >
        {loginType === "token" && <Form.Item
          name="token"
          label="Token"
          rules={[
            {
              required: true,
              message: '请输入Token',
            },
          ]}
        >
          <Input />
        </Form.Item>}
        <Form.Item
          name="mail"
          label="邮箱"
          rules={[
            {
              required: true,
              message: '请输入邮箱',
            },
          ]} >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="proxyIndex"
          label="代理编号"
          rules={[
            {
              required: true,
              message: '请输入代理编号',
            },
          ]} >
          <InputNumber style={{ width: '100%' }} min={1} max={100} />
        </Form.Item>
        <Form.Item name="note" label="备注">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AccountTable = ({ discordAccount, onClickInvite, onClickManual }) => {
  const columns = [
    {
      title: '邮箱',
      dataIndex: 'mail',
      key: 'mail',
    },
    {
      title: '代理编号',
      dataIndex: 'proxyIndex',
      key: 'proxyIndex',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '登录方式',
      dataIndex: 'loginType',
      key: 'loginType',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => { onClickManual(record) }}>手动操作</a>
          <a onClick={() => { onClickInvite(record) }}>邀请</a>
        </Space>
      ),
    }
  ]

  return <Table pagination={false} columns={columns} dataSource={discordAccount} />
}