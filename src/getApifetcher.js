
export const getApiFetcher = (onGetRandomCocktailFailure) => async (url, opts) => {
  // const getToken = await getTokenSilently()
  // const headers = {
  //   token: getToken,
  // }
  // const combinedOptions = Object.assign({}, { headers }, opts)
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/' + url)
    if (response.statusCode === 401) {
      throw Error('rejected')
    }
    const data = await response.json()
    return data.drinks
  } catch (error) {
    if (error.message === 'rejected') {
      onGetRandomCocktailFailure()
      return
    }
    throw error
  }
}

function getTokenSilently(toFail) {
  const promise = new Promise(function (resolve, reject) {
    if (toFail === false) {
      reject("Rejected in implementation of getTokenSilently")
    }
    //do something
    setTimeout(() => {
      resolve('fakeToken')
    }, 800);
  });
  return promise
}