import { NextApiRequest, NextApiResponse } from 'next';
//import db from '../../utils/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //await db.connect();
  //await db.disconnect();
  res.status(200).json({ name: 'John Doe' })
}