import './styles/global.css'
import './lib/dayjs'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { SignIn } from './components/SignIn'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import { logout } from './lib/firebase/firebase-config'


export const App = () => {
  const { loading, setLoading, isAuth } = useContext(AuthContext)


  const handleLogout = () => {
    try {
      setLoading(true)
      logout()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  if (isAuth) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
          <Header />
          <SummaryTable />
          <button
            className='border bg-violet-500  border-violet-500 font-semibold rounded-lg px-6 py-4 flex justify-center items-center gap-2 hover:border-violet-300 hover:bg-violet-400 transition-all focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background w-max self-center'
            onClick={handleLogout}
            disabled={loading}
          >LogOut</button>
        </div>
      </div>
    )
  } else {
    return <SignIn />
  }

}