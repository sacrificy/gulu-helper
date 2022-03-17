import { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';

const addressList = [
  "0xf313E6C1d64f8cc830137F48b6885d90fdEB3218",
  "0x9Cf1D4Bd20BA7304ddB7e091E87B66dE9828d485",
  "0x5C53eEAa9c32b5F61DD5cf3b4e2913bdeD7B9b17",
  "0x94E5968D5Bda16a4870bee14f1b9329f17C0d6f3",
  "0x8C17BD70a73cbB7b985d60CdE31FAf162a41Ac25",
  "0xccEca872F11aB3d22E134a3740293b86b5A91897",
]

export default function Home() {
  const [link, setLink] = useState('')
  const handleClick = (address) => {
    console.log(link)
    axios.post('/api/poap', {
      link: link,
      address: address
    })
      .then(function (response) {
        console.log(response);
        message.success('成功');
      })
      .catch(function (error) {
        console.log(error)
        message.error('失败');
      });
  }
  return (
    <div style={{
      margin: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        padding: 20,
        width: '50%',
        boxShadow: '0 4px 16px 0 #BBC4EF59',
        borderRadius: '20px',
      }}>
        <Input placeholder="poap链接" onChange={(e) => { setLink(e.target.value) }} />
        {addressList.map((item, index) => {
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
              <div>{item}</div>
              <Button shape='round' onClick={() => { handleClick(item) }} type='primary'>领取</Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
