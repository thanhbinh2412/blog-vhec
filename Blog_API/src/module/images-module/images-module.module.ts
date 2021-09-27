import { Module } from '@nestjs/common';
import { ImagesControllerController } from './images-controller/images-controller.controller';
import { ImagesService } from './images-service';

@Module({
  controllers: [ImagesControllerController],
  providers: [ImagesService]
})
export class ImagesModuleModule {}
