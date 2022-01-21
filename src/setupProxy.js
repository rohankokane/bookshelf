function proxy(app) {
  app.get(/^\/$/, (req, res) => res.redirect('/list'))

  // it's only necessary for the "test:e2e" script
  app.head(/^\/list$/, (req, res) => res.status(200).end())
}

module.exports = proxy
