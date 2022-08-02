import {
  Controller, Post, UploadedFiles, UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAZGB64IE4AVJUAVXF',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

@Controller('image')
export class ImageController {
  private S3: AWS.S3;

  private BUCKET: string;

  constructor() {
    this.S3 = new AWS.S3({
      // Your config options
      accessKeyId: 'AKIAZGB64IE4AVJUAVXF',
      secretAccessKey: '5ga8VBefNq9IpfyAHTEa3iSGDMu2gVKBIxffdwe/',
      region: 'us-east-1',
      // endpoint: "http://localhost:8080",
      // s3ForcePathStyle: true,
      // signatureVersion: 'v4',
    });
    this.BUCKET = 'twitch-collection2';
  }

    // TODO 파일 검증 부탁드립니다 😲😲
    // https://docs.nestjs.com/techniques/file-upload
    @Post()
    @UseInterceptors(FilesInterceptor('images', 3, {
      storage: multerS3({
        s3,
        bucket: 'twitch-collection2',
        key(req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }))
  async uploadImage(@UploadedFiles() file: Express.Multer.File) {

  }
}
