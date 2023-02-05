import React, { useEffect, useState } from "react"
import { auth } from "../lib/firebase/firebase-config"

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()

        setIsAuth(true)
        setUserToken(token)
      } else {
        setIsAuth(false)
        setUserToken(null)
      }

      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ loading, setLoading, userToken, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}
