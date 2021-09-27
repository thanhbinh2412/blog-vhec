import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/models/response-model.dto';
import { PostModel } from '../../../models/post-model.dto';
import { PostService } from '../post-service';

@ApiTags('Post')
@Controller('post')
export class PostControllerController {
  constructor(private readonly service: PostService) {}

  @Post('new-post')
  async newPost(@Body() req: PostModel) {
    var dt = await this.service.newPost(req);
    var res = new ResponseModel();
    if (dt == 1) {
      res.code = 1;
      res.message = 'Đã xảy ra lỗi!';
    } else {
      res.code = 0;
      res.message = 'Tạo bài viết thành công.';
      res.data = [req];
    }

    return res;
  }

  @Get('danh-sach')
  @ApiResponse({
    status: 201,
    type: PostModel,
    description: 'The record has been successfully created.',
  })
  async listPost() {
    var dt = await this.service.listDSPost();
    var res = new ResponseModel();

    res.code = 0;
    res.message = 'Lấy danh sách thành công.';
    res.data = dt;

    return res;
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    type: PostModel,
    description: 'The record has been successfully created.',
  })
  async getPostById(@Param('id') id: string) {
    console.log('id: ', id.toUpperCase());

    var dt = await this.service.getPostById(id.toUpperCase());
    var res = new ResponseModel();

    if (dt.length > 0) {
      res.code = 0;
      res.message = 'Lấy bài viết thành công.';
      res.data = dt;
    }

    return res;
  }

  @Put('/update')
  @ApiResponse({
    status: 200,
    type: PostModel,
    description: 'The record has been successfully created.',
  })
  async updatePostById(@Body() req: any) {
    var dt = await this.service.updatePostById(req);
    var res = new ResponseModel();
    if (dt == 1) {
      res.code = 1;
      res.message = 'Đã xảy ra lỗi!';
    } else {
      res.code = 0;
      res.message = 'Chỉnh sửa bài viết thành công.';
      res.data = [req];
    }

    return res;
  }

  @Delete('/delete/:id')
  async deletePostById(@Param('id') id: any) {
    var dt = await this.service.deletePostById(id);
    var res = new ResponseModel();
    if (dt == 1) {
      res.code = 1;
      res.message = 'Đã xảy ra lỗi!';
    } else {
      res.code = 0;
      res.message = 'Xoá bài viết thành công.';
    }

    return res;
  }
}
