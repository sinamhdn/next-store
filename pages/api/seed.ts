import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Product from '../../models/Product';
import db from '../../utils/db';
import data from '../../utils/data';
import User from '../../models/User';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  return res.send({ message: 'seeded successfully' });
  // return res.send({ message: 'already seeded' });
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});