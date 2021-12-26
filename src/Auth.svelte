<script>
   import {user, loggedIn} from './store';
   import {login, logout} from "./firebase"
   import { Button } from 'sveltestrap';
</script>
{#if $loggedIn}
    <Button on:click={logout}>Log Out</Button>
<!--    <a on:click={logout}>Logout</a>-->
{:else}
    <Button on:click={login}>Sign In with Google</Button>
{/if}
<style>
</style>