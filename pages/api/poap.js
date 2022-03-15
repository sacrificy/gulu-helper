// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

const browser = await puppeteer.launch({ headless: false })
console.log('浏览器启动')
// await page.waitFor('input')
// page.type('input', '0xf313E6C1d64f8cc830137F48b6885d90fdEB3218')
// await page.waitForTimeout(1000)
// page.click('[type=submit]')
// await page.waitForTimeout(5000)
// await page.screenshot({ path: 'testresult.png', fullPage: true })
// await browser.close()

export default async function handler(req, res) {
  const page = await browser.newPage()
  await page.goto('https://poap.delivery/cryptogsmarch2022')
  await page.waitForTimeout(5000)
  // await page.close()
  res.status(200).json({ name: 'John Doe' })
}
