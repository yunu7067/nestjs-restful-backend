import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '121.186.2.69',
      port: 3306,
      username: 'iter',
      password: 'dlsxjspt7510',
      database: 'ihstudies',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    PhotosModule,
  ],
})
export class AppModule {}
