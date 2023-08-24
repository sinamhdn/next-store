/*
WE WILL MANAGE OUT IMAGE AND VIDEO UPLOADS WITH CLOUDINARY SERVICE 
*/
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { isLoggedin, isAdmin } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
// import { type } from 'os';

interface MulterRequest extends NextApiRequest {
  file: any;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter<NextApiRequest, NextApiResponse>();

const upload = multer({ dest: "uploads" });

router.use(isLoggedin, isAdmin, upload.single('file') as any).post(async (req, res) => {
  const streamUpload = (req: NextApiRequest) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream((req as MulterRequest).file.buffer).pipe(stream);
    });
  };
  const result = await streamUpload(req);
  res.send(result);
});

// @ts-ignore
export default router.handler({ onError });
