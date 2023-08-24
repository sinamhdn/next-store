import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { isLoggedin } from '../../../utils/auth';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isLoggedin);

// get google api key
router.get(async (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || 'nokey');
});

export default router.handler();
