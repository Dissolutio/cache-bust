export default onAuthFailure => (url, opts) => {
  const headers = {
    token: 'fake token'
  }

  const combinedOptions = Object.assign({}, { headers }, opts)
  return (
    fetch('https://our.base-api-url.com' + url, combinedOptions)
      // let's assume we're always getting JSON back
      .then(res => {
        // here we can check for whatever the API does
        // when it fails auth
        if (res.statusCode === 401) {
          throw Error('rejected')
        }

        return res.json()
      })
      .catch(err => {
        // Now we can call the function
        // in this scenario
        if (err.message === 'rejected') {
          onAuthFailure()
          return
        }
        // other wise we just want to handle our normal
        // rejection
        throw err
      })
  )
}