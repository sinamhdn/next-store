import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import { isLoggedin } from '../../../../utils/auth';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isLoggedin);

// get order with [id]
router.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
});

export default router.handler();
