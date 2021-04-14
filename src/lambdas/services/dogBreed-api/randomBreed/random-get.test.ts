import fetch from 'node-fetch'
import { handler } from './random-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('random-get handler', () => {
  const mockPayload = { test: 'hello?' }
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const response = await handler()
    expect(response).toMatchObject({ body: mockPayload })
  })
})
