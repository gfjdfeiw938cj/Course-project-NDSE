
export const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {

      return res.status(401).json({
        error: 'Необходимо авторизоваться',
        status: "error"
      })
    }
    next()
  }
  