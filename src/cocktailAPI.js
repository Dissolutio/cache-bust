export const cocktailAPI = {
  apiRootDomain: `https://www.thecocktaildb.com`,
  apiPath: `/api/json/v1/1/`,

  buildApiUrl(serverRoute) {
    return `${this.apiRootDomain}${this.apiPath}${serverRoute}`
  },
  // NEED INPUT
  searchCocktailsByName(searchInput) {
    const url = this.buildApiUrl(`search.php?s=`)
    return this.apiCall(url, searchInput)
  },
  searchCocktailsByIngredient(searchInput) {
    return this.apiCall(this.buildApiUrl(`search.php?i=`), searchInput)
  },
  lookupCocktailById: (ID) => {
    return this.apiCall(this.buildApiUrl(`lookup.php?i=`), ID)
  },
  lookupIngredientByID: `lookup.php?iid=`,
  filterByIngredient: `filter.php?i=`,
  filterByAlcoholic: `filter.php?a=`,
  filterByCategory: `filter.php?c=`,
  filterByGlass: `filter.php?g=`,
  // DON'T NEED INPUT
  getRandomCocktail() {
    const url = this.buildApiUrl(`random.php`)
    return this.apiCall(url)
  },
  getAllCategories() {
    const url = this.buildApiUrl(`list.php?c=list`)
    return this.apiCall(url)
  },
  getAllGlassware() {
    const url = this.buildApiUrl(`list.php?g=list`)
    return this.apiCall(url)
  },
  getAllAlcoholic() {
    const url = this.buildApiUrl(`list.php?a=list`)
    return this.apiCall(url)
  },
  getAllIngredients() {
    const url = this.buildApiUrl(`list.php?i=list`)
    return this.apiCall(url)
  },
  getImageOfIngredient: (ingredient, sizeOfImg = 'medium') => {
    // TODO make a hook to discover the size of image needed automatically
    switch (sizeOfImg) {
      case 'small':
        return `${
          this.apiRootDomain
          }/images/ingredients/${ingredient}-Small.png`
      case 'medium':
        return `${
          this.apiRootDomain
          }/images/ingredients/${ingredient}-Medium.png`
      case 'large':
        return `${this.apiRootDomain}/images/ingredients/${ingredient}.png`
      default:
        return `${
          this.apiRootDomain
          }/images/ingredients/${ingredient}-Medium.png`
    }
  },
  async apiCall(url, input = '') {
    const result = await fetch(url + input)
      .then((response) => {
        console.log("apiCall -> response", response)
        return response.json()
      })
      .then((myJson) => myJson.drinks)
    return result
  },
}
