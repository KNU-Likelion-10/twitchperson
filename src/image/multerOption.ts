import { HttpException, HttpStatus } from '@nestjs/common';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { config } from 'dotenv';

import { v4 } from 'uuid';

config();

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: multerS3({
    s3,
    bucket: 'twitch-collection2',
    key(req, file, cb) {
      cb(null, v4(file.originalname));
    },
  }),
  
};
