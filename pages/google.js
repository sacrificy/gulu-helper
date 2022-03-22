import { useState, useEffect, useRef } from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import { TOTP } from '../util/googleUtil'

export default function Home() {
  const [secret, setSecret] = useState('')
  const [token, setToken] = useState('00000')
  const [remainingTimePiePercentage, setRemainingTimePiePercentage] = useState(0)
  const timerId = useRef(null)
  useEffect(() => {
    const format = secret.replace(/\s/g, '')
    const totpGenerator = format ? new TOTP(format, 30) : undefined;
    console.log(format)
    clearInterval(timerId.current)
    timerId.current = setInterval(() => {
      if (totpGenerator) {
        try {
          setToken(totpGenerator.getToken());
          setRemainingTimePiePercentage(totpGenerator.getRemainingSeconds() / totpGenerator.getStepSeconds());
        } catch (err) {
          console.info(err.message);
          setToken('无效密钥！');
          setRemainingTimePiePercentage(0);
        }
      } else {
        setToken('000000');
        setRemainingTimePiePercentage(0);
      }
    }, 1000);
  }, [secret])

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
        width: 350
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '18px',
        }}>
          <div style={{ fontSize: '24px', fontWeight: 500, height: '34x', color: '#5892ee' }}>{token}</div>
          <svg id="totp-token-remaining-seconds-pie" viewBox="0 0 0.318310 0.318310" style={{ display: 'block', width: '22px', height: '22px', marginLeft: 'auto', transform: 'rotate(-90deg)', borderRadius: '50%' }}>
            <circle r="0.159155" cx="0.159155" cy="0.159155" style={{ transition: 'stroke-dashoffset 1s linear', stroke: '#5892ee', strokeWidth: '100%', strokeDasharray: 1, fill: 'none', strokeDashoffset: -1 + remainingTimePiePercentage }} />
          </svg>
        </div>
        <Input placeholder="请输入密钥" onChange={(e) => { setSecret(e.target.value) }} />
      </div>
    </div>
  )
}