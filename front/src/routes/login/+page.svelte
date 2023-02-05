<script>
  import { goto } from '$app/navigation'
  import { login } from '../../lib/firebase/firebase-config'
  import { isAuth } from '../../stores/auth'

  $isAuth && goto('/')
</script>

<button on:click={login}>Login with Google</button>
