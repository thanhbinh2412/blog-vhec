import { Injectable } from '@nestjs/common';
import { CommonDb } from 'src/common/CommonDb';

@Injectable()
export class ImagesService {
  async newImg(bf: any) {
    const query = `insert into image(id_post, image) 
        values(12, '${bf}')`;

    var dt = await CommonDb.SaveData(query);
    return dt;
  }

  async getImage(id: number) {
    const query = `select image from image where id_post = ${id}`;

    var dt = await CommonDb.GetData(query);
    return dt;
  }
}
