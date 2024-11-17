import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { NotFoundError } from './notFoundError'
import { DuplicateError } from './duplicateError'

const handleZodError = (error: ZodError) => {
  return NextResponse.json(
    {
      errors: error.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    },
    { status: 400 }
  )
}

const handleGenericError = (error: NotFoundError | DuplicateError) => {
  return NextResponse.json({ errors: [{ message: error.message }] }, { status: error.statusCode })
}

const globalErrorHandler = (e: unknown) => {
  if (e instanceof ZodError) {
    return handleZodError(e)
  } else if (e instanceof DuplicateError || e instanceof NotFoundError) {
    return handleGenericError(e)
  } else {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export { globalErrorHandler }
