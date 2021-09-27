import { Module } from '@nestjs/common';
import { PostControllerController } from './post-controller/post-controller.controller';
import { PostService } from './post-service';

@Module({
  controllers: [PostControllerController],
  providers: [PostService]
})
export class PostModuleModule {}
