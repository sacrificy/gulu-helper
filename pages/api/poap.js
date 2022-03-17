// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

export default async function handler(req, res) {
  const param = req.body;
  const {
    link,
    address
  } = param;
  puppeteer.launch({
    headless: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ['--proxy-server=us.proxy.iproyal.com:12323']
  }).then(async browser => {
    try {
      const page = await browser.newPage()
      await page.authenticate({
        username: 'gulu',
        password: '951012_country-us'
      });
      await page.goto(link)
      await page.waitFor('input');
      await page.type('input', address);
      await page.waitForTimeout(500);
      await page.waitFor('button:not([disabled])');
      await page.click('button:not([disabled])');
      await browser.close()
      res.status(200).json({ name: '成功' })
    } catch (error) {
      await browser.close();
      res.status(500).json(error)
    }
  })
}
