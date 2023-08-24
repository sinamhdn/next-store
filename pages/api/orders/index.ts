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

// create new order
router.post(async (req, res) => {
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send(order);
});

//@ts-ignore
export default router.handler({ onError });