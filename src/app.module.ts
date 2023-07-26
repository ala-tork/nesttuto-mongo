import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //import the env file
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true
    }),
    //connect to db 
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
