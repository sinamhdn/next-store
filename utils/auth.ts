import { NextApiResponse, NextApiRequest } from 'next'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const signToken = (user: { _id: mongoose.Types.ObjectId; name: string; email: string; isAdmin: boolean; }) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },

        process.env.JWT_SECRET!,
        {
            expiresIn: '30d',
        }
    );
};
const isLoggedin = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const { authorization } = req.headers;
    if (authorization) {
        // Bearer xxx => xxx
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET!, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Token is not valid' });
            } else {
                // @ts-ignore
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'Token is not suppiled' });
    }
};
const isAdmin = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    // @ts-ignore
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'User is not admin' });
    }
};

export { signToken, isLoggedin, isAdmin };