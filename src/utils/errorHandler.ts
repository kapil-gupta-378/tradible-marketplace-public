export function errorHandler(error: Error, message = 'Unknown Error Occurred') {
  if (error instanceof Error) {
    const typedError: Error = error
    return new Error(typedError.message)
  } else {
    return new Error(message)
  }
}
