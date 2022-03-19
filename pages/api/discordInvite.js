// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import proxy from '../../config/proxy.json'
import disord from '../../config/discord.json'
import global from '../../config/global.json'
puppeteer.use(StealthPlugin())

export default async function handler(req, res) {
  const {
    accountItem,
    inviteLink
  } = req.body;
  const {
    token,
    mail
  } = accountItem
  try {
    // 开始登录
    const tokenList = disord.account.map(item => item.token);
    const index = tokenList.findIndex((item) => item === token)
    const proxyItem = proxy[global.proxyRegoin]["sticky_24"][index]
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
    await page.goto(inviteLink)
    await page.waitFor('button')
    await page.click('button')
    await browser.close()
    res.status(200).json({ message: '邀请成功' })
  } catch (error) {
    res.status(500).json({ message: '邀请失败', error })
  }
}
