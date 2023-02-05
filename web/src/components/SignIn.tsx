import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { login } from "../lib/firebase/firebase-config"

export const SignIn = () => {
  const { loading, setLoading } = useContext(AuthContext)

  const handleLogin = () => {
    try {
      setLoading(true)
      login()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button
        className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-2 hover:border-violet-300 transition-all focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background'
        onClick={handleLogin}
        disabled={loading}
      >LogIn
      </button>
    </div >
  )
}