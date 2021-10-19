import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger = new Logger();
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3200;
    await app.listen(port);
    logger.log(`server started at port ${port}`);
}
bootstrap();
