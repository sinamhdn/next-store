import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const router = createRouter<NextApiRequest, NextApiResponse>();

// return list of all products
router.get(async (req, res) => {
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    res.send(products);
});

export default router.handler();