
export const getApiFetcher = (onAuthFailure) => async (url, opts) => {
  // const headers = {
  //   token: 'fake token'
  // }
  // const combinedOptions = Object.assign({}, { headers }, opts)
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/' + url)
    if (response.statusCode === 401) {
      throw Error('rejected')
    }
    return response.json()
  } catch (error) {
    if (error.message === 'rejected') {
      onAuthFailure()
      return
    }
    throw error
  }
}

function getTokenSilently() {
  const response = new Promise
  setTimeout(() => {
    response.resolve('fakeToken')
  }, 800);
  return response
}