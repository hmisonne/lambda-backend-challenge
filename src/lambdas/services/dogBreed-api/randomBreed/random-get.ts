import fetch from 'node-fetch'
import { Response } from '../types'

interface RandomResponse extends Response {
  body: RandomDog
}

interface ErrorResponse extends Response {
  message: string
}

interface RandomDog {
  message: string
  status: string
}

export async function handler(): Promise<RandomResponse | ErrorResponse> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random')
    const payload: RandomDog = await res.json()
    return {
      statusCode: 200,
      body: payload,
    }
  } catch (err: unknown) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
    }
  }
}
