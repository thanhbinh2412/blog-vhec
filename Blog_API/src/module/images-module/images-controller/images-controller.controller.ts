import {
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../images-service';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Readable } from 'stream';
import { editFileName, imageFileFilter } from 'src/common/CommonFunc';
import { diskStorage } from 'multer';

@ApiTags('Image')
@Controller('images')
export class ImagesControllerController {
  constructor(private readonly service: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      code: 0,
      data: {
        originalname: file.originalname,
        filename: file.filename,
      },
    };
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  // @Get('up-load')
  // @Header('Content-Type', 'image/png')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Res() response,
  // ) {
  //   var arrByte = Uint8Array.from(file.buffer);

  //   var dt = await this.service.newImg(arrByte);
  //   console.log(file.buffer);
  //   console.log(arrByte);

  //   const readable = new Readable();
  //   readable._read = () => {};
  //   readable.push(file.buffer);
  //   readable.push(null);
  //   readable.pipe(response);
  // }

  // @Get('image')
  // @Header('Content-Type', 'image/png')
  // async getImage(@Res() response) {
  //   var dt = await this.service.getImage(12);
  //   const te = dt[0].image;
  //   var arrByte = Uint8Array.from(te);

  //   var bf = Buffer.from(arrByte);
  //   console.log(bf);

  //   const readable = new Readable();
  //   readable._read = () => {};
  //   readable.push(bf, 'binary');
  //   readable.push(null);
  //   readable.pipe(response);
  // }
}
