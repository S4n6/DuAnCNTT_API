import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EventModule } from './../src/event.module';
import { EventService } from './../src/event.service';

describe('EventController (e2e)', () => {
  let app: INestApplication;
  const eventService = {
    getAllEvents: jest.fn().mockResolvedValue({
      success: true,
      data: [{ id: '1', name: 'Event 1', description: 'Description 1' }],
    }),
    getEventById: jest.fn().mockResolvedValue({
      success: true,
      data: { id: '1', name: 'Event 1', description: 'Description 1' },
    }),
    createEvent: jest.fn().mockResolvedValue({
      success: true,
      data: { id: '2', name: 'Event 2', description: 'Description 2' },
    }),
    updateEvent: jest.fn().mockResolvedValue({
      success: true,
      data: { id: '1', name: 'Updated Event 1', description: 'Updated Description 1' },
    }),
    deleteEvent: jest.fn().mockResolvedValue({
      success: true,
      data: null,
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EventModule],
    })
      .overrideProvider(EventService)
      .useValue(eventService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/events (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/events')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
      });
  });

  it('/api/events/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/events/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id', '1');
      });
  });

  it('/api/events (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/events')
      .send({ name: 'Event 2', description: 'Description 2' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('name', 'Event 2');
      });
  });

  it('/api/events/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/api/events/1')
      .send({ name: 'Updated Event 1', description: 'Updated Description 1' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('name', 'Updated Event 1');
      });
  });

  it('/api/events/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/events/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
      });
  });
});