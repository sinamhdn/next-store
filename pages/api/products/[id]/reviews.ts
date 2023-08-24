// /api/products/:id/reviews
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { onError } from '../../../../utils/error';
import db from '../../../../utils/db';
import Product from '../../../../models/Product';
import { isLoggedin } from '../../../../utils/auth';

interface INextApiRequest extends NextApiRequest {
    user: { _id: mongoose.Types.ObjectId; name: string; }
}

const router = createRouter<INextApiRequest, NextApiResponse>();

// return reviews about a single product
router.get(async (req, res) => {
    db.connect();
    const product = await Product.findById(req.query.id);
    db.disconnect();
    if (product) {
        res.send(product.reviews);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

// add or update a review for the product
router.use(isLoggedin).post(async (req, res) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
        const existReview = product.reviews.find((x: any) => x.user == req.user._id);
        if (existReview) {
            await Product.updateOne(
                { _id: req.query.id, 'reviews._id': existReview._id },
                {
                    $set: {
                        'reviews.$.comment': req.body.comment,
                        'reviews.$.rating': Number(req.body.rating),
                    },
                }
            );

            const updatedProduct = await Product.findById(req.query.id);
            updatedProduct.numReviews = updatedProduct.reviews.length;
            updatedProduct.rating =
                updatedProduct.reviews.reduce((a: any, c: any) => c.rating + a, 0) /
                updatedProduct.reviews.length;
            await updatedProduct.save();

            await db.disconnect();
            return res.send({ message: 'Review updated' });
        } else {
            const review = {
                user: new mongoose.Types.ObjectId(req.user._id),
                name: req.user.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((a: any, c: any) => c.rating + a, 0) /
                product.reviews.length;
            await product.save();
            await db.disconnect();
            res.status(201).send({
                message: 'Review submitted',
            });
        }
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'Product Not Found' });
    }
});

// @ts-ignore
export default router.handler({ onError });