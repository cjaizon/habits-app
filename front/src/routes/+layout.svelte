<script>
  import '../app.css'
  import { isAuth, userToken } from '../stores/auth'
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { auth } from '../lib/firebase/firebase-config'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  onMount(() => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken()

          isAuth.set(true)
          userToken.set(token)

          browser && localStorage.setItem('auth', 'true')
          browser && localStorage.setItem('userToken', token)
        } else {
          isAuth.set(false)
          browser && localStorage.removeItem('auth')
          browser && localStorage.removeItem('userToken')
          userToken.set('')
        }

        if ($isAuth) {
          $page.url.pathname === '/login' && goto('/')
        } else {
          goto('/login')
        }
      })
    } catch (error) {
      console.log(error)
    }
  })
</script>

<p>{$isAuth ? 'logado' : 'deslogado'}</p>

<slot />
