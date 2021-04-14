import fetch from 'node-fetch'
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
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const response = await handler()
    expect(response).toMatchObject({ body: mockResponse })
  })
})
