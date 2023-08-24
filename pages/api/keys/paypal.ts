import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { isLoggedin } from '../../../utils/auth';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isLoggedin);

// get paypal client id
router.get(async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

export default router.handler();
