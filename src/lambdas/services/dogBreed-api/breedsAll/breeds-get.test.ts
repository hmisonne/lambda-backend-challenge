import fetch from 'node-fetch'
import AbortController from 'abort-controller'
import { handler } from './breeds-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

const mockResponse = {
  message: [
    'affenpinscher',
    'shepherd australian',
    'basenji',
    'beagle',
    'boston bulldog',
    'english bulldog',
    'french bulldog',
  ],
}

describe('breeds-get handler', () => {
  const mockPayload = {
    message: {
      affenpinscher: [],
      australian: ['shepherd'],
      basenji: [],
      beagle: [],
      bulldog: ['boston', 'english', 'french'],
    },
    status: 'success',
  }

  it('returns payload from fetch request', async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
    const response = await handler()
    expect(response).toMatchObject({ body: mockResponse })
  })

  it('returns an error from fetch request timeout', async () => {
    const controller = new AbortController()
    controller.abort()
    const { signal } = controller
    mockedFetch.mockRejectedValue(signal)

    const response = await handler()
    expect(response).toMatchObject({
      message: 'timeout error',
      statusCode: 500,
    })
  })
})
