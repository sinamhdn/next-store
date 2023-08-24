import db from './db';
import type { NextApiRequest, NextApiResponse } from 'next';

const getError = (err: any) =>
    err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;

const onError = async (err: any, req: NextApiRequest, res: NextApiResponse, next: any) => {
    await db.disconnect();
    res.status(500).send({ message: err.toString() });
};
export { getError, onError };