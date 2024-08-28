import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { Demo } from '@/models/Demo';

import { app } from '@/app';
import { DemoService } from '@/services/DemoService';

vi.mock('@/services/DemoService');

describe('DemoController - e2e tests', () => {
  it('should return the demo by ID with status 200', async () => {
    const demo = Demo.build({ id: '1', name: 'Test Demo' });

    const mockGetById = vi.spyOn(DemoService, 'getById').mockResolvedValue(demo);

    const response = await request(app).get(`/api/demos/${demo.id}`);

    expect(mockGetById).toHaveBeenCalledWith(demo.id);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(demo.dataValues);
  });

  it('should return 404 error if the demo is not found', async () => {
    const mockGetById = vi.spyOn(DemoService, 'getById').mockResolvedValue(null);

    const idNotFound = 'asd2';
    const response = await request(app).get(`/api/demos/${idNotFound}`);

    expect(mockGetById).toHaveBeenCalledWith(idNotFound);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});
