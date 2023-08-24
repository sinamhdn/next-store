import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    await db.connect();
    const categories = await Product.find().distinct('category');
    await db.disconnect();
    res.send(categories);
});

export default router.handler();