import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from './response-model.dto';

export class PostModel {
  @ApiProperty()
  id_user: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  ma_post: string;

  @ApiProperty()
  is_public: number;

  @ApiProperty()
  image: string;
}

export class PostModelResponse {
  @ApiProperty()
  tag: string;
}
