// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import disord from '../../config/discord.json'
import fs from 'fs'

export default async function handler(req, res) {
  try {
    return res.status(200).json({ message: '成功', disordAccount: disord.account })
  } catch (error) {
    return res.status(500).json({ message: '失败', error })
  }
}
