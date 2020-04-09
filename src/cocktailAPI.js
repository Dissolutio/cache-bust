
// export const cocktailAPI = (onApiError) => async (url, opts) => {}

// URL BUILDER
const apiRootDomain = `https://www.thecocktaildb.com`
const apiPath = `/api/json/v1/1/`
function buildApiUrl(apiEndpoint) {
  return `${apiRootDomain}${apiPath}${apiEndpoint}`
}
async function apiCall(endpoint, input) {
  const response = await fetch(`${buildApiUrl(endpoint)}${input || ''}`)
  return response
}
// BEST SIMPLE
export const getRandomCocktail = (onApiError) => async () => {
  try {
    // Botch this filename to force a 404 error
    const response = await apiCall('random.php')
    if (response.status === 404) {
      throw Error('404')
    } else if (response.status !== 200) {
      throw new Error('Something unexpectedly went wrong with that.')
    }
    const data = await response.json()
    return data?.drinks || null
    // Throw errors that we react to in onApiError callback
  } catch (error) {
    onApiError(error)
  }
}

// THESE ONES NEED INPUT
const searchCocktailsByName = (searchInput) => {
  const url = buildApiUrl(`search.php?s=`)
  return apiCall(url, searchInput)
}
const searchCocktailsByIngredient = (searchInput) => {
  return apiCall(buildApiUrl(`search.php?i=`), searchInput)
}
const lookupCocktailById = (ID) => {
  return apiCall(buildApiUrl(`lookup.php?i=`), ID)
}

// DON'T NEED INPUT
const getAllCategories = () => {
  const url = buildApiUrl(`list.php?c=list`)
  return apiCall(url)
}
const getAllGlassware = () => {
  const url = buildApiUrl(`list.php?g=list`)
  return apiCall(url)
}
const getAllAlcoholic = () => {
  const url = buildApiUrl(`list.php?a=list`)
  return apiCall(url)
}
const getAllIngredients = () => {
  const url = buildApiUrl(`list.php?i=list`)
  return apiCall(url)
}
const getImageOfIngredient = (ingredient, sizeOfImg = 'medium') => {
  // TODO make a hook to discover the size of image needed automatically
  switch (sizeOfImg) {
    case 'small':
      return `${
        apiRootDomain
        }/images/ingredients/${ingredient}-Small.png`
    case 'medium':
      return `${
        apiRootDomain
        }/images/ingredients/${ingredient}-Medium.png`
    case 'large':
      return `${apiRootDomain}/images/ingredients/${ingredient}.png`
    default:
      return `${
        apiRootDomain
        }/images/ingredients/${ingredient}-Medium.png`
  }
}

  // UNBUILT
  // lookupIngredientByID: `lookup.php?iid=`,
  // filterByIngredient: `filter.php?i=`,
  // filterByAlcoholic: `filter.php?a=`,
  // filterByCategory: `filter.php?c=`,
  // filterByGlass: `filter.php?g=`,

