// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import proxy from '../../config/proxy.json'
import disord from '../../config/discord.json'
import global from '../../config/global.json'
import fs from 'fs'
puppeteer.use(StealthPlugin())

export default async function handler(req, res) {
  const {
    action,
    accountItem
  } = req.body;
  const {
    token,
    mail,
    loginType,
    proxyIndex
  } = accountItem
  // 判断是否登录过
  const mailList = disord.account.map(item => item.mail);
  if (mailList.includes(accountItem.mail)) {
    return res.status(200).json({ message: "已登录" })
  }
  // 手动登录
  if (loginType === "manual") {
    disord.account.push(accountItem);
    fs.writeFileSync('./config/discord.json', JSON.stringify(disord));
    return res.status(200).json({ message: '录入成功，请手动操作' })
  }
  // token登录
  try {
    const proxyItem = proxy[global.proxyRegoin]["sticky_24"][proxyIndex - 1]
    console.log(proxyItem)
    const [host, port, username, password] = proxyItem.split(":")
    const browser = await puppeteer.launch({
      headless: global.headless,
      executablePath: global.executablePath,
      userDataDir: global.userDataDirBase + mail,
      args: [`--proxy-server=${host}:${port}`]
    })
    const page = await browser.newPage()
    await page.authenticate({
      username: username,
      password: password
    });
    await page.goto("https://discord.com/login")
    await page.waitForTimeout(1000)
    await page.evaluate((token) => {
      window.t = token;
      window.localStorage = document.body.appendChild(document.createElement`iframe`).contentWindow.localStorage;
      window.setInterval(() => window.localStorage.token = `"${window.t}"`);
      window.location.reload();
    }, token)
    await page.waitForTimeout(1000)
    if (page.url() === "https://discord.com/login") {
      await browser.close()
      return res.status(200).json({ message: 'token登录失败' })
    }
    await browser.close()
    // 保存登陆成功账号
    disord.account.push(accountItem);
    fs.writeFileSync('./config/discord.json', JSON.stringify(disord));
    return res.status(200).json({ message: 'token登录成功' })
  } catch (error) {
    return res.status(500).json({ message: '登录失败', error })
  }
}
