import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';
import { isLoggedin } from '../../../../utils/auth';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isLoggedin);

// set product as delivered
router.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'order delivered', order: deliveredOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'order not found' });
  }
});

export default router.handler({
  //@ts-ignore
  onError,
});
