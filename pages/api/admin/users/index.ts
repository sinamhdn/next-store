import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { isAdmin, isLoggedin } from '../../../../utils/auth';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isLoggedin, isAdmin);

// get list of all users
router.get(async (req, res) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
});

export default router.handler();
