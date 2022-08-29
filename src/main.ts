import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidateInputPipe} from "./pipes/validate.pipe";


async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Okra Assessment')
        .setDescription('The API documentation for the assessment')
        .setVersion('1.0')
        .setContact('Simon Joseph','','simonjoseph750@gmail.com')
        .addServer('http://localhost:3000/api/v1')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidateInputPipe());

    await app.listen(3000);
}

bootstrap();
