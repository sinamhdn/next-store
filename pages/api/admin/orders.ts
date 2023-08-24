import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Order from '../../../models/Order';
import { isLoggedin, isAdmin } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isLoggedin, isAdmin);

// get all orders exist in database and poulate their user info from foreign key user document
router.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).populate('user', 'name');
  await db.disconnect();
  res.send(orders);
});

export default router.handler({
  onError,
} as any);
