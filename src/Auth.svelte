<script>
   import {user, loggedIn} from './store';
   import {login, logout} from "./firebase"
</script>
{#if $loggedIn}
    <button on:click={logout}>Log Out</button>
<!--    <a on:click={logout}>Logout</a>-->
{:else}
    <button on:click|preventDefault={login}>Sign In with Google</button>
{/if}
<style>
    a {
        cursor: pointer;
    }
</style>