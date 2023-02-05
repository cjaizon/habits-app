<script>
  import Header from '../components/Header.svelte'
  import SummaryTable from '../components/SummaryTable.svelte'
  import { logout } from '../lib/firebase/firebase-config'
  import { userToken } from '../stores/auth'
</script>

<h1>LoggedIn</h1>
<button on:click={logout}>Log Out</button>

<Header />
{#if userToken}
  <SummaryTable token={$userToken} />
{/if}
