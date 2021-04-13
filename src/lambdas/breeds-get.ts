import fetch from 'node-fetch'
import { Response } from './types'

interface DogBreedResponse extends Response {
  body: DogBreedList
}

interface DogBreedList {
  message: string[]
}

interface ErrorResponse extends Response {
  message: string
}

interface DogBreeds {
  message: DogBreedDetails
  status: string
}

interface DogBreedDetails {
  [breed: string]: string[]
}

export async function handler(): Promise<DogBreedResponse | ErrorResponse> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all')
    const payload: DogBreeds = await res.json()
    const allBreed = payload.message
    const result: string[] = []

    Object.entries(allBreed).forEach(([breed, allSubreed]) =>
      allSubreed.length === 0
        ? result.push(breed)
        : allSubreed.forEach((subBreed) => result.push(`${subBreed} ${breed}`)),
    )

    return {
      statusCode: 200,
      body: {
        message: result,
      },
    }
  } catch (err: unknown) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
    }
  }
}
