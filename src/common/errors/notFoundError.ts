export class NotFoundError extends Error {
  private readonly httpStatusCode: number = 400

  constructor(message: string) {
    super(message)
  }

  get statusCode() {
    return this.httpStatusCode
  }
}
