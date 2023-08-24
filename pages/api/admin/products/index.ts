import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { isAdmin, isLoggedin } from '../../../../utils/auth';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(isLoggedin, isAdmin);

// get list of all products
router.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

// create a sample new product from admin
router.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'sample name',
    slug: 'sample-slug-' + Math.random(),
    image: '/images/psample.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product Created', product });
});

export default router.handler();
