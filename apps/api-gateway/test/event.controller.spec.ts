import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApiGatewayModule } from '../src/api-gateway.module';
import request from 'supertest';

describe('EventController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/events (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/events')
      .query({ page: 1, limit: 10 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('events');
        expect(res.body.data).toHaveProperty('total');
      });
  });

  it('/api/events/search (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/events/search')
      .query({
        name: 'Thi',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('events');
        expect(res.body.data).toHaveProperty('total');
      });
  });

  it('/api/events/own/:userId (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/events/own/user-id')
      .query({ page: 1, limit: 10 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('events');
        expect(res.body.data).toHaveProperty('total');
      });
  });

  it('/api/events/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/events/event-id')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id', 'event-id');
      });
  });

  it('/api/events/ids (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/events/ids')
      .send({ ids: ['event-id-1', 'event-id-2'] })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('events');
        expect(res.body.data.events).toEqual(
          expect.arrayContaining([{ id: 'event-id-1' }, { id: 'event-id-2' }]),
        );
      });
  });

  it('/api/events (POST)', () => {
    const createEventDto = {
      name: 'New Event',
      description: 'Event Description',
      startDate: new Date(),
      endDate: new Date(),
      location: 'location-id',
      typeId: 'type-id',
      price: 100,
      images: ['image1.jpg', 'image2.jpg'],
    };
    return request(app.getHttpServer())
      .post('/api/events')
      .send(createEventDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('name', createEventDto.name);
        expect(res.body.data).toHaveProperty(
          'description',
          createEventDto.description,
        );
      });
  });

  it('/api/events/:id (PUT)', () => {
    const updateEventDto = {
      name: 'New Event 1',
      description: 'Event Description',
      startDate: new Date(),
      endDate: new Date(),
      location: 'location-id',
      typeId: 'type-id',
      price: 100,
      images: ['image1.jpg', 'image2.jpg'],
    };

    return request(app.getHttpServer())
      .put('/api/events/event-id')
      .send(updateEventDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id', 'event-id');
        expect(res.body.data).toHaveProperty('name', updateEventDto.name);
        expect(res.body.data).toHaveProperty(
          'description',
          updateEventDto.description,
        );
      });
  });

  it('/api/events/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/events/event-id')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id', 'event-id');
      });
  });
});
