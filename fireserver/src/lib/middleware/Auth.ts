import admin from '../firebase/firebase-admin-config'

export class Auth {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]

    try {
      const decodeValue = await admin.auth().verifyIdToken(token)

      if (decodeValue) {
        req.user = decodeValue
        return next()
      }

      return res.json({ message: 'Unauthorized' })
    } catch (error) {
      return res.json({ message: 'Internal error!' })
    }
  }
}
