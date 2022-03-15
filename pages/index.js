import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { message, InputNumber, Button, List } from 'antd';


export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [num, setNum] = useState(10);
  const [account, setAccount] = useState([]);
  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    } else {
      message.info('请连接钱包');
    }
  }, [])
  const handleClick = () => {
    let accountList = [];
    for (let i = 0; i < num; i++) {
      let accountItem = web3.eth.accounts.create();
      accountList.push(accountItem);
    }
    setAccount(accountList)
    console.log(accountList)
  }
  return (
    <div style={{
      margin:20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        padding: 20,
        width: 600,
        boxShadow: '0 4px 16px 0 #BBC4EF59',
        borderRadius: '20px',
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <InputNumber min={1} max={99} defaultValue={10} onChange={setNum} />
          <Button shape='round' onClick={handleClick} type='primary'>生成</Button>
        </div>
        <div>
          <List
            itemLayout="horizontal"
            dataSource={account}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.address}
                  description={item.privateKey}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  )
}
