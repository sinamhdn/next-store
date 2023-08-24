import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import mongoose from 'mongoose';
import Order from '../../../models/Order';
import { isLoggedin } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

interface INextApiRequest extends NextApiRequest {
    user: {
        _id: mongoose.Types.ObjectId
    }
}

const router = createRouter<INextApiRequest, NextApiResponse>();

router.use(isLoggedin);

// return orders list of a user
router.get(async (req: INextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
});

export default router.handler({
    //@ts-ignore
    onError
});