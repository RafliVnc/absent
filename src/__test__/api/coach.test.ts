import { testApiHandler } from 'next-test-api-route-handler'
import * as coachHandler from '@/app/api/coach/route'
import * as coachIdHandler from '@/app/api/coach/[id]/route'
import { CoachTestUtils } from '../test-utils'

describe('GET /coach', () => {
  it('should return a successful response', async () => {
    expect.hasAssertions()

    await testApiHandler({
      url: '/api/coach?page=1&perPage=1',
      appHandler: coachHandler,
      async test({ fetch }) {
        const res = await fetch({
          method: 'GET'
        })

        const response = await res.json()
        await expect(res.status).toBe(200)
        await expect(response).toHaveProperty('data')
        await expect(response.data.rows.length).toBe(1)
      }
    })
  })
})

describe('POST /coach', () => {
  afterEach(async () => {
    await CoachTestUtils.delete()
  })

  it('should reject creation of a new coach with invalid email format and missing password', async () => {
    expect.hasAssertions()

    await testApiHandler({
      appHandler: coachHandler,
      async test({ fetch }) {
        const body = {
          email: 'admin@a.com1',
          name: 'udin'
        }

        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })

        const response = await res.json()
        await expect(res.status).toBe(400)
        await expect(response).toHaveProperty('errors')
      }
    })
  })

  it('should create a new coach with valid data', async () => {
    expect.hasAssertions()

    await testApiHandler({
      appHandler: coachHandler,
      async test({ fetch }) {
        const body = {
          email: 'test@example.com',
          name: 'Test',
          password: 'P@ssw0rd'
        }

        const res = await fetch({
          method: 'POST',

          body: JSON.stringify(body)
        })

        const response = await res.json()
        await expect(res.status).toBe(201)
        await expect(response).toHaveProperty('data')
        await expect(response.data.name).toEqual('Test')
        await expect(response.data.email).toEqual('test@example.com')
      }
    })
  })
})

describe('PUT /coach/[id]', () => {
  beforeEach(async () => {
    await CoachTestUtils.create({ id: '1' })
  })

  afterEach(async () => {
    await CoachTestUtils.delete()
  })

  it('should reject update with invalid email format and missing password', async () => {
    expect.hasAssertions()

    await testApiHandler({
      params: { id: '1' },
      appHandler: coachIdHandler,
      async test({ fetch }) {
        const body = {
          email: 'admin@a.com1',
          name: 'udin'
        }

        const res = await fetch({
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })

        const response = await res.json()
        await expect(res.status).toBe(400)
        await expect(response).toHaveProperty('errors')
      }
    })
  })

  it('should reject update if coach dosnt exist', async () => {
    expect.hasAssertions()

    await testApiHandler({
      params: { id: '2' },
      appHandler: coachIdHandler,
      async test({ fetch }) {
        const body = {
          email: 'admin@a.com1',
          name: 'udin'
        }

        const res = await fetch({
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })

        const response = await res.json()
        await expect(res.status).toBe(400)
        await expect(response.errors[0].message).toEqual('Pelatih tidak ditemukan')
      }
    })
  })

  it('should update an existing coach with valid data', async () => {
    expect.hasAssertions()

    await testApiHandler({
      params: { id: '1' },
      appHandler: coachIdHandler,
      async test({ fetch }) {
        const body = {
          email: 'test@example.com',
          name: 'Test',
          password: 'P@ssw0rd'
        }

        const res = await fetch({
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })

        const response = await res.json()
        await expect(res.status).toBe(201)
        await expect(response).toHaveProperty('data')
        await expect(response.data.id).toEqual('1')
        await expect(response.data.name).toEqual('Test')
        await expect(response.data.email).toEqual('test@example.com')
      }
    })
  })
})
