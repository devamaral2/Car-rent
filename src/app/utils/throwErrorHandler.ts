export function throwErrorHandler(e) {
  const error = {
    message: 'Erro interno',
    statusCode: 500,
  }
  console.log(e.message)
  if (e?.errors) {
    error.message = e.errors[0].message
    error.statusCode = 400
  } else if (e?.message.includes('não encontrado')) {
    error.message = e.message
    error.statusCode = 404
  }
  throw new Error(`${error.message}, definedStatusCode: ${error.statusCode}`)
}
