import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import proxy from '../../config/proxy.json'
import global from '../../config/global.json'
puppeteer.use(StealthPlugin())

export default async function handler(req, res) {
  const {
    accountItem
  } = req.body;
  const {
    mail,
    proxyIndex
  } = accountItem
  try {
    const proxyItem = proxy[global.proxyRegoin]["sticky_24"][proxyIndex - 1]
    const [host, port, username, password] = proxyItem.split(":")
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: global.executablePath,
      userDataDir: global.userDataDirBase + mail,
      args: [`--proxy-server=${host}:${port}`]
    })
    const page = await browser.newPage()
    await page.authenticate({
      username: username,
      password: password
    });
    await page.goto("https://discord.com/channels/@me")
    return res.status(200).json({ message: '成功，请在服务器手动操作' })
  } catch (error) {
    return res.status(500).json({ message: '失败', error })
  }
}
