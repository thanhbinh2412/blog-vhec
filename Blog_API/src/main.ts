import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  //create swagger
  // config swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('Blog API Document')
    .setDescription('API dec')
    .setVersion('1.0.0')
    .addTag('User')
    .addTag('Post')
    .addTag('Image')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0', () => {
    console.log('Server on: http://localhost:3000');
    const isStatus: boolean = getConnection().isConnected;
    if (isStatus) {
      console.log('DB connect success');
    } else {
      console.log('DB error');
    }
  });
}
bootstrap();

// list sv: netstat -ano|findstr "PID :3000"
// kill process: taskkill /pid 18264 /f
