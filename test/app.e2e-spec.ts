import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/users', () => {
    it('Get users with out Sign in (GET)', () => {
      return request(app.getHttpServer()).get('/users').expect(401);
    });

    it('Create User (POST)', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@naver.com',
          password: '12345677',
        })
        .expect(201);
    });

    it('Find One (GET)', () => {
      return request(app.getHttpServer()).get('/users/40').expect(200);
    });
  });
});
