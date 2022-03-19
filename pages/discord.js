import { useState, useEffect } from 'react';
import { Modal, Button, message, Form, Input, Radio } from 'antd';
import axios from 'axios';
import discordConfig from '../config/discord.json';

export default function Discord() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const { account } = discordConfig;
  const showModal = () => {
    setIsLoginVisible(true);
  };

  const onLogin = (values) => {
    axios.post('/api/discord', {
      action: 'login',
      accountItem: values
    }).then(function (response) {
      message.success(response.data.message);
    }).catch(function (error) {
      message.error('登录失败');
    });
    setIsLoginVisible(false);
  };
  const handleClick = (accountItem) => {
    axios.post('/api/discordInvite', {
      inviteLink: inviteLink,
      accountItem: accountItem
    }).then(function (response) {
      message.success(response.data.message);
    }).catch(function (error) {
      message.error('登录失败');
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
        <Button type="primary" onClick={showModal}>
          登录新账号
        </Button>
        <LoginForm
          visible={isLoginVisible}
          onLogin={onLogin}
          onCancel={() => {
            setIsLoginVisible(false);
          }}
        />
        <Input placeholder="邀请链接" onChange={(e) => { setInviteLink(e.target.value) }} />
      </div>
      <div style={{
        marginTop: 20,
        padding: 20,
        width: '100%',
        boxShadow: '0 4px 16px 0 #BBC4EF59',
        borderRadius: '20px',
      }}>
        {account.map((item, index) => {
          return (
            <div key={index} style={{
              boxShadow: '0 4px 16px 0 #BBC4EF59',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              margin: 10
            }}>
              <div>{item.mail}</div>
              <Button shape='round' onClick={() => { handleClick(item) }} type='primary'>邀请</Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}


const LoginForm = ({ visible, onLogin, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="登录新账号"
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
        <Form.Item
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
        </Form.Item>
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
        <Form.Item name="note" label="备注">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};